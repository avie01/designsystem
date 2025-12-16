import React, { useState, useRef, useEffect } from 'react';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import Icon from '../../components/Icon/Icon';
import SimpleTabs from '../../components/SimpleTabs/SimpleTabs';
import gisMapImage from '../../Images/GIS.png';
import streetViewImage from '../../Images/streetview.png';

/**
 * PROPERTY MAP VIEWER
 * Council property information lookup with interactive map
 */
const PropertyMapViewer: React.FC = () => {
  // Mock property data for East Brisbane area - moved up for initialization
  const mockProperties = [
    { 
      id: '1', 
      lot: '2', 
      plan: 'RP14823', 
      address: '51 Didsbury Street, East Brisbane QLD 4169', 
      zone: 'Low-Medium Density Residential (LMR2)', 
      area: '607m²', 
      floodZone: true,  // East Brisbane is flood affected
      heritage: false,
      frontage: '15.24m',
      depth: '39.62m'
    },
    { 
      id: '2', 
      lot: '1', 
      plan: 'RP14823', 
      address: '49 Didsbury Street, East Brisbane QLD 4169', 
      zone: 'Low-Medium Density Residential (LMR2)', 
      area: '612m²', 
      floodZone: true, 
      heritage: false,
      frontage: '15.24m',
      depth: '40.16m'
    },
    { 
      id: '3', 
      lot: '3', 
      plan: 'RP14823', 
      address: '53 Didsbury Street, East Brisbane QLD 4169', 
      zone: 'Low-Medium Density Residential (LMR2)', 
      area: '605m²', 
      floodZone: true, 
      heritage: false,
      frontage: '15.24m',
      depth: '39.70m'
    },
  ];

  // Initialize state with 51 Didsbury Street selected
  const [searchQuery, setSearchQuery] = useState('51 Didsbury Street, East Brisbane QLD 4169');
  const [selectedProperty, setSelectedProperty] = useState<any>(mockProperties[0]); // Auto-select 51 Didsbury
  const [mapZoom, setMapZoom] = useState(100);
  const [showLayers, setShowLayers] = useState(false);
  const [activeTab, setActiveTab] = useState<'search' | 'layers' | 'details'>('search');
  const [showStreetView, setShowStreetView] = useState(false);
  const [modalPosition, setModalPosition] = useState({ x: 100, y: 100 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const modalRef = useRef<HTMLDivElement>(null);

  // Building legislation based on property characteristics
  const getApplicableLegislation = (property: any) => {
    const legislation = [
      {
        code: 'QDC MP 1.1',
        name: 'Building Height Requirements',
        applies: true,
        description: 'Maximum 8.5m height for residential zones',
        status: 'mandatory'
      },
      {
        code: 'QDC MP 1.2',
        name: 'Site Coverage',
        applies: property?.zone?.includes('Residential'),
        description: 'Maximum 50% site coverage for dwelling',
        status: 'mandatory'
      },
      {
        code: 'Brisbane City Plan 2014 - 6.2.3',
        name: 'LMR2 Setback Requirements',
        applies: true,
        description: '6m front, 1.5m side, 3m rear for East Brisbane',
        status: 'mandatory'
      },
      {
        code: 'SPP 4.2',
        name: 'Brisbane River Flood Overlay',
        applies: property?.floodZone,
        description: 'Min floor level 300mm above Q100 (11.5m AHD for East Brisbane)',
        status: property?.floodZone ? 'critical' : 'not-applicable'
      },
      {
        code: 'Heritage Act 1992',
        name: 'Heritage Protection',
        applies: property?.heritage,
        description: 'Heritage assessment required for alterations',
        status: property?.heritage ? 'critical' : 'not-applicable'
      },
      {
        code: 'QDC MP 2.1',
        name: 'Bushfire Management',
        applies: false,
        description: 'BAL assessment required',
        status: 'not-applicable'
      },
      {
        code: 'SEQRP 2017 - 3.3.2',
        name: 'Koala Habitat Protection',
        applies: property?.area && parseInt(property.area) > 500,
        description: 'Koala habitat assessment for lots >500m²',
        status: 'conditional'
      },
      {
        code: 'EP Act Schedule 10',
        name: 'Vegetation Management',
        applies: true,
        description: 'Protected vegetation clearing restrictions',
        status: 'mandatory'
      },
      {
        code: 'NCC Vol 2 Part 3.12',
        name: 'Energy Efficiency',
        applies: true,
        description: '6-star energy rating requirement',
        status: 'mandatory'
      },
      {
        code: 'Transport Noise Corridor',
        name: 'Acoustic Requirements',
        applies: property?.address?.includes('Main'),
        description: 'Acoustic report for main road frontage',
        status: 'conditional'
      }
    ];
    return legislation;
  };

  const handleSearch = () => {
    // Simulate selecting a random property
    const randomIndex = Math.floor(Math.random() * mockProperties.length);
    setSelectedProperty(mockProperties[randomIndex]);
    // Keep on search tab to show legislation
  };

  const mapLayers = [
    { name: 'Property Boundaries', enabled: true, color: 'var(--color-blue-default)' },
    { name: 'Zoning', enabled: false, color: 'var(--color-purple)' },
    { name: 'Flood Overlay', enabled: false, color: 'var(--color-info)' },
    { name: 'Heritage Sites', enabled: false, color: 'var(--color-warning)' },
    { name: 'Transport Routes', enabled: false, color: 'var(--color-success)' },
  ];

  return (
    <div style={{
      minHeight: 'calc(100vh - 64px)',
      display: 'flex',
      backgroundColor: 'var(--color-wave)'
    }}>
      {/* Left Sidebar */}
      <div style={{
        width: '380px',
        backgroundColor: 'var(--color-white)',
        borderRight: '1px solid var(--color-light-deco)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}>
        {/* ODL SimpleTabs Component */}
        <SimpleTabs
          tabs={[
            { 
              id: 'search', 
              label: 'Search',
              icon: 'search'
            },
            { 
              id: 'layers', 
              label: 'Layers',
              icon: 'layers'
            },
            { 
              id: 'details', 
              label: 'Details',
              icon: 'information'
            }
          ]}
          activeTab={activeTab}
          onTabChange={(tabId) => setActiveTab(tabId as 'search' | 'layers' | 'details')}
          variant="default"
          fullWidth={true}
          showContent={false}
        />

        {/* Tab Content */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: 'var(--spacing-lg)'
        }}>
          {/* Search Tab */}
          {activeTab === 'search' && (
            <div>
              <div style={{ marginBottom: 'var(--spacing-lg)' }}>
                <Input
                  label="Search by Address or Lot/Plan"
                  value={searchQuery}
                  onChange={setSearchQuery}
                  placeholder="e.g., 51 Didsbury Street or Lot 2 RP14823"
                />
              </div>

              <Button
                variant="primary"
                onClick={handleSearch}
                style={{
                  width: '100%',
                  marginBottom: 'var(--spacing-md)'
                }}
              >
                <Icon name="search" size={16} />
                Search Property
              </Button>

              <div style={{
                padding: 'var(--spacing-md)',
                backgroundColor: 'var(--color-wave)',
                borderRadius: 'var(--border-radius-md)',
                marginBottom: 'var(--spacing-md)'
              }}>
                <h4 style={{
                  fontSize: 'var(--font-size-sm)',
                  fontWeight: 'var(--font-weight-semibold)',
                  color: 'var(--color-night)',
                  marginBottom: 'var(--spacing-sm)'
                }}>
                  Applicable Planning Legislation:
                </h4>
                <p style={{
                  fontSize: 'var(--font-size-xs)',
                  color: 'var(--color-twilight)',
                  marginBottom: 'var(--spacing-md)'
                }}>
                  {selectedProperty ? 
                    `For ${selectedProperty.address} (${selectedProperty.zone})` : 
                    'Search for a property to see applicable laws'}
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xs)' }}>
                  {getApplicableLegislation(selectedProperty).map((law, index) => (
                    <button
                      key={law.code}
                      disabled={!law.applies}
                      style={{
                        padding: 'var(--spacing-sm)',
                        border: law.status === 'critical' ? '2px solid var(--color-error)' :
                                law.status === 'mandatory' ? '2px solid var(--color-blue-default)' :
                                law.status === 'conditional' ? '2px solid var(--color-warning)' :
                                '1px solid var(--color-light-deco)',
                        borderRadius: 'var(--border-radius-sm)',
                        backgroundColor: law.applies ? 'var(--color-white)' : 'var(--color-wave)',
                        opacity: law.applies ? 1 : 0.5,
                        cursor: law.applies ? 'pointer' : 'not-allowed',
                        textAlign: 'left',
                        transition: 'var(--transition-fast)'
                      }}
                      onMouseEnter={(e) => {
                        if (law.applies) {
                          e.currentTarget.style.backgroundColor = 'var(--color-active-background)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (law.applies) {
                          e.currentTarget.style.backgroundColor = 'var(--color-white)';
                        }
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--spacing-sm)' }}>
                        <Icon 
                          name={law.status === 'critical' ? 'warning-alt' :
                                law.status === 'mandatory' ? 'checkmark-filled' :
                                law.status === 'conditional' ? 'information' : 'close'} 
                          size={16} 
                          color={law.status === 'critical' ? 'var(--color-error)' :
                                 law.status === 'mandatory' ? 'var(--color-blue-default)' :
                                 law.status === 'conditional' ? 'var(--color-warning)' : 'var(--color-twilight)'}
                        />
                        <div style={{ flex: 1 }}>
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 'var(--spacing-sm)',
                            marginBottom: '2px'
                          }}>
                            <span style={{
                              fontSize: 'var(--font-size-xs)',
                              fontWeight: 'var(--font-weight-semibold)',
                              color: 'var(--color-night)'
                            }}>
                              {law.code}
                            </span>
                            {/* Add PASS chip to first two cards */}
                            {index < 2 && law.applies && (
                              <span style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                padding: '2px 8px',
                                backgroundColor: 'var(--color-success-light)',
                                color: 'var(--color-success)',
                                fontSize: '10px',
                                fontWeight: 'var(--font-weight-semibold)',
                                borderRadius: 'var(--border-radius-sm)',
                                textTransform: 'uppercase',
                                letterSpacing: '0.5px'
                              }}>
                                PASS
                              </span>
                            )}
                          </div>
                          <div style={{
                            fontSize: 'var(--font-size-xs)',
                            color: 'var(--color-twilight)',
                            lineHeight: '1.3'
                          }}>
                            {law.name}
                          </div>
                          {law.applies && (
                            <div style={{
                              fontSize: '11px',
                              color: 'var(--color-twilight)',
                              marginTop: '2px',
                              fontStyle: 'italic'
                            }}>
                              {law.description}
                            </div>
                          )}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Layers Tab */}
          {activeTab === 'layers' && (
            <div>
              <h3 style={{
                fontSize: 'var(--font-size-base)',
                fontWeight: 'var(--font-weight-semibold)',
                color: 'var(--color-night)',
                marginBottom: 'var(--spacing-md)'
              }}>
                Map Layers
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
                {mapLayers.map((layer) => (
                  <label
                    key={layer.name}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: 'var(--spacing-sm)',
                      border: '1px solid var(--color-light-deco)',
                      borderRadius: 'var(--border-radius-sm)',
                      backgroundColor: layer.enabled ? 'var(--color-active-background)' : 'var(--color-white)',
                      cursor: 'pointer',
                      transition: 'var(--transition-fast)'
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={layer.enabled}
                      onChange={() => {}}
                      style={{
                        marginRight: 'var(--spacing-sm)',
                        accentColor: 'var(--color-blue-default)'
                      }}
                    />
                    <div style={{ flex: 1 }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'var(--spacing-sm)'
                      }}>
                        <div style={{
                          width: '12px',
                          height: '12px',
                          borderRadius: '2px',
                          backgroundColor: layer.color
                        }} />
                        <span style={{
                          fontSize: 'var(--font-size-sm)',
                          color: 'var(--color-night)'
                        }}>
                          {layer.name}
                        </span>
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Details Tab */}
          {activeTab === 'details' && (
            <div>
              {selectedProperty ? (
                <div>
                  <h3 style={{
                    fontSize: 'var(--font-size-base)',
                    fontWeight: 'var(--font-weight-semibold)',
                    color: 'var(--color-night)',
                    marginBottom: 'var(--spacing-md)'
                  }}>
                    Property Details
                  </h3>
                  
                  <div style={{
                    backgroundColor: 'var(--color-wave)',
                    borderRadius: 'var(--border-radius-md)',
                    padding: 'var(--spacing-md)',
                    marginBottom: 'var(--spacing-md)'
                  }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
                      {[
                        { label: 'Address', value: selectedProperty.address },
                        { label: 'Lot/Plan', value: `Lot ${selectedProperty.lot} on ${selectedProperty.plan}` },
                        { label: 'Zone', value: selectedProperty.zone },
                        { label: 'Land Area', value: selectedProperty.area },
                        { label: 'Frontage', value: selectedProperty.frontage || 'N/A' },
                        { label: 'Depth', value: selectedProperty.depth || 'N/A' },
                        { label: 'Flood Zone', value: selectedProperty.floodZone ? 'Yes - Brisbane River Q100' : 'No' },
                        { label: 'Heritage', value: selectedProperty.heritage ? 'Heritage Listed' : 'Not Listed' },
                      ].map((item) => (
                        <div key={item.label}>
                          <p style={{
                            fontSize: 'var(--font-size-xs)',
                            color: 'var(--color-twilight)',
                            marginBottom: 'var(--spacing-xs)',
                            textTransform: 'uppercase',
                            fontWeight: 'var(--font-weight-semibold)'
                          }}>
                            {item.label}
                          </p>
                          <p style={{
                            fontSize: 'var(--font-size-sm)',
                            color: 'var(--color-night)'
                          }}>
                            {item.value}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: 'var(--spacing-sm)' }}>
                    <Button
                      variant="primary"
                      size="small"
                      style={{ flex: 1 }}
                      onClick={() => console.log('View full details')}
                    >
                      Full Details
                    </Button>
                    <Button
                      variant="secondary"
                      size="small"
                      style={{ flex: 1 }}
                      onClick={() => console.log('Download PDF')}
                    >
                      <Icon name="download" size={14} />
                      PDF
                    </Button>
                  </div>
                </div>
              ) : (
                <div style={{
                  textAlign: 'center',
                  padding: 'var(--spacing-xl)',
                  color: 'var(--color-twilight)'
                }}>
                  <Icon name="location" size={48} color="var(--color-light-deco)" />
                  <p style={{
                    marginTop: 'var(--spacing-md)',
                    fontSize: 'var(--font-size-sm)'
                  }}>
                    No property selected. Use the search tab to find a property.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Map Area */}
      <div style={{
        flex: 1,
        position: 'relative',
        backgroundColor: 'var(--color-light-deco)',
        overflow: 'hidden'
      }}>
        {/* Map Controls */}
        <div style={{
          position: 'absolute',
          top: 'var(--spacing-lg)',
          right: 'var(--spacing-lg)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--spacing-sm)',
          zIndex: 10
        }}>
          <button
            onClick={() => setMapZoom(Math.min(mapZoom + 10, 200))}
            style={{
              width: '40px',
              height: '40px',
              backgroundColor: 'var(--color-white)',
              border: '1px solid var(--color-light-deco)',
              borderRadius: 'var(--border-radius-sm)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: 'var(--shadow-md)'
            }}
          >
            <Icon name="add" size={20} />
          </button>
          <button
            onClick={() => setMapZoom(Math.max(mapZoom - 10, 50))}
            style={{
              width: '40px',
              height: '40px',
              backgroundColor: 'var(--color-white)',
              border: '1px solid var(--color-light-deco)',
              borderRadius: 'var(--border-radius-sm)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: 'var(--shadow-md)'
            }}
          >
            <Icon name="subtract" size={20} />
          </button>
        </div>

        {/* Map Tools */}
        <div style={{
          position: 'absolute',
          top: 'var(--spacing-lg)',
          left: 'var(--spacing-lg)',
          display: 'flex',
          gap: 'var(--spacing-sm)',
          zIndex: 10
        }}>
          {[
            { icon: 'cursor-1', tooltip: 'Select' },
            { icon: 'zoom-area', tooltip: 'Zoom to area' },
            { icon: 'ruler', tooltip: 'Measure' },
            { icon: 'draw', tooltip: 'Draw' },
          ].map((tool) => (
            <button
              key={tool.icon}
              title={tool.tooltip}
              style={{
                width: '40px',
                height: '40px',
                backgroundColor: 'var(--color-white)',
                border: '1px solid var(--color-light-deco)',
                borderRadius: 'var(--border-radius-sm)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: 'var(--shadow-md)'
              }}
            >
              <Icon name={tool.icon} size={20} />
            </button>
          ))}
        </div>

        {/* Map Image */}
        <div style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <img
            src={gisMapImage}
            alt="GIS Map"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transform: `scale(${mapZoom / 100})`,
              transition: 'transform 0.3s ease',
              cursor: 'grab'
            }}
            draggable={false}
          />
          
          {/* Property Marker positioned on the circle */}
          {selectedProperty && (
            <div 
              onClick={() => setShowStreetView(true)}
              style={{
                position: 'absolute',
                top: 'calc(50% - 45px)',
                left: 'calc(50% - 65px)',
                transform: 'translate(-50%, -50%)',
                animation: 'pulse 2s infinite',
                zIndex: 5,
                cursor: 'pointer'
              }}
              title="Click to view street view"
            >
              <Icon name="location" size={32} color="var(--color-error)" />
            </div>
          )}

          {/* Street View Modal */}
          {showStreetView && (
            <div
              ref={modalRef}
              style={{
                position: 'absolute',
                top: modalPosition.y,
                left: modalPosition.x,
                width: '500px',
                backgroundColor: 'var(--color-white)',
                borderRadius: 'var(--border-radius-lg)',
                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)',
                zIndex: 1000,
                overflow: 'hidden',
                border: '1px solid var(--color-light-deco)'
              }}
            >
              {/* Modal Header - Draggable */}
              <div
                onMouseDown={(e) => {
                  setIsDragging(true);
                  setDragStart({
                    x: e.clientX - modalPosition.x,
                    y: e.clientY - modalPosition.y
                  });
                }}
                onMouseMove={(e) => {
                  if (isDragging) {
                    setModalPosition({
                      x: e.clientX - dragStart.x,
                      y: e.clientY - dragStart.y
                    });
                  }
                }}
                onMouseUp={() => setIsDragging(false)}
                onMouseLeave={() => setIsDragging(false)}
                style={{
                  padding: 'var(--spacing-md)',
                  backgroundColor: 'var(--color-wave)',
                  borderBottom: '1px solid var(--color-light-deco)',
                  cursor: 'move',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  userSelect: 'none'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)' }}>
                  <Icon name="view" size={20} color="var(--color-blue-default)" />
                  <h3 style={{
                    fontSize: 'var(--font-size-base)',
                    fontWeight: 'var(--font-weight-semibold)',
                    color: 'var(--color-night)',
                    margin: 0
                  }}>
                    Street View - {selectedProperty?.address}
                  </h3>
                </div>
                <button
                  onClick={() => setShowStreetView(false)}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 'var(--spacing-xs)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 'var(--border-radius-sm)',
                    transition: 'var(--transition-fast)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--color-light-deco)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  <Icon name="close" size={20} color="var(--color-twilight)" />
                </button>
              </div>

              {/* Street View Image */}
              <div style={{
                position: 'relative',
                width: '100%',
                height: '300px',
                overflow: 'hidden',
                backgroundColor: 'var(--color-light-deco)'
              }}>
                <img
                  src={streetViewImage}
                  alt="Street view of property"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
                <div style={{
                  position: 'absolute',
                  bottom: 'var(--spacing-sm)',
                  right: 'var(--spacing-sm)',
                  backgroundColor: 'rgba(0, 0, 0, 0.7)',
                  color: 'var(--color-white)',
                  padding: 'var(--spacing-xs) var(--spacing-sm)',
                  borderRadius: 'var(--border-radius-sm)',
                  fontSize: 'var(--font-size-xs)'
                }}>
                  Google Street View - Nov 2023
                </div>
              </div>

              {/* Property Details */}
              <div style={{ padding: 'var(--spacing-lg)' }}>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: 'var(--spacing-md)',
                  marginBottom: 'var(--spacing-lg)'
                }}>
                  <div>
                    <p style={{
                      fontSize: 'var(--font-size-xs)',
                      color: 'var(--color-twilight)',
                      marginBottom: 'var(--spacing-xs)',
                      textTransform: 'uppercase',
                      fontWeight: 'var(--font-weight-semibold)'
                    }}>
                      Property Type
                    </p>
                    <p style={{
                      fontSize: 'var(--font-size-sm)',
                      color: 'var(--color-night)',
                      fontWeight: 'var(--font-weight-medium)'
                    }}>
                      Residential Dwelling
                    </p>
                  </div>
                  <div>
                    <p style={{
                      fontSize: 'var(--font-size-xs)',
                      color: 'var(--color-twilight)',
                      marginBottom: 'var(--spacing-xs)',
                      textTransform: 'uppercase',
                      fontWeight: 'var(--font-weight-semibold)'
                    }}>
                      Council District
                    </p>
                    <p style={{
                      fontSize: 'var(--font-size-sm)',
                      color: 'var(--color-night)',
                      fontWeight: 'var(--font-weight-medium)'
                    }}>
                      Coorparoo Ward
                    </p>
                  </div>
                  <div>
                    <p style={{
                      fontSize: 'var(--font-size-xs)',
                      color: 'var(--color-twilight)',
                      marginBottom: 'var(--spacing-xs)',
                      textTransform: 'uppercase',
                      fontWeight: 'var(--font-weight-semibold)'
                    }}>
                      Elevation
                    </p>
                    <p style={{
                      fontSize: 'var(--font-size-sm)',
                      color: 'var(--color-night)',
                      fontWeight: 'var(--font-weight-medium)'
                    }}>
                      8.5m AHD
                    </p>
                  </div>
                  <div>
                    <p style={{
                      fontSize: 'var(--font-size-xs)',
                      color: 'var(--color-twilight)',
                      marginBottom: 'var(--spacing-xs)',
                      textTransform: 'uppercase',
                      fontWeight: 'var(--font-weight-semibold)'
                    }}>
                      Distance to CBD
                    </p>
                    <p style={{
                      fontSize: 'var(--font-size-sm)',
                      color: 'var(--color-night)',
                      fontWeight: 'var(--font-weight-medium)'
                    }}>
                      2.8 km
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div style={{ display: 'flex', gap: 'var(--spacing-sm)' }}>
                  <Button
                    variant="primary"
                    size="small"
                    onClick={() => console.log('Open in Google Maps')}
                    style={{ flex: 1 }}
                  >
                    <Icon name="launch" size={14} />
                    Open in Maps
                  </Button>
                  <Button
                    variant="secondary"
                    size="small"
                    onClick={() => console.log('View property report')}
                    style={{ flex: 1 }}
                  >
                    <Icon name="document" size={14} />
                    Full Report
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Scale and Coordinates - East Brisbane */}
        <div style={{
          position: 'absolute',
          bottom: 'var(--spacing-lg)',
          left: 'var(--spacing-lg)',
          backgroundColor: 'var(--color-white)',
          padding: 'var(--spacing-sm) var(--spacing-md)',
          borderRadius: 'var(--border-radius-sm)',
          boxShadow: 'var(--shadow-md)',
          fontSize: 'var(--font-size-xs)',
          color: 'var(--color-twilight)'
        }}>
          Scale: 1:{Math.round(10000 / (mapZoom / 100))} | Lat: -27.4857, Lng: 153.0364 | East Brisbane
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0% {
            transform: translate(-50%, -50%) scale(1);
          }
          50% {
            transform: translate(-50%, -50%) scale(1.1);
          }
          100% {
            transform: translate(-50%, -50%) scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default PropertyMapViewer;