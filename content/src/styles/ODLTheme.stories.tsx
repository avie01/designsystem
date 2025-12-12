import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import ODLTheme from './ODLTheme';

const meta: Meta = {
  title: 'Design System/ODL Theme',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'The ODL Design System theme constants that ensure consistency across all components.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Color Palette
export const ColorPalette: Story = {
  render: () => (
    <div>
      <h2 style={{ marginBottom: ODLTheme.spacing[6] }}>ODL Color Palette</h2>
      
      {/* Primary Colors */}
      <div style={{ marginBottom: ODLTheme.spacing[8] }}>
        <h3 style={{ marginBottom: ODLTheme.spacing[4] }}>Primary Colors</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: ODLTheme.spacing[4] }}>
          {Object.entries({
            'Primary': ODLTheme.colors.primary,
            'Primary Hover': ODLTheme.colors.primaryHover,
            'Primary Light': ODLTheme.colors.primaryLight,
            'Primary Dark': ODLTheme.colors.primaryDark,
          }).map(([name, color]) => (
            <div key={name}>
              <div 
                style={{ 
                  backgroundColor: color,
                  height: '80px',
                  borderRadius: ODLTheme.borders.radius.md,
                  marginBottom: ODLTheme.spacing[2]
                }}
              />
              <div style={{ fontSize: ODLTheme.typography.fontSize.sm }}>
                <strong>{name}</strong><br />
                {color}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Secondary Color */}
      <div style={{ marginBottom: ODLTheme.spacing[8] }}>
        <h3 style={{ marginBottom: ODLTheme.spacing[4] }}>Secondary Color</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: ODLTheme.spacing[4] }}>
          <div>
            <div
              style={{
                backgroundColor: ODLTheme.colors.secondary,
                height: '80px',
                borderRadius: ODLTheme.borders.radius.md,
                marginBottom: ODLTheme.spacing[2]
              }}
            />
            <div style={{ fontSize: ODLTheme.typography.fontSize.sm }}>
              <strong>Secondary</strong><br />
              {ODLTheme.colors.secondary}
            </div>
          </div>
        </div>
      </div>

      {/* Neutral Colors */}
      <div style={{ marginBottom: ODLTheme.spacing[8] }}>
        <h3 style={{ marginBottom: ODLTheme.spacing[4] }}>Neutral Colors</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: ODLTheme.spacing[4] }}>
          {Object.entries({
            'White': ODLTheme.colors.white,
            'Background': ODLTheme.colors.background,
            'Wave': ODLTheme.colors.wave,
            'Surface': ODLTheme.colors.surface,
            'Surface Hover': ODLTheme.colors.surfaceHover,
            'Border': ODLTheme.colors.border,
          }).map(([name, color]) => (
            <div key={name}>
              <div
                style={{
                  backgroundColor: color,
                  height: '60px',
                  borderRadius: ODLTheme.borders.radius.md,
                  marginBottom: ODLTheme.spacing[2],
                  border: `1px solid ${ODLTheme.colors.border}`
                }}
              />
              <div style={{ fontSize: ODLTheme.typography.fontSize.sm }}>
                <strong>{name}</strong><br />
                {color}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Grey Scale */}
      <div style={{ marginBottom: ODLTheme.spacing[8] }}>
        <h3 style={{ marginBottom: ODLTheme.spacing[4] }}>Grey Scale</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: ODLTheme.spacing[3] }}>
          {Object.entries({
            'Grey 50': ODLTheme.colors.grey50,
            'Grey 100': ODLTheme.colors.grey100,
            'Grey 200': ODLTheme.colors.grey200,
            'Grey 300': ODLTheme.colors.grey300,
            'Grey 400': ODLTheme.colors.grey400,
            'Grey 500': ODLTheme.colors.grey500,
            'Grey 600': ODLTheme.colors.grey600,
          }).map(([name, color]) => (
            <div key={name}>
              <div
                style={{
                  backgroundColor: color,
                  height: '50px',
                  borderRadius: ODLTheme.borders.radius.base,
                  marginBottom: ODLTheme.spacing[1],
                  border: `1px solid ${ODLTheme.colors.border}`
                }}
              />
              <div style={{ fontSize: ODLTheme.typography.fontSize.xs }}>
                <strong>{name}</strong><br />
                {color}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Text Colors */}
      <div style={{ marginBottom: ODLTheme.spacing[8] }}>
        <h3 style={{ marginBottom: ODLTheme.spacing[4] }}>Text Colors</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: ODLTheme.spacing[4] }}>
          {Object.entries({
            'Text Primary': ODLTheme.colors.text.primary,
            'Text Secondary': ODLTheme.colors.text.secondary,
            'Text Tertiary': ODLTheme.colors.text.tertiary,
            'Text Disabled': ODLTheme.colors.text.disabled,
            'Text Light (shorthand)': ODLTheme.colors.textLight,
          }).map(([name, color]) => (
            <div key={name}>
              <div
                style={{
                  backgroundColor: color,
                  height: '50px',
                  borderRadius: ODLTheme.borders.radius.md,
                  marginBottom: ODLTheme.spacing[2]
                }}
              />
              <div style={{ fontSize: ODLTheme.typography.fontSize.sm }}>
                <strong>{name}</strong><br />
                {color}
              </div>
            </div>
          ))}
          <div>
            <div
              style={{
                backgroundColor: ODLTheme.colors.primary,
                height: '50px',
                borderRadius: ODLTheme.borders.radius.md,
                marginBottom: ODLTheme.spacing[2],
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: ODLTheme.colors.text.inverse
              }}
            >
              Inverse Text
            </div>
            <div style={{ fontSize: ODLTheme.typography.fontSize.sm }}>
              <strong>Text Inverse</strong><br />
              {ODLTheme.colors.text.inverse}
            </div>
          </div>
        </div>
      </div>

      {/* Status Colors */}
      <div style={{ marginBottom: ODLTheme.spacing[8] }}>
        <h3 style={{ marginBottom: ODLTheme.spacing[4] }}>Status Colors</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: ODLTheme.spacing[4] }}>
          {Object.entries({
            'Success': ODLTheme.colors.success,
            'Success Light': ODLTheme.colors.successLight,
            'Error': ODLTheme.colors.error,
            'Error Light': ODLTheme.colors.errorLight,
            'Warning': ODLTheme.colors.warning,
            'Warning Background': ODLTheme.colors.warningBackground,
            'Warning Light': ODLTheme.colors.warningLight,
            'Info': ODLTheme.colors.info,
            'Info Light': ODLTheme.colors.infoLight,
          }).map(([name, color]) => (
            <div key={name}>
              <div 
                style={{ 
                  backgroundColor: color,
                  height: '60px',
                  borderRadius: ODLTheme.borders.radius.md,
                  marginBottom: ODLTheme.spacing[2]
                }}
              />
              <div style={{ fontSize: ODLTheme.typography.fontSize.sm }}>
                <strong>{name}</strong><br />
                {color}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chart Colors */}
      <div style={{ marginBottom: ODLTheme.spacing[8] }}>
        <h3 style={{ marginBottom: ODLTheme.spacing[4] }}>Chart Colors</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: ODLTheme.spacing[3] }}>
          {Object.entries(ODLTheme.colors.charts).map(([name, color]) => (
            <div key={name}>
              <div 
                style={{ 
                  backgroundColor: color,
                  height: '50px',
                  borderRadius: ODLTheme.borders.radius.base,
                  marginBottom: ODLTheme.spacing[1]
                }}
              />
              <div style={{ fontSize: ODLTheme.typography.fontSize.xs }}>
                <strong>{name}</strong><br />
                {color}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
};

// Typography
export const Typography: Story = {
  render: () => (
    <div>
      <h2 style={{ marginBottom: ODLTheme.spacing[6] }}>ODL Typography</h2>
      
      <div style={{ marginBottom: ODLTheme.spacing[8] }}>
        <h3 style={{ marginBottom: ODLTheme.spacing[4] }}>Font Sizes</h3>
        {Object.entries(ODLTheme.typography.fontSize).map(([name, size]) => (
          <div key={name} style={{ marginBottom: ODLTheme.spacing[3] }}>
            <span style={{ 
              fontSize: size,
              lineHeight: ODLTheme.typography.lineHeight.normal
            }}>
              {name}: The quick brown fox jumps over the lazy dog ({size})
            </span>
          </div>
        ))}
      </div>

      <div style={{ marginBottom: ODLTheme.spacing[8] }}>
        <h3 style={{ marginBottom: ODLTheme.spacing[4] }}>Font Weights</h3>
        {Object.entries(ODLTheme.typography.fontWeight).map(([name, weight]) => (
          <div key={name} style={{ marginBottom: ODLTheme.spacing[2] }}>
            <span style={{ 
              fontSize: ODLTheme.typography.fontSize.md,
              fontWeight: weight
            }}>
              {name} ({weight}): The quick brown fox jumps over the lazy dog
            </span>
          </div>
        ))}
      </div>
    </div>
  ),
};

// Spacing
export const Spacing: Story = {
  render: () => (
    <div>
      <h2 style={{ marginBottom: ODLTheme.spacing[6] }}>ODL Spacing Scale</h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: ODLTheme.spacing[2] }}>
        {Object.entries(ODLTheme.spacing).map(([name, value]) => (
          <div key={name} style={{ display: 'flex', alignItems: 'center', gap: ODLTheme.spacing[4] }}>
            <span style={{ 
              minWidth: '60px',
              fontSize: ODLTheme.typography.fontSize.sm,
              color: ODLTheme.colors.text.secondary
            }}>
              spacing[{name}]
            </span>
            <div style={{ 
              width: value,
              height: '24px',
              backgroundColor: ODLTheme.colors.primary,
              borderRadius: ODLTheme.borders.radius.base
            }} />
            <span style={{ 
              fontSize: ODLTheme.typography.fontSize.sm,
              color: ODLTheme.colors.text.tertiary
            }}>
              {value}
            </span>
          </div>
        ))}
      </div>
    </div>
  ),
};

