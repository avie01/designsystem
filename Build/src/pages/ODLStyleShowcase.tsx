import React, { useState } from 'react';
import Icon from '../components/Icon/Icon';
import Button from '../components/Button/Button';
import Cards from '../components/Cards/Cards';
import Input from '../components/Input/Input';
import Dropdown from '../components/Dropdown/Dropdown';
import ODLTheme from '../styles/ODLTheme';

const ODLStyleShowcase: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'philosophy' | 'colors' | 'typography' | 'spacing' | 'components' | 'patterns'>('philosophy');
  const [selectedColor, setSelectedColor] = useState<string>('primary');
  const [copiedText, setCopiedText] = useState<string>('');

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(''), 2000);
  };

  const colorSections = {
    primary: [
      { name: 'Primary', value: ODLTheme.colors.primary, var: 'ODLTheme.colors.primary' },
      { name: 'Primary Hover', value: ODLTheme.colors.primaryHover, var: 'ODLTheme.colors.primaryHover' },
      { name: 'Primary Light', value: ODLTheme.colors.primaryLight, var: 'ODLTheme.colors.primaryLight' },
      { name: 'Primary Dark', value: ODLTheme.colors.primaryDark, var: 'ODLTheme.colors.primaryDark' },
    ],
    status: [
      { name: 'Success', value: ODLTheme.colors.success, var: 'ODLTheme.colors.success' },
      { name: 'Error', value: ODLTheme.colors.error, var: 'ODLTheme.colors.error' },
      { name: 'Warning', value: ODLTheme.colors.warning, var: 'ODLTheme.colors.warning' },
      { name: 'Info', value: ODLTheme.colors.info, var: 'ODLTheme.colors.info' },
    ],
    neutral: [
      { name: 'White', value: ODLTheme.colors.white, var: 'ODLTheme.colors.white' },
      { name: 'Background', value: ODLTheme.colors.background, var: 'ODLTheme.colors.background' },
      { name: 'Surface', value: ODLTheme.colors.surface, var: 'ODLTheme.colors.surface' },
      { name: 'Border', value: ODLTheme.colors.border, var: 'ODLTheme.colors.border' },
    ],
    text: [
      { name: 'Primary Text', value: ODLTheme.colors.text.primary, var: 'ODLTheme.colors.text.primary' },
      { name: 'Secondary Text', value: ODLTheme.colors.text.secondary, var: 'ODLTheme.colors.text.secondary' },
      { name: 'Tertiary Text', value: ODLTheme.colors.text.tertiary, var: 'ODLTheme.colors.text.tertiary' },
      { name: 'Disabled Text', value: ODLTheme.colors.text.disabled, var: 'ODLTheme.colors.text.disabled' },
    ],
  };

  const spacingExamples = [
    { name: 'spacing[1]', value: ODLTheme.spacing[1], pixels: '4px' },
    { name: 'spacing[2]', value: ODLTheme.spacing[2], pixels: '8px' },
    { name: 'spacing[3]', value: ODLTheme.spacing[3], pixels: '12px' },
    { name: 'spacing[4]', value: ODLTheme.spacing[4], pixels: '16px' },
    { name: 'spacing[5]', value: ODLTheme.spacing[5], pixels: '20px' },
    { name: 'spacing[6]', value: ODLTheme.spacing[6], pixels: '24px' },
    { name: 'spacing[8]', value: ODLTheme.spacing[8], pixels: '32px' },
    { name: 'spacing[10]', value: ODLTheme.spacing[10], pixels: '40px' },
    { name: 'spacing[12]', value: ODLTheme.spacing[12], pixels: '48px' },
    { name: 'spacing[16]', value: ODLTheme.spacing[16], pixels: '64px' },
  ];

  return (
    <div style={{ 
      minHeight: '100vh',
      background: ODLTheme.colors.background,
    }}>
      {/* Hero Header */}
      <div style={{
        background: `linear-gradient(135deg, ${ODLTheme.colors.primary} 0%, ${ODLTheme.colors.primaryDark} 100%)`,
        color: ODLTheme.colors.white,
        padding: `${ODLTheme.spacing[16]} ${ODLTheme.spacing[8]}`,
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Background Pattern */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.1,
          backgroundImage: `radial-gradient(circle at 20% 50%, white 0%, transparent 50%),
                           radial-gradient(circle at 80% 80%, white 0%, transparent 50%),
                           radial-gradient(circle at 40% 20%, white 0%, transparent 50%)`,
        }} />
        
        <div style={{ 
          maxWidth: '1400px', 
          margin: '0 auto',
          position: 'relative',
          zIndex: 1,
        }}>
          <div style={{ marginBottom: ODLTheme.spacing[4] }}>
            <span style={{
              display: 'inline-block',
              padding: `${ODLTheme.spacing[2]} ${ODLTheme.spacing[4]}`,
              background: 'rgba(255, 255, 255, 0.2)',
              borderRadius: ODLTheme.borders.radius.xl,
              fontSize: ODLTheme.typography.fontSize.sm,
              fontWeight: ODLTheme.typography.fontWeight.medium,
              backdropFilter: 'blur(10px)',
            }}>
              ODL Design System
            </span>
          </div>
          
          <h1 style={{ 
            fontSize: '4rem',
            fontWeight: ODLTheme.typography.fontWeight.bold,
            marginBottom: ODLTheme.spacing[6],
            lineHeight: 1.1,
          }}>
            The ODL Style
          </h1>
          
          <p style={{ 
            fontSize: ODLTheme.typography.fontSize.xl,
            opacity: 0.95,
            maxWidth: '800px',
            lineHeight: 1.6,
          }}>
            A cohesive design language that combines clarity, functionality, and elegance. 
            Built with consistency and accessibility at its core.
          </p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div style={{
        background: ODLTheme.colors.white,
        borderBottom: `1px solid ${ODLTheme.colors.border}`,
        position: 'sticky',
        top: 0,
        zIndex: 100,
        boxShadow: ODLTheme.shadows.sm,
      }}>
        <div style={{ 
          maxWidth: '1400px', 
          margin: '0 auto',
          display: 'flex',
          gap: 0,
        }}>
          {[
            { key: 'philosophy', label: 'Philosophy', icon: '💡' },
            { key: 'colors', label: 'Colors', icon: '🎨' },
            { key: 'typography', label: 'Typography', icon: '✏️' },
            { key: 'spacing', label: 'Spacing', icon: '📐' },
            { key: 'components', label: 'Components', icon: '🧩' },
            { key: 'patterns', label: 'Patterns', icon: '🔄' },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveSection(tab.key as any)}
              style={{
                padding: `${ODLTheme.spacing[4]} ${ODLTheme.spacing[6]}`,
                background: activeSection === tab.key ? ODLTheme.colors.primary : 'transparent',
                color: activeSection === tab.key ? ODLTheme.colors.white : ODLTheme.colors.text.primary,
                border: 'none',
                borderBottom: activeSection === tab.key ? `3px solid ${ODLTheme.colors.primaryDark}` : '3px solid transparent',
                cursor: 'pointer',
                fontSize: ODLTheme.typography.fontSize.base,
                fontWeight: ODLTheme.typography.fontWeight.medium,
                transition: `all ${ODLTheme.transitions.base} ease`,
                display: 'flex',
                alignItems: 'center',
                gap: ODLTheme.spacing[2],
              }}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div style={{ 
        maxWidth: '1400px', 
        margin: '0 auto',
        padding: ODLTheme.spacing[8],
      }}>
        {/* Philosophy Section */}
        {activeSection === 'philosophy' && (
          <div>
            <section style={{ marginBottom: ODLTheme.spacing[12] }}>
              <h2 style={{
                fontSize: ODLTheme.typography.fontSize['3xl'],
                fontWeight: ODLTheme.typography.fontWeight.bold,
                marginBottom: ODLTheme.spacing[6],
                color: ODLTheme.colors.text.primary,
              }}>
                Design Philosophy
              </h2>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: ODLTheme.spacing[6],
              }}>
                {[
                  {
                    title: 'Clarity First',
                    icon: '🔍',
                    description: 'Every element serves a purpose. Clean interfaces that prioritize content and functionality over decoration.',
                    color: ODLTheme.colors.primary,
                  },
                  {
                    title: 'Consistent Experience',
                    icon: '🎯',
                    description: 'Unified design language across all components. Users learn once and apply everywhere.',
                    color: ODLTheme.colors.success,
                  },
                  {
                    title: 'Accessible by Default',
                    icon: '👍',
                    description: 'Built with WCAG standards in mind. Keyboard navigation, screen readers, and high contrast support.',
                    color: ODLTheme.colors.info,
                  },
                  {
                    title: 'Performance Focused',
                    icon: '⚡',
                    description: 'Lightweight components with smooth animations. Fast load times and responsive interactions.',
                    color: ODLTheme.colors.warning,
                  },
                  {
                    title: 'Developer Friendly',
                    icon: '👩‍💻',
                    description: 'Self-contained components with clear APIs. Easy to implement and maintain.',
                    color: ODLTheme.colors.primaryDark,
                  },
                  {
                    title: 'Scalable System',
                    icon: '📈',
                    description: 'Grows with your needs. From simple interfaces to complex enterprise applications.',
                    color: ODLTheme.colors.error,
                  },
                ].map((principle, index) => (
                  <div
                    key={index}
                    style={{
                      background: ODLTheme.colors.white,
                      border: `1px solid ${ODLTheme.colors.border}`,
                      borderRadius: ODLTheme.borders.radius.lg,
                      padding: ODLTheme.spacing[6],
                      transition: `all ${ODLTheme.transitions.base} ease`,
                      cursor: 'default',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = ODLTheme.shadows.lg;
                      e.currentTarget.style.transform = 'translateY(-4px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = 'none';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    <div style={{
                      width: '48px',
                      height: '48px',
                      background: `linear-gradient(135deg, ${principle.color}15, ${principle.color}25)`,
                      borderRadius: ODLTheme.borders.radius.md,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '24px',
                      marginBottom: ODLTheme.spacing[4],
                    }}>
                      {principle.icon}
                    </div>
                    <h3 style={{
                      fontSize: ODLTheme.typography.fontSize.lg,
                      fontWeight: ODLTheme.typography.fontWeight.semibold,
                      marginBottom: ODLTheme.spacing[2],
                      color: ODLTheme.colors.text.primary,
                    }}>
                      {principle.title}
                    </h3>
                    <p style={{
                      fontSize: ODLTheme.typography.fontSize.sm,
                      color: ODLTheme.colors.text.secondary,
                      lineHeight: 1.6,
                    }}>
                      {principle.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Key Principles */}
            <section style={{ marginBottom: ODLTheme.spacing[12] }}>
              <h3 style={{
                fontSize: ODLTheme.typography.fontSize['2xl'],
                fontWeight: ODLTheme.typography.fontWeight.semibold,
                marginBottom: ODLTheme.spacing[6],
                color: ODLTheme.colors.text.primary,
              }}>
                Implementation Principles
              </h3>
              
              <div style={{
                background: ODLTheme.colors.white,
                border: `1px solid ${ODLTheme.colors.border}`,
                borderRadius: ODLTheme.borders.radius.lg,
                padding: ODLTheme.spacing[8],
              }}>
                <div style={{ display: 'grid', gap: ODLTheme.spacing[6] }}>
                  {[
                    {
                      title: '🎨 Visual Hierarchy',
                      points: [
                        'Clear distinction between primary, secondary, and tertiary information',
                        'Consistent use of color to convey meaning and state',
                        'Strategic use of whitespace to improve readability',
                      ],
                    },
                    {
                      title: '🔤 Typography System',
                      points: [
                        'Limited font sizes for consistency (xs to 3xl)',
                        'Clear weight hierarchy (normal, medium, semibold, bold)',
                        'Optimal line heights for readability',
                      ],
                    },
                    {
                      title: '🎯 Interactive Elements',
                      points: [
                        'Minimum 44x44px touch targets for mobile',
                        'Clear hover, focus, and active states',
                        'Smooth transitions (0.2s default)',
                      ],
                    },
                    {
                      title: '📱 Responsive Design',
                      points: [
                        'Mobile-first approach',
                        'Flexible grid systems',
                        'Adaptive components that work across all screen sizes',
                      ],
                    },
                  ].map((section, index) => (
                    <div key={index}>
                      <h4 style={{
                        fontSize: ODLTheme.typography.fontSize.lg,
                        fontWeight: ODLTheme.typography.fontWeight.semibold,
                        marginBottom: ODLTheme.spacing[3],
                        color: ODLTheme.colors.text.primary,
                      }}>
                        {section.title}
                      </h4>
                      <ul style={{
                        listStyle: 'none',
                        padding: 0,
                      }}>
                        {section.points.map((point, pIndex) => (
                          <li 
                            key={pIndex}
                            style={{
                              display: 'flex',
                              alignItems: 'flex-start',
                              gap: ODLTheme.spacing[3],
                              marginBottom: ODLTheme.spacing[2],
                              color: ODLTheme.colors.text.secondary,
                              fontSize: ODLTheme.typography.fontSize.base,
                            }}
                          >
                            <span style={{ color: ODLTheme.colors.primary, marginTop: '2px' }}>✓</span>
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        )}

        {/* Colors Section */}
        {activeSection === 'colors' && (
          <div>
            <section style={{ marginBottom: ODLTheme.spacing[12] }}>
              <h2 style={{
                fontSize: ODLTheme.typography.fontSize['3xl'],
                fontWeight: ODLTheme.typography.fontWeight.bold,
                marginBottom: ODLTheme.spacing[6],
                color: ODLTheme.colors.text.primary,
              }}>
                Color System
              </h2>

              <div style={{
                display: 'grid',
                gridTemplateColumns: '200px 1fr',
                gap: ODLTheme.spacing[6],
                marginBottom: ODLTheme.spacing[8],
              }}>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: ODLTheme.spacing[2],
                }}>
                  {Object.keys(colorSections).map((section) => (
                    <button
                      key={section}
                      onClick={() => setSelectedColor(section)}
                      style={{
                        padding: `${ODLTheme.spacing[3]} ${ODLTheme.spacing[4]}`,
                        background: selectedColor === section ? ODLTheme.colors.primaryLight : ODLTheme.colors.white,
                        border: `1px solid ${selectedColor === section ? ODLTheme.colors.primary : ODLTheme.colors.border}`,
                        borderRadius: ODLTheme.borders.radius.md,
                        color: selectedColor === section ? ODLTheme.colors.primary : ODLTheme.colors.text.primary,
                        fontSize: ODLTheme.typography.fontSize.base,
                        fontWeight: selectedColor === section ? ODLTheme.typography.fontWeight.semibold : ODLTheme.typography.fontWeight.normal,
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: `all ${ODLTheme.transitions.fast} ease`,
                        textTransform: 'capitalize',
                      }}
                    >
                      {section} Colors
                    </button>
                  ))}
                </div>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                  gap: ODLTheme.spacing[4],
                }}>
                  {colorSections[selectedColor as keyof typeof colorSections].map((color) => (
                    <div
                      key={color.name}
                      style={{
                        background: ODLTheme.colors.white,
                        border: `1px solid ${ODLTheme.colors.border}`,
                        borderRadius: ODLTheme.borders.radius.md,
                        overflow: 'hidden',
                        transition: `all ${ODLTheme.transitions.base} ease`,
                        cursor: 'pointer',
                      }}
                      onClick={() => handleCopy(color.value, color.name)}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.boxShadow = ODLTheme.shadows.md;
                        e.currentTarget.style.transform = 'translateY(-2px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow = 'none';
                        e.currentTarget.style.transform = 'translateY(0)';
                      }}
                    >
                      <div style={{
                        height: '80px',
                        background: color.value,
                        position: 'relative',
                      }}>
                        {copiedText === color.name && (
                          <div style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            background: 'rgba(0, 0, 0, 0.8)',
                            color: 'white',
                            padding: `${ODLTheme.spacing[2]} ${ODLTheme.spacing[3]}`,
                            borderRadius: ODLTheme.borders.radius.base,
                            fontSize: ODLTheme.typography.fontSize.sm,
                            fontWeight: ODLTheme.typography.fontWeight.medium,
                          }}>
                            Copied!
                          </div>
                        )}
                      </div>
                      <div style={{ padding: ODLTheme.spacing[3] }}>
                        <div style={{
                          fontSize: ODLTheme.typography.fontSize.sm,
                          fontWeight: ODLTheme.typography.fontWeight.semibold,
                          color: ODLTheme.colors.text.primary,
                          marginBottom: ODLTheme.spacing[1],
                        }}>
                          {color.name}
                        </div>
                        <div style={{
                          fontSize: ODLTheme.typography.fontSize.xs,
                          color: ODLTheme.colors.text.secondary,
                          fontFamily: 'monospace',
                        }}>
                          {color.value}
                        </div>
                        <div style={{
                          fontSize: '10px',
                          color: ODLTheme.colors.text.tertiary,
                          marginTop: ODLTheme.spacing[1],
                          fontFamily: 'monospace',
                        }}>
                          {color.var}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Color Usage Guidelines */}
              <div style={{
                background: ODLTheme.colors.primaryLight,
                border: `1px solid ${ODLTheme.colors.primary}`,
                borderRadius: ODLTheme.borders.radius.md,
                padding: ODLTheme.spacing[6],
              }}>
                <h3 style={{
                  fontSize: ODLTheme.typography.fontSize.lg,
                  fontWeight: ODLTheme.typography.fontWeight.semibold,
                  marginBottom: ODLTheme.spacing[3],
                  color: ODLTheme.colors.primary,
                }}>
                  💡 Color Usage Guidelines
                </h3>
                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  display: 'grid',
                  gap: ODLTheme.spacing[2],
                }}>
                  <li style={{ display: 'flex', gap: ODLTheme.spacing[2], alignItems: 'flex-start' }}>
                    <span style={{ color: ODLTheme.colors.primary }}>•</span>
                    <span style={{ fontSize: ODLTheme.typography.fontSize.sm, color: ODLTheme.colors.text.primary }}>
                      Use <strong>Primary Blue (#3560C1)</strong> for main actions, links, and brand elements
                    </span>
                  </li>
                  <li style={{ display: 'flex', gap: ODLTheme.spacing[2], alignItems: 'flex-start' }}>
                    <span style={{ color: ODLTheme.colors.success }}>•</span>
                    <span style={{ fontSize: ODLTheme.typography.fontSize.sm, color: ODLTheme.colors.text.primary }}>
                      Use <strong>Status Colors</strong> consistently: Success (green), Error (red), Warning (yellow), Info (blue)
                    </span>
                  </li>
                  <li style={{ display: 'flex', gap: ODLTheme.spacing[2], alignItems: 'flex-start' }}>
                    <span style={{ color: ODLTheme.colors.text.secondary }}>•</span>
                    <span style={{ fontSize: ODLTheme.typography.fontSize.sm, color: ODLTheme.colors.text.primary }}>
                      Use <strong>Text Colors</strong> to establish hierarchy: Primary for headers, Secondary for body, Tertiary for metadata
                    </span>
                  </li>
                  <li style={{ display: 'flex', gap: ODLTheme.spacing[2], alignItems: 'flex-start' }}>
                    <span style={{ color: ODLTheme.colors.border }}>•</span>
                    <span style={{ fontSize: ODLTheme.typography.fontSize.sm, color: ODLTheme.colors.text.primary }}>
                      Maintain <strong>WCAG AA contrast ratios</strong> for all text and interactive elements
                    </span>
                  </li>
                </ul>
              </div>
            </section>
          </div>
        )}

        {/* Typography Section */}
        {activeSection === 'typography' && (
          <div>
            <section style={{ marginBottom: ODLTheme.spacing[12] }}>
              <h2 style={{
                fontSize: ODLTheme.typography.fontSize['3xl'],
                fontWeight: ODLTheme.typography.fontWeight.bold,
                marginBottom: ODLTheme.spacing[6],
                color: ODLTheme.colors.text.primary,
              }}>
                Typography System
              </h2>

              {/* Font Stack */}
              <div style={{
                background: ODLTheme.colors.white,
                border: `1px solid ${ODLTheme.colors.border}`,
                borderRadius: ODLTheme.borders.radius.lg,
                padding: ODLTheme.spacing[6],
                marginBottom: ODLTheme.spacing[8],
              }}>
                <h3 style={{
                  fontSize: ODLTheme.typography.fontSize.lg,
                  fontWeight: ODLTheme.typography.fontWeight.semibold,
                  marginBottom: ODLTheme.spacing[4],
                  color: ODLTheme.colors.text.primary,
                }}>
                  Font Stack
                </h3>
                <div style={{
                  background: ODLTheme.colors.background,
                  padding: ODLTheme.spacing[4],
                  borderRadius: ODLTheme.borders.radius.base,
                  fontFamily: 'monospace',
                  fontSize: ODLTheme.typography.fontSize.sm,
                  color: ODLTheme.colors.text.secondary,
                  overflowX: 'auto',
                }}>
                  {ODLTheme.typography.fontFamily.sans}
                </div>
              </div>

              {/* Font Sizes */}
              <div style={{
                background: ODLTheme.colors.white,
                border: `1px solid ${ODLTheme.colors.border}`,
                borderRadius: ODLTheme.borders.radius.lg,
                padding: ODLTheme.spacing[6],
                marginBottom: ODLTheme.spacing[8],
              }}>
                <h3 style={{
                  fontSize: ODLTheme.typography.fontSize.lg,
                  fontWeight: ODLTheme.typography.fontWeight.semibold,
                  marginBottom: ODLTheme.spacing[4],
                  color: ODLTheme.colors.text.primary,
                }}>
                  Font Sizes
                </h3>
                <div style={{ display: 'grid', gap: ODLTheme.spacing[4] }}>
                  {Object.entries(ODLTheme.typography.fontSize).map(([key, value]) => (
                    <div 
                      key={key}
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '100px 100px 1fr',
                        alignItems: 'center',
                        gap: ODLTheme.spacing[4],
                        padding: ODLTheme.spacing[3],
                        background: ODLTheme.colors.background,
                        borderRadius: ODLTheme.borders.radius.base,
                      }}
                    >
                      <span style={{
                        fontSize: ODLTheme.typography.fontSize.sm,
                        fontWeight: ODLTheme.typography.fontWeight.medium,
                        color: ODLTheme.colors.text.secondary,
                      }}>
                        {key}
                      </span>
                      <span style={{
                        fontSize: ODLTheme.typography.fontSize.sm,
                        color: ODLTheme.colors.text.tertiary,
                        fontFamily: 'monospace',
                      }}>
                        {value}
                      </span>
                      <span style={{
                        fontSize: value,
                        color: ODLTheme.colors.text.primary,
                      }}>
                        The quick brown fox jumps over the lazy dog
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Font Weights */}
              <div style={{
                background: ODLTheme.colors.white,
                border: `1px solid ${ODLTheme.colors.border}`,
                borderRadius: ODLTheme.borders.radius.lg,
                padding: ODLTheme.spacing[6],
                marginBottom: ODLTheme.spacing[8],
              }}>
                <h3 style={{
                  fontSize: ODLTheme.typography.fontSize.lg,
                  fontWeight: ODLTheme.typography.fontWeight.semibold,
                  marginBottom: ODLTheme.spacing[4],
                  color: ODLTheme.colors.text.primary,
                }}>
                  Font Weights
                </h3>
                <div style={{ display: 'grid', gap: ODLTheme.spacing[4] }}>
                  {Object.entries(ODLTheme.typography.fontWeight).map(([key, value]) => (
                    <div 
                      key={key}
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '100px 100px 1fr',
                        alignItems: 'center',
                        gap: ODLTheme.spacing[4],
                        padding: ODLTheme.spacing[3],
                        background: ODLTheme.colors.background,
                        borderRadius: ODLTheme.borders.radius.base,
                      }}
                    >
                      <span style={{
                        fontSize: ODLTheme.typography.fontSize.sm,
                        fontWeight: ODLTheme.typography.fontWeight.medium,
                        color: ODLTheme.colors.text.secondary,
                      }}>
                        {key}
                      </span>
                      <span style={{
                        fontSize: ODLTheme.typography.fontSize.sm,
                        color: ODLTheme.colors.text.tertiary,
                        fontFamily: 'monospace',
                      }}>
                        {value}
                      </span>
                      <span style={{
                        fontSize: ODLTheme.typography.fontSize.lg,
                        fontWeight: value as any,
                        color: ODLTheme.colors.text.primary,
                      }}>
                        The quick brown fox jumps over the lazy dog
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Line Heights */}
              <div style={{
                background: ODLTheme.colors.white,
                border: `1px solid ${ODLTheme.colors.border}`,
                borderRadius: ODLTheme.borders.radius.lg,
                padding: ODLTheme.spacing[6],
              }}>
                <h3 style={{
                  fontSize: ODLTheme.typography.fontSize.lg,
                  fontWeight: ODLTheme.typography.fontWeight.semibold,
                  marginBottom: ODLTheme.spacing[4],
                  color: ODLTheme.colors.text.primary,
                }}>
                  Line Heights
                </h3>
                <div style={{ display: 'grid', gap: ODLTheme.spacing[4] }}>
                  {Object.entries(ODLTheme.typography.lineHeight).map(([key, value]) => (
                    <div 
                      key={key}
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '100px 100px 1fr',
                        alignItems: 'flex-start',
                        gap: ODLTheme.spacing[4],
                        padding: ODLTheme.spacing[3],
                        background: ODLTheme.colors.background,
                        borderRadius: ODLTheme.borders.radius.base,
                      }}
                    >
                      <span style={{
                        fontSize: ODLTheme.typography.fontSize.sm,
                        fontWeight: ODLTheme.typography.fontWeight.medium,
                        color: ODLTheme.colors.text.secondary,
                      }}>
                        {key}
                      </span>
                      <span style={{
                        fontSize: ODLTheme.typography.fontSize.sm,
                        color: ODLTheme.colors.text.tertiary,
                        fontFamily: 'monospace',
                      }}>
                        {value}
                      </span>
                      <p style={{
                        fontSize: ODLTheme.typography.fontSize.base,
                        lineHeight: value,
                        color: ODLTheme.colors.text.primary,
                        margin: 0,
                      }}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        )}

        {/* Spacing Section */}
        {activeSection === 'spacing' && (
          <div>
            <section style={{ marginBottom: ODLTheme.spacing[12] }}>
              <h2 style={{
                fontSize: ODLTheme.typography.fontSize['3xl'],
                fontWeight: ODLTheme.typography.fontWeight.bold,
                marginBottom: ODLTheme.spacing[6],
                color: ODLTheme.colors.text.primary,
              }}>
                Spacing System
              </h2>

              <div style={{
                background: ODLTheme.colors.white,
                border: `1px solid ${ODLTheme.colors.border}`,
                borderRadius: ODLTheme.borders.radius.lg,
                padding: ODLTheme.spacing[6],
                marginBottom: ODLTheme.spacing[8],
              }}>
                <h3 style={{
                  fontSize: ODLTheme.typography.fontSize.lg,
                  fontWeight: ODLTheme.typography.fontWeight.semibold,
                  marginBottom: ODLTheme.spacing[4],
                  color: ODLTheme.colors.text.primary,
                }}>
                  Spacing Scale
                </h3>
                <p style={{
                  fontSize: ODLTheme.typography.fontSize.base,
                  color: ODLTheme.colors.text.secondary,
                  marginBottom: ODLTheme.spacing[6],
                }}>
                  Consistent spacing creates visual rhythm and hierarchy. Our spacing scale is based on a 4px grid system.
                </p>
                
                <div style={{ display: 'grid', gap: ODLTheme.spacing[3] }}>
                  {spacingExamples.map((spacing) => (
                    <div 
                      key={spacing.name}
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '150px 80px 1fr',
                        alignItems: 'center',
                        gap: ODLTheme.spacing[4],
                      }}
                    >
                      <div style={{
                        fontSize: ODLTheme.typography.fontSize.sm,
                        fontFamily: 'monospace',
                        color: ODLTheme.colors.text.secondary,
                      }}>
                        ODLTheme.{spacing.name}
                      </div>
                      <div style={{
                        fontSize: ODLTheme.typography.fontSize.sm,
                        color: ODLTheme.colors.text.tertiary,
                      }}>
                        {spacing.pixels}
                      </div>
                      <div style={{
                        height: '32px',
                        background: `linear-gradient(90deg, ${ODLTheme.colors.primary} 0%, ${ODLTheme.colors.primaryLight} 100%)`,
                        width: spacing.value,
                        borderRadius: ODLTheme.borders.radius.base,
                      }} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Spacing Examples */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: ODLTheme.spacing[6],
              }}>
                <div style={{
                  background: ODLTheme.colors.white,
                  border: `1px solid ${ODLTheme.colors.border}`,
                  borderRadius: ODLTheme.borders.radius.lg,
                  padding: ODLTheme.spacing[6],
                }}>
                  <h4 style={{
                    fontSize: ODLTheme.typography.fontSize.lg,
                    fontWeight: ODLTheme.typography.fontWeight.semibold,
                    marginBottom: ODLTheme.spacing[4],
                    color: ODLTheme.colors.text.primary,
                  }}>
                    Component Padding
                  </h4>
                  <div style={{
                    background: ODLTheme.colors.primaryLight,
                    padding: ODLTheme.spacing[4],
                    borderRadius: ODLTheme.borders.radius.base,
                    marginBottom: ODLTheme.spacing[3],
                  }}>
                    <div style={{
                      background: ODLTheme.colors.white,
                      padding: ODLTheme.spacing[3],
                      borderRadius: ODLTheme.borders.radius.base,
                      textAlign: 'center',
                      fontSize: ODLTheme.typography.fontSize.sm,
                      color: ODLTheme.colors.text.secondary,
                    }}>
                      spacing[4] padding
                    </div>
                  </div>
                  <p style={{
                    fontSize: ODLTheme.typography.fontSize.sm,
                    color: ODLTheme.colors.text.secondary,
                  }}>
                    Standard padding for cards and containers
                  </p>
                </div>

                <div style={{
                  background: ODLTheme.colors.white,
                  border: `1px solid ${ODLTheme.colors.border}`,
                  borderRadius: ODLTheme.borders.radius.lg,
                  padding: ODLTheme.spacing[6],
                }}>
                  <h4 style={{
                    fontSize: ODLTheme.typography.fontSize.lg,
                    fontWeight: ODLTheme.typography.fontWeight.semibold,
                    marginBottom: ODLTheme.spacing[4],
                    color: ODLTheme.colors.text.primary,
                  }}>
                    Element Gaps
                  </h4>
                  <div style={{
                    display: 'flex',
                    gap: ODLTheme.spacing[3],
                    marginBottom: ODLTheme.spacing[3],
                  }}>
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        style={{
                          flex: 1,
                          height: '60px',
                          background: ODLTheme.colors.primaryLight,
                          borderRadius: ODLTheme.borders.radius.base,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: ODLTheme.typography.fontSize.sm,
                          color: ODLTheme.colors.primary,
                        }}
                      >
                        {i}
                      </div>
                    ))}
                  </div>
                  <p style={{
                    fontSize: ODLTheme.typography.fontSize.sm,
                    color: ODLTheme.colors.text.secondary,
                  }}>
                    spacing[3] gap between elements
                  </p>
                </div>

                <div style={{
                  background: ODLTheme.colors.white,
                  border: `1px solid ${ODLTheme.colors.border}`,
                  borderRadius: ODLTheme.borders.radius.lg,
                  padding: ODLTheme.spacing[6],
                }}>
                  <h4 style={{
                    fontSize: ODLTheme.typography.fontSize.lg,
                    fontWeight: ODLTheme.typography.fontWeight.semibold,
                    marginBottom: ODLTheme.spacing[4],
                    color: ODLTheme.colors.text.primary,
                  }}>
                    Section Margins
                  </h4>
                  <div style={{ marginBottom: ODLTheme.spacing[3] }}>
                    <div style={{
                      height: '40px',
                      background: ODLTheme.colors.primaryLight,
                      borderRadius: ODLTheme.borders.radius.base,
                      marginBottom: ODLTheme.spacing[8],
                    }} />
                    <div style={{
                      height: '40px',
                      background: ODLTheme.colors.primaryLight,
                      borderRadius: ODLTheme.borders.radius.base,
                    }} />
                  </div>
                  <p style={{
                    fontSize: ODLTheme.typography.fontSize.sm,
                    color: ODLTheme.colors.text.secondary,
                  }}>
                    spacing[8] between sections
                  </p>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* Components Section */}
        {activeSection === 'components' && (
          <div>
            <section style={{ marginBottom: ODLTheme.spacing[12] }}>
              <h2 style={{
                fontSize: ODLTheme.typography.fontSize['3xl'],
                fontWeight: ODLTheme.typography.fontWeight.bold,
                marginBottom: ODLTheme.spacing[6],
                color: ODLTheme.colors.text.primary,
              }}>
                Component Showcase
              </h2>

              {/* Buttons */}
              <div style={{
                background: ODLTheme.colors.white,
                border: `1px solid ${ODLTheme.colors.border}`,
                borderRadius: ODLTheme.borders.radius.lg,
                padding: ODLTheme.spacing[6],
                marginBottom: ODLTheme.spacing[6],
              }}>
                <h3 style={{
                  fontSize: ODLTheme.typography.fontSize.lg,
                  fontWeight: ODLTheme.typography.fontWeight.semibold,
                  marginBottom: ODLTheme.spacing[4],
                  color: ODLTheme.colors.text.primary,
                }}>
                  Buttons
                </h3>
                <div style={{ display: 'flex', gap: ODLTheme.spacing[3], flexWrap: 'wrap' }}>
                  <Button variant="primary">Primary Button</Button>
                  <Button variant="secondary">Secondary Button</Button>
                  <Button variant="tertiary">Tertiary Button</Button>
                  <Button variant="ghost">Ghost Button</Button>
                  <Button variant="danger">Danger Button</Button>
                </div>
              </div>

              {/* Inputs */}
              <div style={{
                background: ODLTheme.colors.white,
                border: `1px solid ${ODLTheme.colors.border}`,
                borderRadius: ODLTheme.borders.radius.lg,
                padding: ODLTheme.spacing[6],
                marginBottom: ODLTheme.spacing[6],
              }}>
                <h3 style={{
                  fontSize: ODLTheme.typography.fontSize.lg,
                  fontWeight: ODLTheme.typography.fontWeight.semibold,
                  marginBottom: ODLTheme.spacing[4],
                  color: ODLTheme.colors.text.primary,
                }}>
                  Form Elements
                </h3>
                <div style={{ display: 'grid', gap: ODLTheme.spacing[4], maxWidth: '400px' }}>
                  <Input label="Text Input" placeholder="Enter text..." />
                  <Input label="Email Input" type="email" placeholder="email@example.com" />
                  <Dropdown
                    label="Select Option"
                    options={[
                      { value: 'option1', label: 'Option 1' },
                      { value: 'option2', label: 'Option 2' },
                      { value: 'option3', label: 'Option 3' },
                    ]}
                    placeholder="Choose an option"
                  />
                </div>
              </div>

              {/* Cards */}
              <div style={{
                background: ODLTheme.colors.white,
                border: `1px solid ${ODLTheme.colors.border}`,
                borderRadius: ODLTheme.borders.radius.lg,
                padding: ODLTheme.spacing[6],
                marginBottom: ODLTheme.spacing[6],
              }}>
                <h3 style={{
                  fontSize: ODLTheme.typography.fontSize.lg,
                  fontWeight: ODLTheme.typography.fontWeight.semibold,
                  marginBottom: ODLTheme.spacing[4],
                  color: ODLTheme.colors.text.primary,
                }}>
                  Cards
                </h3>
                <div style={{ display: 'grid', gap: ODLTheme.spacing[3] }}>
                  <Cards 
                    title="Document.pdf" 
                    subtitle="Last modified 2 hours ago"
                    tag="PDF"
                  />
                  <Cards 
                    title="Spreadsheet.xlsx" 
                    subtitle="Last modified yesterday"
                    tag="Excel"
                    selected={true}
                  />
                </div>
              </div>

              {/* Icons */}
              <div style={{
                background: ODLTheme.colors.white,
                border: `1px solid ${ODLTheme.colors.border}`,
                borderRadius: ODLTheme.borders.radius.lg,
                padding: ODLTheme.spacing[6],
              }}>
                <h3 style={{
                  fontSize: ODLTheme.typography.fontSize.lg,
                  fontWeight: ODLTheme.typography.fontWeight.semibold,
                  marginBottom: ODLTheme.spacing[4],
                  color: ODLTheme.colors.text.primary,
                }}>
                  Icons (Carbon Design System)
                </h3>
                <div style={{ 
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
                  gap: ODLTheme.spacing[3],
                }}>
                  {['add', 'edit', 'delete', 'save', 'search', 'settings', 'user', 'document', 'folder', 'download', 'upload', 'calendar'].map((iconName) => (
                    <div
                      key={iconName}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: ODLTheme.spacing[2],
                        padding: ODLTheme.spacing[3],
                        background: ODLTheme.colors.background,
                        borderRadius: ODLTheme.borders.radius.base,
                      }}
                    >
                      <Icon name={iconName as any} size={24} />
                      <span style={{
                        fontSize: ODLTheme.typography.fontSize.xs,
                        color: ODLTheme.colors.text.secondary,
                      }}>
                        {iconName}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        )}

        {/* Patterns Section */}
        {activeSection === 'patterns' && (
          <div>
            <section style={{ marginBottom: ODLTheme.spacing[12] }}>
              <h2 style={{
                fontSize: ODLTheme.typography.fontSize['3xl'],
                fontWeight: ODLTheme.typography.fontWeight.bold,
                marginBottom: ODLTheme.spacing[6],
                color: ODLTheme.colors.text.primary,
              }}>
                Design Patterns
              </h2>

              {/* Layout Patterns */}
              <div style={{
                background: ODLTheme.colors.white,
                border: `1px solid ${ODLTheme.colors.border}`,
                borderRadius: ODLTheme.borders.radius.lg,
                padding: ODLTheme.spacing[6],
                marginBottom: ODLTheme.spacing[6],
              }}>
                <h3 style={{
                  fontSize: ODLTheme.typography.fontSize.lg,
                  fontWeight: ODLTheme.typography.fontWeight.semibold,
                  marginBottom: ODLTheme.spacing[4],
                  color: ODLTheme.colors.text.primary,
                }}>
                  Layout Patterns
                </h3>
                
                <div style={{ display: 'grid', gap: ODLTheme.spacing[6] }}>
                  {/* Card Grid */}
                  <div>
                    <h4 style={{
                      fontSize: ODLTheme.typography.fontSize.base,
                      fontWeight: ODLTheme.typography.fontWeight.medium,
                      marginBottom: ODLTheme.spacing[3],
                      color: ODLTheme.colors.text.secondary,
                    }}>
                      Card Grid Layout
                    </h4>
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                      gap: ODLTheme.spacing[4],
                    }}>
                      {[1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          style={{
                            background: ODLTheme.colors.background,
                            border: `1px solid ${ODLTheme.colors.border}`,
                            borderRadius: ODLTheme.borders.radius.md,
                            padding: ODLTheme.spacing[4],
                            height: '120px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: ODLTheme.colors.text.tertiary,
                          }}
                        >
                          Card {i}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Two Column Layout */}
                  <div>
                    <h4 style={{
                      fontSize: ODLTheme.typography.fontSize.base,
                      fontWeight: ODLTheme.typography.fontWeight.medium,
                      marginBottom: ODLTheme.spacing[3],
                      color: ODLTheme.colors.text.secondary,
                    }}>
                      Two Column Layout (70/30)
                    </h4>
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: '70% 30%',
                      gap: ODLTheme.spacing[4],
                    }}>
                      <div style={{
                        background: ODLTheme.colors.background,
                        border: `1px solid ${ODLTheme.colors.border}`,
                        borderRadius: ODLTheme.borders.radius.md,
                        padding: ODLTheme.spacing[4],
                        height: '150px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: ODLTheme.colors.text.tertiary,
                      }}>
                        Main Content
                      </div>
                      <div style={{
                        background: ODLTheme.colors.background,
                        border: `1px solid ${ODLTheme.colors.border}`,
                        borderRadius: ODLTheme.borders.radius.md,
                        padding: ODLTheme.spacing[4],
                        height: '150px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: ODLTheme.colors.text.tertiary,
                      }}>
                        Sidebar
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Interaction Patterns */}
              <div style={{
                background: ODLTheme.colors.white,
                border: `1px solid ${ODLTheme.colors.border}`,
                borderRadius: ODLTheme.borders.radius.lg,
                padding: ODLTheme.spacing[6],
                marginBottom: ODLTheme.spacing[6],
              }}>
                <h3 style={{
                  fontSize: ODLTheme.typography.fontSize.lg,
                  fontWeight: ODLTheme.typography.fontWeight.semibold,
                  marginBottom: ODLTheme.spacing[4],
                  color: ODLTheme.colors.text.primary,
                }}>
                  Interaction Patterns
                </h3>
                
                <div style={{ display: 'grid', gap: ODLTheme.spacing[6] }}>
                  <div>
                    <h4 style={{
                      fontSize: ODLTheme.typography.fontSize.base,
                      fontWeight: ODLTheme.typography.fontWeight.medium,
                      marginBottom: ODLTheme.spacing[3],
                      color: ODLTheme.colors.text.secondary,
                    }}>
                      Hover States
                    </h4>
                    <p style={{
                      fontSize: ODLTheme.typography.fontSize.sm,
                      color: ODLTheme.colors.text.tertiary,
                      marginBottom: ODLTheme.spacing[3],
                    }}>
                      Consistent hover feedback with smooth transitions
                    </p>
                    <div style={{ display: 'flex', gap: ODLTheme.spacing[3] }}>
                      <div
                        style={{
                          padding: `${ODLTheme.spacing[3]} ${ODLTheme.spacing[4]}`,
                          background: ODLTheme.colors.primary,
                          color: ODLTheme.colors.white,
                          borderRadius: ODLTheme.borders.radius.base,
                          cursor: 'pointer',
                          transition: `all ${ODLTheme.transitions.base} ease`,
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = ODLTheme.colors.primaryHover;
                          e.currentTarget.style.transform = 'translateY(-2px)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = ODLTheme.colors.primary;
                          e.currentTarget.style.transform = 'translateY(0)';
                        }}
                      >
                        Hover Me
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 style={{
                      fontSize: ODLTheme.typography.fontSize.base,
                      fontWeight: ODLTheme.typography.fontWeight.medium,
                      marginBottom: ODLTheme.spacing[3],
                      color: ODLTheme.colors.text.secondary,
                    }}>
                      Focus States
                    </h4>
                    <p style={{
                      fontSize: ODLTheme.typography.fontSize.sm,
                      color: ODLTheme.colors.text.tertiary,
                      marginBottom: ODLTheme.spacing[3],
                    }}>
                      Clear focus indicators for keyboard navigation
                    </p>
                    <button
                      style={{
                        padding: `${ODLTheme.spacing[3]} ${ODLTheme.spacing[4]}`,
                        background: ODLTheme.colors.white,
                        color: ODLTheme.colors.primary,
                        border: `1px solid ${ODLTheme.colors.primary}`,
                        borderRadius: ODLTheme.borders.radius.base,
                        cursor: 'pointer',
                        transition: `all ${ODLTheme.transitions.base} ease`,
                        outline: 'none',
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.boxShadow = `0 0 0 2px ${ODLTheme.colors.primaryLight}`;
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      Tab to Focus
                    </button>
                  </div>
                </div>
              </div>

              {/* Loading States */}
              <div style={{
                background: ODLTheme.colors.white,
                border: `1px solid ${ODLTheme.colors.border}`,
                borderRadius: ODLTheme.borders.radius.lg,
                padding: ODLTheme.spacing[6],
              }}>
                <h3 style={{
                  fontSize: ODLTheme.typography.fontSize.lg,
                  fontWeight: ODLTheme.typography.fontWeight.semibold,
                  marginBottom: ODLTheme.spacing[4],
                  color: ODLTheme.colors.text.primary,
                }}>
                  Loading & Empty States
                </h3>
                
                <div style={{ display: 'grid', gap: ODLTheme.spacing[6] }}>
                  <div>
                    <h4 style={{
                      fontSize: ODLTheme.typography.fontSize.base,
                      fontWeight: ODLTheme.typography.fontWeight.medium,
                      marginBottom: ODLTheme.spacing[3],
                      color: ODLTheme.colors.text.secondary,
                    }}>
                      Skeleton Loading
                    </h4>
                    <div style={{
                      background: ODLTheme.colors.background,
                      borderRadius: ODLTheme.borders.radius.md,
                      padding: ODLTheme.spacing[4],
                    }}>
                      <div style={{
                        height: '20px',
                        background: `linear-gradient(90deg, ${ODLTheme.colors.border} 25%, ${ODLTheme.colors.surface} 50%, ${ODLTheme.colors.border} 75%)`,
                        borderRadius: ODLTheme.borders.radius.base,
                        marginBottom: ODLTheme.spacing[2],
                        animation: 'shimmer 2s infinite',
                      }} />
                      <div style={{
                        height: '20px',
                        width: '70%',
                        background: `linear-gradient(90deg, ${ODLTheme.colors.border} 25%, ${ODLTheme.colors.surface} 50%, ${ODLTheme.colors.border} 75%)`,
                        borderRadius: ODLTheme.borders.radius.base,
                        animation: 'shimmer 2s infinite',
                      }} />
                    </div>
                  </div>

                  <div>
                    <h4 style={{
                      fontSize: ODLTheme.typography.fontSize.base,
                      fontWeight: ODLTheme.typography.fontWeight.medium,
                      marginBottom: ODLTheme.spacing[3],
                      color: ODLTheme.colors.text.secondary,
                    }}>
                      Empty State
                    </h4>
                    <div style={{
                      background: ODLTheme.colors.background,
                      borderRadius: ODLTheme.borders.radius.md,
                      padding: ODLTheme.spacing[8],
                      textAlign: 'center',
                    }}>
                      <div style={{
                        fontSize: '48px',
                        marginBottom: ODLTheme.spacing[3],
                      }}>
                        📁
                      </div>
                      <p style={{
                        fontSize: ODLTheme.typography.fontSize.base,
                        color: ODLTheme.colors.text.secondary,
                        marginBottom: ODLTheme.spacing[3],
                      }}>
                        No documents found
                      </p>
                      <Button variant="primary" size="small">
                        Add Document
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={{
        background: ODLTheme.colors.text.primary,
        color: ODLTheme.colors.white,
        padding: `${ODLTheme.spacing[8]} ${ODLTheme.spacing[8]}`,
        marginTop: ODLTheme.spacing[16],
      }}>
        <div style={{ 
          maxWidth: '1400px', 
          margin: '0 auto',
          textAlign: 'center',
        }}>
          <h3 style={{
            fontSize: ODLTheme.typography.fontSize.xl,
            fontWeight: ODLTheme.typography.fontWeight.semibold,
            marginBottom: ODLTheme.spacing[3],
          }}>
            ODL Design System
          </h3>
          <p style={{
            fontSize: ODLTheme.typography.fontSize.sm,
            opacity: 0.8,
          }}>
            A comprehensive design language for modern applications
          </p>
          <div style={{
            marginTop: ODLTheme.spacing[6],
            paddingTop: ODLTheme.spacing[6],
            borderTop: `1px solid rgba(255, 255, 255, 0.2)`,
            fontSize: ODLTheme.typography.fontSize.xs,
            opacity: 0.6,
          }}>
            Built with React, TypeScript, and Carbon Design System
          </div>
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
      `}</style>
    </div>
  );
};

export default ODLStyleShowcase;