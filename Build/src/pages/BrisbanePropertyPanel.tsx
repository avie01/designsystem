import React, { useState } from 'react';
import Icon from '../components/Icon/Icon';
import streetViewImage from '../Images/streetview.png';

/**
 * BRISBANE PROPERTY PANEL
 * Pixel-perfect recreation of Brisbane City Plan property details menu
 */
interface SelectedItem {
  id: string;
  name: string;
  type: 'zone' | 'neighbourhoodPlan' | 'overlay';
  category?: string;
}

interface BrisbanePropertyPanelProps {
  selectedItems: SelectedItem[];
  setSelectedItems: React.Dispatch<React.SetStateAction<SelectedItem[]>>;
  showCart: boolean;
  setShowCart: React.Dispatch<React.SetStateAction<boolean>>;
}

const BrisbanePropertyPanel: React.FC<BrisbanePropertyPanelProps> = ({
  selectedItems,
  setSelectedItems,
  showCart,
  setShowCart
}) => {
  const [expandedSections, setExpandedSections] = useState({
    zones: true,
    neighbourhoodPlans: true,
    overlays: true,
    airportEnvirons: true,
    communityPurposes: true,
    potentialAcidSulfate: true,
    roadHierarchy: true
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section as keyof typeof prev]
    }));
  };

  const addToCart = (item: SelectedItem) => {
    setSelectedItems(prev => {
      const exists = prev.find(existing => existing.id === item.id);
      if (!exists) {
        return [...prev, item];
      }
      return prev;
    });
  };

  const removeFromCart = (itemId: string) => {
    setSelectedItems(prev => prev.filter(item => item.id !== itemId));
  };

  const isItemSelected = (itemId: string) => {
    return selectedItems.some(item => item.id === itemId);
  };

  return (
    <div style={{
      width: '400px',
      height: '100vh',
      backgroundColor: '#FFFFFF',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      fontSize: '14px',
      lineHeight: '1.4',
      color: '#333333',
      border: '1px solid #E0E0E0',
      borderRadius: '8px 0 8px 8px',
      overflow: 'hidden',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      display: 'flex',
      flexDirection: 'column'
    }}>
      
      {/* Fixed Header with blue background */}
      <div style={{
        backgroundColor: '#3560C1',
        color: '#FFFFFF',
        padding: '16px',
        fontWeight: '600',
        fontSize: '16px',
        letterSpacing: '0.5px',
        flexShrink: 0
      }}>
        51 DIDSBURY ST EAST<br />
        BRISBANE 4169
      </div>

      {/* Scrollable Content Area */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        overflowX: 'hidden'
      }}>

      {/* Property info section */}
      <div style={{
        padding: '16px',
        borderBottom: '1px solid #E0E0E0'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '8px'
        }}>
          <div style={{
            width: '32px',
            height: '32px',
            backgroundColor: '#E91E63',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <div style={{
              width: '16px',
              height: '16px',
              backgroundColor: '#FFFFFF',
              clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'
            }} />
          </div>
          <div>
            <div style={{ fontWeight: '500', color: '#666666' }}>Plan Area 405 m²</div>
            <div style={{ fontSize: '13px', color: '#888888' }}>
              Lot on Plan Lot 152 on<br />RP11503
            </div>
          </div>
        </div>
      </div>

      {/* Aerial view section */}
      <div style={{
        padding: '0',
        borderBottom: '1px solid #E0E0E0'
      }}>
        <div style={{
          width: '100%',
          height: '200px',
          backgroundImage: `url(${streetViewImage})`,
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          position: 'relative'
        }}>
        </div>
      </div>

      {/* Action menu items */}
      <div style={{ padding: '0' }}>
        {[
          { icon: 'document', text: 'Property Specific City Plan Chapters' },
          { icon: 'view', text: 'View Full City Plan' },
          { icon: 'pdf', text: 'View Property Lot Report (PDF)' },
          { icon: 'pdf', text: 'View Property Holding Report (PDF)' },
          { icon: 'zoom-in', text: 'Zoom to selected property' },
          { icon: 'close', text: 'Clear selected property' }
        ].map((item, index) => (
          <div key={index} style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '12px 16px',
            borderBottom: index < 5 ? '1px solid #F0F0F0' : 'none',
            cursor: 'pointer',
            transition: 'background-color 0.2s',
            backgroundColor: 'transparent'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#F8F9FA';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}>
            <Icon name={item.icon} size={16} color="#666666" />
            <span style={{ fontSize: '14px', color: '#333333' }}>{item.text}</span>
          </div>
        ))}
      </div>

      {/* Version info */}
      <div style={{
        padding: '16px',
        backgroundColor: '#F8F9FA',
        borderTop: '1px solid #E0E0E0'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '8px'
        }}>
          <span style={{
            backgroundColor: '#28A745',
            color: '#FFFFFF',
            padding: '2px 8px',
            borderRadius: '4px',
            fontSize: '12px',
            fontWeight: '600'
          }}>
            Current
          </span>
          <span style={{
            fontSize: '13px',
            color: '#007BFF',
            cursor: 'pointer'
          }}>
            🔄 Change
          </span>
        </div>
        <div style={{
          fontSize: '13px',
          color: '#333333',
          fontWeight: '500',
          marginBottom: '4px'
        }}>
          Version: v33
        </div>
        <div style={{
          fontSize: '13px',
          color: '#666666',
          marginBottom: '12px'
        }}>
          Effective Date: 27 Jun 2025
        </div>
        <div style={{
          fontSize: '13px',
          color: '#333333'
        }}>
          The following information applies to this property
        </div>
      </div>

      {/* Expandable sections */}
      <div>
        {/* Zones Section */}
        <div style={{ borderBottom: '1px solid #E0E0E0' }}>
          <div 
            onClick={() => toggleSection('zones')}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '16px',
              backgroundColor: '#FAFAFA',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '15px'
            }}
          >
            <span>Zones</span>
            <Icon 
              name={expandedSections.zones ? 'chevron-up' : 'chevron-down'} 
              size={16} 
              color="#666666" 
            />
          </div>
          {expandedSections.zones && (
            <div style={{ padding: '16px' }}>
              <div 
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  marginBottom: '8px',
                  padding: '8px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s ease',
                  backgroundColor: isItemSelected('zone-cr2') ? '#E3F2FD' : 'transparent',
                  border: isItemSelected('zone-cr2') ? '1px solid #2196F3' : '1px solid transparent'
                }}
                onMouseEnter={(e) => {
                  if (!isItemSelected('zone-cr2')) {
                    e.currentTarget.style.backgroundColor = '#F8F9FA';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isItemSelected('zone-cr2')) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
                onClick={() => {
                  const zoneItem: SelectedItem = {
                    id: 'zone-cr2',
                    name: 'CR2 Character (Infill housing)',
                    type: 'zone',
                    category: 'Zones'
                  };
                  if (isItemSelected('zone-cr2')) {
                    removeFromCart('zone-cr2');
                  } else {
                    addToCart(zoneItem);
                  }
                }}
              >
                <div style={{
                  width: '16px',
                  height: '16px',
                  backgroundColor: '#E91E63',
                  borderRadius: '2px'
                }} />
                <span style={{
                  color: '#333333',
                  fontSize: '14px',
                  fontWeight: '500',
                  flex: 1
                }}>
                  CR2 Character (Infill housing)
                </span>
                {isItemSelected('zone-cr2') && (
                  <Icon name="checkmark" size={16} color="#2196F3" />
                )}
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                paddingLeft: '28px',
                cursor: 'pointer'
              }}>
                <Icon name="view" size={14} color="#666666" />
                <span style={{ fontSize: '13px', color: '#666666' }}>View section</span>
              </div>
            </div>
          )}
        </div>

        {/* Neighbourhood Plans Section */}
        <div style={{ borderBottom: '1px solid #E0E0E0' }}>
          <div 
            onClick={() => toggleSection('neighbourhoodPlans')}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '16px',
              backgroundColor: '#FAFAFA',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '15px'
            }}
          >
            <span>Neighbourhood Plans</span>
            <Icon 
              name={expandedSections.neighbourhoodPlans ? 'chevron-up' : 'chevron-down'} 
              size={16} 
              color="#666666" 
            />
          </div>
          {expandedSections.neighbourhoodPlans && (
            <div style={{ padding: '16px' }}>
              <div 
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  marginBottom: '8px',
                  padding: '8px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s ease',
                  backgroundColor: isItemSelected('neighbourhood-east-brisbane') ? '#E3F2FD' : 'transparent',
                  border: isItemSelected('neighbourhood-east-brisbane') ? '1px solid #2196F3' : '1px solid transparent'
                }}
                onMouseEnter={(e) => {
                  if (!isItemSelected('neighbourhood-east-brisbane')) {
                    e.currentTarget.style.backgroundColor = '#F8F9FA';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isItemSelected('neighbourhood-east-brisbane')) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
                onClick={() => {
                  const neighbourhoodItem: SelectedItem = {
                    id: 'neighbourhood-east-brisbane',
                    name: 'East Brisbane-Coorparoo district neighbourhood plan',
                    type: 'neighbourhoodPlan',
                    category: 'Neighbourhood Plans'
                  };
                  if (isItemSelected('neighbourhood-east-brisbane')) {
                    removeFromCart('neighbourhood-east-brisbane');
                  } else {
                    addToCart(neighbourhoodItem);
                  }
                }}
              >
                <div style={{
                  width: '16px',
                  height: '16px',
                  backgroundColor: '#000000',
                  borderRadius: '2px',
                  transform: 'rotate(45deg)'
                }} />
                <span style={{
                  color: '#333333',
                  fontSize: '14px',
                  fontWeight: '500',
                  flex: 1
                }}>
                  East Brisbane-Coorparoo<br />district neighbourhood plan
                </span>
                {isItemSelected('neighbourhood-east-brisbane') && (
                  <Icon name="checkmark" size={16} color="#2196F3" />
                )}
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                paddingLeft: '28px',
                cursor: 'pointer'
              }}>
                <Icon name="view" size={14} color="#666666" />
                <span style={{ fontSize: '13px', color: '#666666' }}>View section</span>
              </div>
            </div>
          )}
        </div>

        {/* Overlays Section */}
        <div>
          <div 
            onClick={() => toggleSection('overlays')}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '16px',
              backgroundColor: '#FAFAFA',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '15px'
            }}
          >
            <span>Overlays</span>
            <Icon 
              name={expandedSections.overlays ? 'chevron-up' : 'chevron-down'} 
              size={16} 
              color="#666666" 
            />
          </div>
          {expandedSections.overlays && (
            <div style={{ padding: '0' }}>
              {/* Airport environs overlay group */}
              <div style={{ borderBottom: '1px solid #E0E0E0' }}>
                <div 
                  onClick={() => toggleSection('airportEnvirons')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 16px',
                    backgroundColor: '#FAFAFA',
                    cursor: 'pointer',
                    fontWeight: '500',
                    fontSize: '14px',
                    color: '#525252'
                  }}
                >
                  <span>Airport environs overlay</span>
                  <Icon 
                    name={expandedSections.airportEnvirons ? 'chevron-up' : 'chevron-down'} 
                    size={16} 
                    color="#666666" 
                  />
                </div>
                {expandedSections.airportEnvirons && (
                  <div style={{ padding: '16px' }}>
                    {[
                      { 
                        name: 'OLS - Horizontal limitation surface boundary',
                        iconColor: '#007BFF',
                        iconShape: 'triangle'
                      },
                      { 
                        name: 'Procedures for air navigation surfaces (PANS)',
                        iconColor: '#007BFF',
                        iconShape: 'triangle'
                      },
                      { 
                        name: 'BBS zone - Distance from airport 8-13km',
                        iconColor: '#FFD700',
                        iconShape: 'triangle'
                      }
                    ].map((overlay, index) => {
                      const overlayId = `airport-${index}`;
                      return (
                        <div key={index} style={{ marginBottom: '16px' }}>
                          <div 
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '12px',
                              marginBottom: '8px',
                              padding: '8px',
                              borderRadius: '4px',
                              cursor: 'pointer',
                              transition: 'background-color 0.2s ease',
                              backgroundColor: isItemSelected(overlayId) ? '#E3F2FD' : 'transparent',
                              border: isItemSelected(overlayId) ? '1px solid #2196F3' : '1px solid transparent'
                            }}
                            onMouseEnter={(e) => {
                              if (!isItemSelected(overlayId)) {
                                e.currentTarget.style.backgroundColor = '#F8F9FA';
                              }
                            }}
                            onMouseLeave={(e) => {
                              if (!isItemSelected(overlayId)) {
                                e.currentTarget.style.backgroundColor = 'transparent';
                              }
                            }}
                            onClick={() => {
                              const overlayItem: SelectedItem = {
                                id: overlayId,
                                name: overlay.name,
                                type: 'overlay',
                                category: 'Overlays'
                              };
                              if (isItemSelected(overlayId)) {
                                removeFromCart(overlayId);
                              } else {
                                addToCart(overlayItem);
                              }
                            }}
                          >
                            <div style={{
                              width: '16px',
                              height: '16px',
                              backgroundColor: overlay.iconColor,
                              ...(overlay.iconShape === 'triangle' && {
                                clipPath: 'polygon(0% 0%, 100% 50%, 0% 100%)'
                              })
                            }} />
                            <span style={{
                              color: '#333333',
                              fontSize: '14px',
                              fontWeight: '500',
                              flex: 1
                            }}>
                              {overlay.name}
                            </span>
                            {isItemSelected(overlayId) && (
                              <Icon name="checkmark" size={16} color="#2196F3" />
                            )}
                          </div>
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            paddingLeft: '28px',
                            cursor: 'pointer'
                          }}>
                            <Icon name="view" size={14} color="#666666" />
                            <span style={{ fontSize: '13px', color: '#666666' }}>View section</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Community purposes network overlay group */}
              <div style={{ borderBottom: '1px solid #E0E0E0' }}>
                <div 
                  onClick={() => toggleSection('communityPurposes')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 16px',
                    backgroundColor: '#FAFAFA',
                    cursor: 'pointer',
                    fontWeight: '500',
                    fontSize: '14px',
                    color: '#525252'
                  }}
                >
                  <span>Community purposes network overlay</span>
                  <Icon 
                    name={expandedSections.communityPurposes ? 'chevron-up' : 'chevron-down'} 
                    size={16} 
                    color="#666666" 
                  />
                </div>
                {expandedSections.communityPurposes && (
                  <div style={{ padding: '16px' }}>
                    {[
                      { 
                        name: 'Critical infrastructure and movement network overlay',
                        iconColor: '#E91E63',
                        iconShape: 'lines'
                      },
                      { 
                        name: 'Critical infrastructure and movement planning area sub-category',
                        iconColor: '#FF0000',
                        iconShape: 'lines'
                      },
                      { 
                        name: 'Dwelling house character overlay',
                        iconColor: '#E91E63',
                        iconShape: 'rectangle'
                      }
                    ].map((overlay, index) => {
                      const overlayId = `community-${index}`;
                      return (
                        <div key={index} style={{ marginBottom: '16px' }}>
                          <div 
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '12px',
                              marginBottom: '8px',
                              padding: '8px',
                              borderRadius: '4px',
                              cursor: 'pointer',
                              transition: 'background-color 0.2s ease',
                              backgroundColor: isItemSelected(overlayId) ? '#E3F2FD' : 'transparent',
                              border: isItemSelected(overlayId) ? '1px solid #2196F3' : '1px solid transparent'
                            }}
                            onMouseEnter={(e) => {
                              if (!isItemSelected(overlayId)) {
                                e.currentTarget.style.backgroundColor = '#F8F9FA';
                              }
                            }}
                            onMouseLeave={(e) => {
                              if (!isItemSelected(overlayId)) {
                                e.currentTarget.style.backgroundColor = 'transparent';
                              }
                            }}
                            onClick={() => {
                              const overlayItem: SelectedItem = {
                                id: overlayId,
                                name: overlay.name,
                                type: 'overlay',
                                category: 'Overlays'
                              };
                              if (isItemSelected(overlayId)) {
                                removeFromCart(overlayId);
                              } else {
                                addToCart(overlayItem);
                              }
                            }}
                          >
                            <div style={{
                              width: '16px',
                              height: '16px',
                              backgroundColor: overlay.iconColor,
                              ...(overlay.iconShape === 'rectangle' && {
                                borderRadius: '2px'
                              }),
                              ...(overlay.iconShape === 'lines' && {
                                background: `repeating-linear-gradient(45deg, ${overlay.iconColor}, ${overlay.iconColor} 2px, transparent 2px, transparent 4px)`,
                                borderRadius: '2px'
                              })
                            }} />
                            <span style={{
                              color: '#333333',
                              fontSize: '14px',
                              fontWeight: '500',
                              flex: 1
                            }}>
                              {overlay.name}
                            </span>
                            {isItemSelected(overlayId) && (
                              <Icon name="checkmark" size={16} color="#2196F3" />
                            )}
                          </div>
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            paddingLeft: '28px',
                            cursor: 'pointer'
                          }}>
                            <Icon name="view" size={14} color="#666666" />
                            <span style={{ fontSize: '13px', color: '#666666' }}>View section</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Other overlays without subcategories */}
              <div style={{ padding: '16px' }}>
                {[
                  { 
                    name: 'Potential and actual acid sulfate soils sub-category',
                    iconColor: '#FFA500',
                    iconShape: 'triangle'
                  },
                  { 
                    name: 'Land above 5m AHD and below 20m AHD sub-category',
                    iconColor: '#8B4513',
                    iconShape: 'rectangle'
                  }
                ].map((overlay, index) => {
                  const overlayId = `other-${index}`;
                  return (
                    <div key={index} style={{ marginBottom: '16px' }}>
                      <div 
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          marginBottom: '8px',
                          padding: '8px',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          transition: 'background-color 0.2s ease',
                          backgroundColor: isItemSelected(overlayId) ? '#E3F2FD' : 'transparent',
                          border: isItemSelected(overlayId) ? '1px solid #2196F3' : '1px solid transparent'
                        }}
                        onMouseEnter={(e) => {
                          if (!isItemSelected(overlayId)) {
                            e.currentTarget.style.backgroundColor = '#F8F9FA';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!isItemSelected(overlayId)) {
                            e.currentTarget.style.backgroundColor = 'transparent';
                          }
                        }}
                        onClick={() => {
                          const overlayItem: SelectedItem = {
                            id: overlayId,
                            name: overlay.name,
                            type: 'overlay',
                            category: 'Overlays'
                          };
                          if (isItemSelected(overlayId)) {
                            removeFromCart(overlayId);
                          } else {
                            addToCart(overlayItem);
                          }
                        }}
                      >
                        <div style={{
                          width: '16px',
                          height: '16px',
                          backgroundColor: overlay.iconColor,
                          ...(overlay.iconShape === 'triangle' && {
                            clipPath: 'polygon(0% 0%, 100% 50%, 0% 100%)'
                          }),
                          ...(overlay.iconShape === 'rectangle' && {
                            borderRadius: '2px'
                          })
                        }} />
                        <span style={{
                          color: '#333333',
                          fontSize: '14px',
                          fontWeight: '500',
                          flex: 1
                        }}>
                          {overlay.name}
                        </span>
                        {isItemSelected(overlayId) && (
                          <Icon name="checkmark" size={16} color="#2196F3" />
                        )}
                      </div>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        paddingLeft: '28px',
                        cursor: 'pointer'
                      }}>
                        <Icon name="view" size={14} color="#666666" />
                        <span style={{ fontSize: '13px', color: '#666666' }}>View section</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
      

      {/* Cart Modal */}
      {showCart && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: '#FFFFFF',
            width: '500px',
            maxHeight: '70vh',
            borderRadius: '8px',
            overflow: 'hidden',
            boxShadow: '0 10px 40px rgba(0,0,0,0.2)'
          }}>
            {/* Modal Header */}
            <div style={{
              backgroundColor: '#3560C1',
              color: '#FFFFFF',
              padding: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Icon name="shopping-cart" size={20} color="#FFFFFF" />
                <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '600' }}>
                  Selected Planning Items ({selectedItems.length})
                </h3>
              </div>
              <button
                onClick={() => setShowCart(false)}
                style={{
                  backgroundColor: 'transparent',
                  border: 'none',
                  color: '#FFFFFF',
                  cursor: 'pointer',
                  padding: '4px'
                }}
              >
                <Icon name="close" size={20} color="#FFFFFF" />
              </button>
            </div>

            {/* Modal Content */}
            <div style={{
              padding: '16px',
              maxHeight: 'calc(70vh - 120px)',
              overflowY: 'auto'
            }}>
              {selectedItems.length === 0 ? (
                <div style={{
                  textAlign: 'center',
                  padding: '40px',
                  color: '#666666'
                }}>
                  <Icon name="shopping-cart" size={48} color="#E0E0E0" />
                  <p style={{ marginTop: '16px', fontSize: '14px' }}>
                    No items selected yet
                  </p>
                </div>
              ) : (
                <div>
                  {['Zones', 'Neighbourhood Plans', 'Overlays'].map(category => {
                    const categoryItems = selectedItems.filter(item => item.category === category);
                    if (categoryItems.length === 0) return null;
                    
                    return (
                      <div key={category} style={{ marginBottom: '24px' }}>
                        <h4 style={{
                          fontSize: '14px',
                          fontWeight: '600',
                          color: '#333333',
                          marginBottom: '12px',
                          paddingBottom: '4px',
                          borderBottom: '1px solid #E0E0E0'
                        }}>
                          {category} ({categoryItems.length})
                        </h4>
                        {categoryItems.map(item => (
                          <div key={item.id} style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '8px 0',
                            borderBottom: '1px solid #F0F0F0'
                          }}>
                            <span style={{
                              fontSize: '13px',
                              color: '#333333',
                              flex: 1
                            }}>
                              {item.name}
                            </span>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              style={{
                                backgroundColor: 'transparent',
                                border: 'none',
                                color: '#666666',
                                cursor: 'pointer',
                                padding: '4px'
                              }}
                              title="Remove from cart"
                            >
                              <Icon name="close" size={16} color="#666666" />
                            </button>
                          </div>
                        ))}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            {selectedItems.length > 0 && (
              <div style={{
                padding: '16px',
                borderTop: '1px solid #E0E0E0',
                display: 'flex',
                gap: '12px',
                justifyContent: 'flex-end'
              }}>
                <button
                  onClick={() => {
                    setSelectedItems([]);
                    setShowCart(false);
                  }}
                  style={{
                    backgroundColor: 'transparent',
                    border: '1px solid #E0E0E0',
                    color: '#666666',
                    padding: '8px 16px',
                    borderRadius: '4px',
                    fontSize: '13px',
                    cursor: 'pointer'
                  }}
                >
                  Clear All
                </button>
                <button
                  onClick={() => {
                    console.log('Export selected items:', selectedItems);
                    setShowCart(false);
                    window.location.href = '#/planning-export';
                  }}
                  style={{
                    backgroundColor: '#3560C1',
                    border: 'none',
                    color: '#FFFFFF',
                    padding: '8px 16px',
                    borderRadius: '4px',
                    fontSize: '13px',
                    fontWeight: '500',
                    cursor: 'pointer'
                  }}
                >
                  Export Items ({selectedItems.length})
                </button>
              </div>
            )}
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default BrisbanePropertyPanel;