// Border Radius
export const BorderRadius: Story = {
  render: () => (
    <div>
      <h2 style={{ marginBottom: ODLTheme.spacing[6] }}>ODL Border Radius</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: ODLTheme.spacing[4] }}>
        {Object.entries(ODLTheme.borders.radius).map(([name, radius]) => (
          <div key={name} style={{ textAlign: 'center' }}>
            <div style={{ 
              width: '100px',
              height: '100px',
              backgroundColor: ODLTheme.colors.primary,
              borderRadius: radius,
              margin: '0 auto',
              marginBottom: ODLTheme.spacing[2]
            }} />
            <div style={{ fontSize: ODLTheme.typography.fontSize.sm }}>
              <strong>{name}</strong><br />
              {radius}
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
};

// Shadows
export const Shadows: Story = {
  render: () => (
    <div>
      <h2 style={{ marginBottom: ODLTheme.spacing[6] }}>ODL Shadows</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: ODLTheme.spacing[6] }}>
        {Object.entries(ODLTheme.shadows).map(([name, shadow]) => (
          <div key={name}>
            <div style={{ 
              width: '100%',
              height: '100px',
              backgroundColor: ODLTheme.colors.white,
              borderRadius: ODLTheme.borders.radius.md,
              boxShadow: shadow,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <span style={{ fontSize: ODLTheme.typography.fontSize.sm }}>
                {name}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
};

// Transitions
export const Transitions: Story = {
  render: () => (
    <div>
      <h2 style={{ marginBottom: ODLTheme.spacing[6] }}>ODL Transitions</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: ODLTheme.spacing[4] }}>
        {Object.entries(ODLTheme.transitions).map(([name, value]) => (
          <div key={name} style={{
            padding: ODLTheme.spacing[4],
            backgroundColor: ODLTheme.colors.white,
            border: `1px solid ${ODLTheme.colors.border}`,
            borderRadius: ODLTheme.borders.radius.md
          }}>
            <div style={{
              fontSize: ODLTheme.typography.fontSize.base,
              fontWeight: ODLTheme.typography.fontWeight.semibold,
              marginBottom: ODLTheme.spacing[2]
            }}>
              {name}
            </div>
            <code style={{
              fontSize: ODLTheme.typography.fontSize.xs,
              color: ODLTheme.colors.text.secondary,
              fontFamily: ODLTheme.typography.fontFamily.mono
            }}>
              {value}
            </code>
          </div>
        ))}
      </div>
    </div>
  ),
};

// Z-Index
export const ZIndex: Story = {
  render: () => (
    <div>
      <h2 style={{ marginBottom: ODLTheme.spacing[6] }}>ODL Z-Index Scale</h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: ODLTheme.spacing[2] }}>
        {Object.entries(ODLTheme.zIndex).map(([name, value]) => (
          <div key={name} style={{ display: 'flex', alignItems: 'center', gap: ODLTheme.spacing[4] }}>
            <span style={{
              minWidth: '120px',
              fontSize: ODLTheme.typography.fontSize.sm,
              color: ODLTheme.colors.text.secondary
            }}>
              zIndex.{name}
            </span>
            <div style={{
              width: `${Math.min(value / 10, 200)}px`,
              height: '24px',
              backgroundColor: ODLTheme.colors.primary,
              borderRadius: ODLTheme.borders.radius.base,
              opacity: 0.3 + (value / 2500)
            }} />
            <span style={{
              fontSize: ODLTheme.typography.fontSize.sm,
              color: ODLTheme.colors.text.tertiary,
              fontFamily: ODLTheme.typography.fontFamily.mono
            }}>
              {value}
            </span>
          </div>
        ))}
      </div>
    </div>
  ),
};

// Breakpoints
export const Breakpoints: Story = {
  render: () => (
    <div>
      <h2 style={{ marginBottom: ODLTheme.spacing[6] }}>ODL Breakpoints</h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: ODLTheme.spacing[3] }}>
        {Object.entries(ODLTheme.breakpoints).map(([name, value]) => (
          <div key={name} style={{
            padding: ODLTheme.spacing[3],
            backgroundColor: ODLTheme.colors.surface,
            borderRadius: ODLTheme.borders.radius.md,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <span style={{
              fontSize: ODLTheme.typography.fontSize.base,
              fontWeight: ODLTheme.typography.fontWeight.medium
            }}>
              {name}
            </span>
            <code style={{
              fontSize: ODLTheme.typography.fontSize.sm,
              color: ODLTheme.colors.primary,
              fontFamily: ODLTheme.typography.fontFamily.mono,
              backgroundColor: ODLTheme.colors.primaryLight,
              padding: `${ODLTheme.spacing[1]} ${ODLTheme.spacing[2]}`,
              borderRadius: ODLTheme.borders.radius.base
            }}>
              @media (min-width: {value})
            </code>
          </div>
        ))}
      </div>
    </div>
  ),
};

// Component Style Presets
export const ComponentPresets: Story = {
  render: () => (
    <div>
      <h2 style={{ marginBottom: ODLTheme.spacing[6] }}>ODL Component Style Presets</h2>

      {/* Button Variants */}
      <div style={{ marginBottom: ODLTheme.spacing[8] }}>
        <h3 style={{ marginBottom: ODLTheme.spacing[4] }}>Button Variants</h3>
        <div style={{ display: 'flex', gap: ODLTheme.spacing[3], flexWrap: 'wrap' }}>
          {Object.entries(ODLTheme.components.button.variants).map(([name, styles]) => (
            <button
              key={name}
              style={{
                ...ODLTheme.components.button.base,
                ...ODLTheme.components.button.sizes.medium,
                ...styles,
              } as React.CSSProperties}
            >
              {name}
            </button>
          ))}
        </div>
      </div>

      {/* Button Sizes */}
      <div style={{ marginBottom: ODLTheme.spacing[8] }}>
        <h3 style={{ marginBottom: ODLTheme.spacing[4] }}>Button Sizes</h3>
        <div style={{ display: 'flex', gap: ODLTheme.spacing[3], alignItems: 'center', flexWrap: 'wrap' }}>
          {Object.entries(ODLTheme.components.button.sizes).map(([name, styles]) => (
            <button
              key={name}
              style={{
                ...ODLTheme.components.button.base,
                ...styles,
                ...ODLTheme.components.button.variants.primary,
              } as React.CSSProperties}
            >
              {name}
            </button>
          ))}
        </div>
      </div>

      {/* Card Styles */}
      <div style={{ marginBottom: ODLTheme.spacing[8] }}>
        <h3 style={{ marginBottom: ODLTheme.spacing[4] }}>Card States</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: ODLTheme.spacing[4] }}>
          <div style={ODLTheme.components.card.base as React.CSSProperties}>
            <strong>Base Card</strong>
            <p style={{ margin: `${ODLTheme.spacing[2]} 0 0`, color: ODLTheme.colors.text.secondary, fontSize: ODLTheme.typography.fontSize.sm }}>
              Default card style
            </p>
          </div>
          <div style={{...ODLTheme.components.card.base, ...ODLTheme.components.card.hover} as React.CSSProperties}>
            <strong>Hover Card</strong>
            <p style={{ margin: `${ODLTheme.spacing[2]} 0 0`, color: ODLTheme.colors.text.secondary, fontSize: ODLTheme.typography.fontSize.sm }}>
              Card with hover state
            </p>
          </div>
          <div style={{...ODLTheme.components.card.base, ...ODLTheme.components.card.selected} as React.CSSProperties}>
            <strong>Selected Card</strong>
            <p style={{ margin: `${ODLTheme.spacing[2]} 0 0`, color: ODLTheme.colors.text.secondary, fontSize: ODLTheme.typography.fontSize.sm }}>
              Card with selected state
            </p>
          </div>
        </div>
      </div>

      {/* Input Styles */}
      <div style={{ marginBottom: ODLTheme.spacing[8] }}>
        <h3 style={{ marginBottom: ODLTheme.spacing[4] }}>Input States</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: ODLTheme.spacing[3], maxWidth: '300px' }}>
          <div>
            <label style={{ fontSize: ODLTheme.typography.fontSize.sm, display: 'block', marginBottom: ODLTheme.spacing[1] }}>Base Input</label>
            <input
              type="text"
              placeholder="Type here..."
              style={ODLTheme.components.input.base as React.CSSProperties}
            />
          </div>
          <div>
            <label style={{ fontSize: ODLTheme.typography.fontSize.sm, display: 'block', marginBottom: ODLTheme.spacing[1] }}>Error Input</label>
            <input
              type="text"
              placeholder="Error state"
              style={{...ODLTheme.components.input.base, ...ODLTheme.components.input.error} as React.CSSProperties}
            />
          </div>
        </div>
      </div>

      {/* Badge Style */}
      <div>
        <h3 style={{ marginBottom: ODLTheme.spacing[4] }}>Badge Style</h3>
        <span style={ODLTheme.components.badge.base as React.CSSProperties}>
          Badge Example
        </span>
      </div>
    </div>
  ),
};

