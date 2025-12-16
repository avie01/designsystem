import React, { useState } from 'react';
import Button from '../components/Button/Button';
import Input from '../components/Input/Input';
import Icon from '../components/Icon/Icon';
import ODLTheme from '../styles/ODLTheme';
import bclogo from '../Images/bclogo.png';

interface SelectedItem {
  id: string;
  name: string;
  type: 'zone' | 'neighbourhoodPlan' | 'overlay';
  category?: string;
}

interface PlanningExportProps {
  selectedItems?: SelectedItem[];
}

/**
 * PLANNING EXPORT
 * Page for exporting and managing selected planning items
 */
const PlanningExport: React.FC<PlanningExportProps> = ({ 
  selectedItems = [] 
}) => {
  const [exportFormat, setExportFormat] = useState<'pdf' | 'csv' | 'json'>('pdf');
  const [includeDetails, setIncludeDetails] = useState(true);
  const [email, setEmail] = useState('');
  const [projectName, setProjectName] = useState('');

  // Mock data for demonstration - in real app this would come from props or context
  const mockItems: SelectedItem[] = selectedItems.length > 0 ? selectedItems : [
    {
      id: 'zone-cr2',
      name: 'CR2 Character (Infill housing)',
      type: 'zone',
      category: 'Zones'
    },
    {
      id: 'neighbourhood-east-brisbane',
      name: 'East Brisbane-Coorparoo district neighbourhood plan',
      type: 'neighbourhoodPlan',
      category: 'Neighbourhood Plans'
    },
    {
      id: 'overlay-3',
      name: 'BBS zone - Distance from airport 8-13km',
      type: 'overlay',
      category: 'Overlays'
    }
  ];

  const handleExport = () => {
    console.log('Exporting items:', {
      items: mockItems,
      format: exportFormat,
      includeDetails,
      projectName,
      email
    });
    // In real app, this would trigger the export/email process
  };

  const getItemTypeIcon = (type: string) => {
    switch (type) {
      case 'zone': return 'location';
      case 'neighbourhoodPlan': return 'map';
      case 'overlay': return 'layers';
      default: return 'document';
    }
  };

  return (
    <div style={{ minHeight: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid #E0E0E0',
        padding: `${ODLTheme.spacing[3]} ${ODLTheme.spacing[6]}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <img 
          src={bclogo} 
          alt="Brisbane City Plan" 
          style={{ 
            height: '60px',
            width: 'auto'
          }} 
        />
        <div style={{ display: 'flex', gap: ODLTheme.spacing[3] }}>
          <Button
            variant="secondary"
            size="md"
            onClick={() => window.history.back()}
          >
            <Icon name="chevron-left" size={16} />
            Back to Plan Details
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div style={{
        flex: 1,
        backgroundColor: '#F8F9FA',
        minHeight: 'calc(100vh - 100px)',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Content Wrapper */}
        <div style={{
          flex: 1,
          width: '100%',
          padding: `${ODLTheme.spacing[6]} ${ODLTheme.spacing[4]}`,
          display: 'flex',
          flexDirection: 'column'
        }}>
          <div style={{
            flex: 1,
            width: '100%',
            display: 'grid',
            gridTemplateColumns: '2fr 1fr',
            gap: ODLTheme.spacing[6],
            alignItems: 'stretch',
            backgroundColor: '#FFFFFF',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            overflow: 'hidden'
          }}>
            {/* Left Column - Selected Items */}
            <div style={{
              padding: ODLTheme.spacing[6],
              display: 'flex',
              flexDirection: 'column'
            }}>
            <div style={{
              marginBottom: ODLTheme.spacing[4]
            }}>
              <h1 style={{
                fontSize: '24px',
                fontWeight: '600',
                color: '#333333',
                margin: 0
              }}>
                Export Planning Information
              </h1>
            </div>

            <p style={{
              fontSize: '14px',
              color: '#666666',
              marginBottom: ODLTheme.spacing[4]
            }}>
              Review and export your selected planning items for 51 DIDSBURY ST EAST, BRISBANE 4169
            </p>

            {/* Project Name */}
            <div style={{ marginBottom: ODLTheme.spacing[4] }}>
              <Input
                type="text"
                label="Project Name (Optional)"
                placeholder="e.g., Didsbury Street Development Application"
                value={projectName}
                onChange={setProjectName}
                helperText="Give your export a name for future reference"
              />
            </div>

            {/* Selected Items List */}
            <div style={{ marginBottom: ODLTheme.spacing[4] }}>
              <h3 style={{
                fontSize: '16px',
                fontWeight: '600',
                color: '#333333',
                marginBottom: ODLTheme.spacing[3]
              }}>
                Selected Items ({mockItems.length})
              </h3>

              <div style={{
                border: '1px solid #E0E0E0',
                borderRadius: '6px',
                overflow: 'hidden'
              }}>
                {['Zones', 'Neighbourhood Plans', 'Overlays'].map(category => {
                  const categoryItems = mockItems.filter(item => item.category === category);
                  if (categoryItems.length === 0) return null;
                  
                  return (
                    <div key={category}>
                      <div style={{
                        backgroundColor: '#F8F9FA',
                        padding: ODLTheme.spacing[3],
                        borderBottom: '1px solid #E0E0E0',
                        fontSize: '14px',
                        fontWeight: '600',
                        color: '#333333'
                      }}>
                        {category} ({categoryItems.length})
                      </div>
                      {categoryItems.map((item, index) => (
                        <div key={item.id} style={{
                          padding: ODLTheme.spacing[3],
                          borderBottom: index < categoryItems.length - 1 ? '1px solid #F0F0F0' : 'none',
                          display: 'flex',
                          alignItems: 'center',
                          gap: ODLTheme.spacing[3]
                        }}>
                          <Icon 
                            name={getItemTypeIcon(item.type)} 
                            size={16} 
                            color="#666666" 
                          />
                          <span style={{
                            fontSize: '13px',
                            color: '#333333',
                            flex: 1
                          }}>
                            {item.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

            {/* Right Column - Export Options */}
            <div style={{
              padding: ODLTheme.spacing[6],
              borderLeft: '1px solid #E0E0E0',
              display: 'flex',
              flexDirection: 'column'
            }}>
            <h2 style={{
              fontSize: '18px',
              fontWeight: '600',
              color: '#333333',
              marginBottom: ODLTheme.spacing[4]
            }}>
              Export Options
            </h2>

            {/* Format Selection */}
            <div style={{ marginBottom: ODLTheme.spacing[4] }}>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '500',
                color: '#333333',
                marginBottom: ODLTheme.spacing[2]
              }}>
                Export Format
              </label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: ODLTheme.spacing[2] }}>
                {[
                  { value: 'pdf', label: 'PDF Report', icon: 'document', desc: 'Comprehensive report with maps' },
                  { value: 'csv', label: 'CSV Data', icon: 'table', desc: 'Spreadsheet-friendly format' },
                  { value: 'json', label: 'JSON Data', icon: 'code', desc: 'For developers and APIs' }
                ].map(format => (
                  <label key={format.value} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: ODLTheme.spacing[2],
                    padding: ODLTheme.spacing[2],
                    border: `1px solid ${exportFormat === format.value ? '#2196F3' : '#E0E0E0'}`,
                    borderRadius: '4px',
                    cursor: 'pointer',
                    backgroundColor: exportFormat === format.value ? '#E3F2FD' : 'transparent'
                  }}>
                    <input
                      type="radio"
                      name="exportFormat"
                      value={format.value}
                      checked={exportFormat === format.value}
                      onChange={(e) => setExportFormat(e.target.value as any)}
                      style={{ margin: 0 }}
                    />
                    <Icon name={format.icon as any} size={16} color="#666666" />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '13px', fontWeight: '500', color: '#333333' }}>
                        {format.label}
                      </div>
                      <div style={{ fontSize: '12px', color: '#666666' }}>
                        {format.desc}
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Include Details Checkbox */}
            <div style={{ marginBottom: ODLTheme.spacing[4] }}>
              <label style={{
                display: 'flex',
                alignItems: 'center',
                gap: ODLTheme.spacing[2],
                cursor: 'pointer'
              }}>
                <input
                  type="checkbox"
                  checked={includeDetails}
                  onChange={(e) => setIncludeDetails(e.target.checked)}
                />
                <span style={{ fontSize: '14px', color: '#333333' }}>
                  Include detailed descriptions and requirements
                </span>
              </label>
            </div>

            {/* Email Option */}
            <div style={{ marginBottom: ODLTheme.spacing[4] }}>
              <Input
                type="email"
                label="Email Results (Optional)"
                placeholder="your.email@domain.com"
                value={email}
                onChange={setEmail}
                helperText="Receive a copy via email"
              />
            </div>

            {/* Export Buttons */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: ODLTheme.spacing[3]
            }}>
              <Button
                variant="primary"
                size="lg"
                onClick={handleExport}
                style={{ width: '100%' }}
              >
                <Icon name="download" size={16} />
                Export {exportFormat.toUpperCase()}
              </Button>
              
              <Button
                variant="secondary"
                size="md"
                onClick={() => {
                  console.log('Save for later');
                }}
                style={{ width: '100%' }}
              >
                <Icon name="bookmark" size={16} />
                Save for Later
              </Button>
            </div>

            {/* Help Text */}
            <div style={{
              marginTop: ODLTheme.spacing[4],
              padding: ODLTheme.spacing[3],
              backgroundColor: '#FFF3E0',
              borderRadius: '4px',
              border: '1px solid #FFB74D'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: ODLTheme.spacing[2],
                marginBottom: ODLTheme.spacing[1]
              }}>
                <Icon name="help" size={14} color="#F57C00" />
                <span style={{
                  fontSize: '12px',
                  fontWeight: '600',
                  color: '#F57C00'
                }}>
                  Need Help?
                </span>
              </div>
              <p style={{
                fontSize: '12px',
                color: '#E65100',
                margin: 0,
                lineHeight: 1.4
              }}>
                PDF exports include maps and detailed descriptions. CSV/JSON exports contain structured data only.
              </p>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanningExport;