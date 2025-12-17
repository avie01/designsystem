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
    </div>
  ),
};