// Complete Theme Reference
export const CompleteReference: Story = {
  render: () => (
    <div style={{
      padding: ODLTheme.spacing[6],
      backgroundColor: ODLTheme.colors.surface,
      borderRadius: ODLTheme.borders.radius.lg
    }}>
      <h2 style={{ marginBottom: ODLTheme.spacing[4] }}>ODL Theme Quick Reference</h2>

      <div style={{
        backgroundColor: ODLTheme.colors.white,
        padding: ODLTheme.spacing[4],
        borderRadius: ODLTheme.borders.radius.md,
        border: `1px solid ${ODLTheme.colors.border}`
      }}>
        <h3 style={{ marginBottom: ODLTheme.spacing[3] }}>Import Statement</h3>
        <pre style={{
          backgroundColor: ODLTheme.colors.background,
          padding: ODLTheme.spacing[3],
          borderRadius: ODLTheme.borders.radius.base,
          fontSize: ODLTheme.typography.fontSize.sm,
          fontFamily: ODLTheme.typography.fontFamily.mono
        }}>
{`import ODLTheme from '../styles/ODLTheme';

// Usage examples:
const styles = {
  color: ODLTheme.colors.primary,
  padding: ODLTheme.spacing[4],
  fontSize: ODLTheme.typography.fontSize.base,
  borderRadius: ODLTheme.borders.radius.md,
  boxShadow: ODLTheme.shadows.md,
  transition: ODLTheme.transitions.base
};`}
        </pre>
      </div>

      <div style={{
        marginTop: ODLTheme.spacing[4],
        padding: ODLTheme.spacing[4],
        backgroundColor: ODLTheme.colors.primaryLight,
        borderRadius: ODLTheme.borders.radius.md
      }}>
        <p style={{
          color: ODLTheme.colors.primaryDark,
          fontSize: ODLTheme.typography.fontSize.sm,
          margin: 0
        }}>
          <strong>Remember:</strong> Always use ODLTheme constants instead of hardcoding values.
          This ensures consistency and makes theme updates easier.
        </p>
      </div>

      {/* Theme Structure Overview */}
      <div style={{
        marginTop: ODLTheme.spacing[4],
        backgroundColor: ODLTheme.colors.white,
        padding: ODLTheme.spacing[4],
        borderRadius: ODLTheme.borders.radius.md,
        border: `1px solid ${ODLTheme.colors.border}`
      }}>
        <h3 style={{ marginBottom: ODLTheme.spacing[3] }}>Theme Structure</h3>
        <pre style={{
          backgroundColor: ODLTheme.colors.background,
          padding: ODLTheme.spacing[3],
          borderRadius: ODLTheme.borders.radius.base,
          fontSize: ODLTheme.typography.fontSize.xs,
          fontFamily: ODLTheme.typography.fontFamily.mono,
          overflow: 'auto'
        }}>
{`ODLTheme = {
  colors: {
    primary, primaryHover, primaryLight, primaryDark,
    secondary,
    success, successLight, error, errorLight,
    warning, warningBackground, warningLight,
    info, infoLight,
    white, background, wave, surface, surfaceHover, border,
    grey50...grey600,
    text: { primary, secondary, tertiary, disabled, inverse },
    textLight,
    charts: { blue, emerald, violet, amber, rose, cyan, indigo, lime, fuchsia, orange, teal, sky }
  },
  typography: { fontFamily, fontSize, fontWeight, lineHeight },
  spacing: { 0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20 },
  borders: { radius, width },
  shadows: { none, sm, base, md, lg, xl, focus },
  zIndex: { base, dropdown, sticky, overlay, modal, popover, tooltip, notification },
  transitions: { fast, base, slow, color, transform, opacity, input },
  breakpoints: { sm, md, lg, xl, 2xl },
  components: { button, card, input, badge }
}`}
        </pre>
      </div>
    </div>
  ),
};