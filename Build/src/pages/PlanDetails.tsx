import React, { useState, useRef, useEffect } from 'react';
import Button from '../components/Button/Button';
import Input from '../components/Input/Input';
import Icon from '../components/Icon/Icon';
import SimpleTabs from '../components/SimpleTabs/SimpleTabs';
import gisMapImage from '../Images/GIS.png';
import streetViewImage from '../Images/streetview.png';
import BrisbanePropertyPanel from './BrisbanePropertyPanel';
import ODLTheme from '../styles/ODLTheme';
import bclogo from '../Images/bclogo.png';

/**
 * PLAN DETAILS
 * Brisbane City Plan details and planning information lookup
 */

// Define the SelectedItem interface
interface SelectedItem {
  id: string;
  name: string;
  type: 'zone' | 'neighbourhoodPlan' | 'overlay';
  category?: string;
}

const PlanDetails: React.FC = () => {
  // Shared state for selected items
  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([]);
  const [showCart, setShowCart] = useState(false);

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
  const [mapZoom, setMapZoom] = useState(80);
  const [showLayers, setShowLayers] = useState(false);
  const [activeTab, setActiveTab] = useState<'search' | 'layers' | 'details'>('search');
  const [showStreetView, setShowStreetView] = useState(false);
  const [modalPosition, setModalPosition] = useState({ x: 100, y: 100 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [mapPosition, setMapPosition] = useState({ x: 0, y: 0 });
  const [isMapDragging, setIsMapDragging] = useState(false);
  const [mapDragStart, setMapDragStart] = useState({ x: 0, y: 0 });
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const modalRef = useRef<HTMLDivElement>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);

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

  // Map dragging handlers
  const handleMapMouseDown = (e: React.MouseEvent) => {
    setIsMapDragging(true);
    setMapDragStart({
      x: e.clientX - mapPosition.x,
      y: e.clientY - mapPosition.y
    });
  };

  const handleMapMouseMove = (e: React.MouseEvent) => {
    if (isMapDragging) {
      setMapPosition({
        x: e.clientX - mapDragStart.x,
        y: e.clientY - mapDragStart.y
      });
    }
  };

  const handleMapMouseUp = () => {
    setIsMapDragging(false);
    // Update map size based on pan distance
    const panDistance = Math.sqrt(mapPosition.x * mapPosition.x + mapPosition.y * mapPosition.y);
    if (panDistance > 50) {
      // If panned significantly, adjust zoom slightly
      const zoomAdjustment = Math.min(panDistance / 100, 20);
      setMapZoom(prev => Math.min(Math.max(prev + zoomAdjustment, 50), 200));
      // Reset map position after zoom adjustment
      setTimeout(() => setMapPosition({ x: 0, y: 0 }), 300);
    }
  };

  const handleMapMouseLeave = () => {
    setIsMapDragging(false);
    // Apply same logic as mouse up
    const panDistance = Math.sqrt(mapPosition.x * mapPosition.x + mapPosition.y * mapPosition.y);
    if (panDistance > 50) {
      const zoomAdjustment = Math.min(panDistance / 100, 20);
      setMapZoom(prev => Math.min(Math.max(prev + zoomAdjustment, 50), 200));
      setTimeout(() => setMapPosition({ x: 0, y: 0 }), 300);
    }
  };

  const mapLayers = [
    { name: 'Property Boundaries', enabled: true, color: 'var(--color-blue-default)' },
    { name: 'Zoning', enabled: false, color: 'var(--color-purple)' },
    { name: 'Flood Overlay', enabled: false, color: 'var(--color-info)' },
    { name: 'Heritage Sites', enabled: false, color: 'var(--color-warning)' },
    { name: 'Transport Routes', enabled: false, color: 'var(--color-success)' },
  ];

  // Handle window resize and container size changes
  useEffect(() => {
    const updateContainerSize = () => {
      if (mapContainerRef.current) {
        const rect = mapContainerRef.current.getBoundingClientRect();
        setContainerSize({ width: rect.width, height: rect.height });
      }
    };

    // Initial size calculation
    updateContainerSize();

    // Add resize listener
    window.addEventListener('resize', updateContainerSize);

    // Create a ResizeObserver to watch for container size changes
    const resizeObserver = new ResizeObserver(updateContainerSize);
    if (mapContainerRef.current) {
      resizeObserver.observe(mapContainerRef.current);
    }

    return () => {
      window.removeEventListener('resize', updateContainerSize);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div style={{ minHeight: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Fake Header */}
      <div style={{
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid #E0E0E0',
        padding: `${ODLTheme.spacing[3]} ${ODLTheme.spacing[6]}`,
        display: 'flex',
        alignItems: 'center'
      }}>
        <img 
          src={bclogo} 
          alt="Brisbane City Plan" 
          style={{ 
            height: '60px',
            width: 'auto'
          }} 
        />
      </div>

      {/* Main Content */}
      <div style={{
        minHeight: 'calc(100vh - 64px)',
        display: 'flex',
        backgroundColor: 'var(--color-wave)',
        flex: 1
      }}>
      {/* Left Sidebar - Brisbane Property Panel */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'var(--color-white)'
      }}>
        <BrisbanePropertyPanel 
          selectedItems={selectedItems}
          setSelectedItems={setSelectedItems}
          showCart={showCart}
          setShowCart={setShowCart}
        />
      </div>

      {/* Map Area */}
      <div style={{
        flex: 1,
        position: 'relative',
        backgroundColor: 'var(--color-light-deco)',
        overflow: 'hidden'
      }}>
        {/* Shopping Cart Header */}
        {selectedItems.length > 0 && (
          <div style={{
            position: 'absolute',
            top: 'var(--spacing-lg)',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '400px',
            backgroundColor: '#3560C1',
            color: '#FFFFFF',
            padding: '12px 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            borderRadius: '8px',
            zIndex: 100
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <span style={{ fontSize: '14px', fontWeight: '500' }}>
                {selectedItems.length} item{selectedItems.length !== 1 ? 's' : ''} selected
              </span>
            </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={() => console.log('Selected')}
              style={{
                backgroundColor: 'transparent',
                border: '1px solid #FFFFFF',
                color: '#FFFFFF',
                padding: '6px 12px',
                borderRadius: '4px',
                fontSize: '13px',
                cursor: 'pointer',
                transition: 'background-color 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              Selected
            </button>
            <button
              onClick={() => {
                console.log('Export Items');
                window.location.hash = '#/planning-export';
              }}
              style={{
                backgroundColor: '#FFFFFF',
                border: 'none',
                color: '#3560C1',
                padding: '6px 12px',
                borderRadius: '4px',
                fontSize: '13px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'background-color 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#F0F0F0';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#FFFFFF';
              }}
            >
              Export Items
            </button>
          </div>
        </div>
        )}

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
        <div 
          style={{
            width: '100%',
            height: '100%',
            position: 'relative',
            overflow: 'hidden',
            cursor: isMapDragging ? 'grabbing' : 'grab'
          }}
          onMouseDown={handleMapMouseDown}
          onMouseMove={handleMapMouseMove}
          onMouseUp={handleMapMouseUp}
          onMouseLeave={handleMapMouseLeave}
        >
          <img
            src={gisMapImage}
            alt="GIS Map"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
              transform: `scale(${mapZoom / 100}) translate(${mapPosition.x}px, ${mapPosition.y}px)`,
              transition: isMapDragging ? 'none' : 'transform 0.3s ease',
              cursor: 'inherit',
              userSelect: 'none'
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
    </div>
  );
};

export default PlanDetails;