import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import ODLTheme from './ODLTheme';

const meta: Meta = {
  title: 'Design System/ODLTheme',
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
  name: '01 Color Palette',
  render: () => (
    <div>
      <h2 style={{ marginBottom: ODLTheme.spacing[6] }}>ODL Color Palette</h2>
      <div style={{ marginBottom: ODLTheme.spacing[4], padding: ODLTheme.spacing[4], backgroundColor: ODLTheme.colors.infoLight, borderRadius: ODLTheme.borders.radius.md }}>
        <p style={{ margin: 0, fontSize: ODLTheme.typography.fontSize.sm }}>
          <strong>Note:</strong> This shows the current theme colors. The design system supports light, dark, and high contrast modes with different color values for each mode.
        </p>
      </div>
      
      {/* Primary Colors - All Variants */}
      <div style={{ marginBottom: ODLTheme.spacing[8] }}>
        <h3 style={{ marginBottom: ODLTheme.spacing[4] }}>Primary Colors</h3>
        <div style={{ marginBottom: ODLTheme.spacing[4] }}>
          <h4 style={{ marginBottom: ODLTheme.spacing[2], fontSize: ODLTheme.typography.fontSize.base }}>Primary Base Colors</h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: ODLTheme.spacing[4] }}>
            {Object.entries({
              'Primary Night': { light: '#32373F', dark: '#FFFFFF', highContrast: '#000000' },
              'Primary Twilight': { light: '#525965', dark: '#E1E7F2', highContrast: '#000000' },
            }).map(([name, colors]) => (
              <div key={name}>
                <div 
                  style={{ 
                    backgroundColor: colors.light,
                    height: '80px',
                    borderRadius: ODLTheme.borders.radius.md,
                    marginBottom: ODLTheme.spacing[2],
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff'
                  }}
                >
                  {name}
                </div>
                <div style={{ fontSize: ODLTheme.typography.fontSize.xs }}>
                  <strong>{name}</strong><br />
                  Light: {colors.light}<br />
                  Dark: {colors.dark}<br />
                  High Contrast: {colors.highContrast}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ marginBottom: ODLTheme.spacing[4] }}>
          <h4 style={{ marginBottom: ODLTheme.spacing[2], fontSize: ODLTheme.typography.fontSize.base }}>Primary Theme Colors</h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: ODLTheme.spacing[4] }}>
            {Object.entries({
              'Primary Main': { light: '#3560C1', dark: '#A7C2FD', highContrast: '#000000' },
              'Primary Light': { light: '#0037B1', dark: '#D3E1FE', highContrast: '#0037B1' },
              'Primary Dark': { light: '#00277F', dark: '#7C9FFC', highContrast: '#00277F' },
            }).map(([name, colors]) => (
              <div key={name}>
                <div 
                  style={{ 
                    backgroundColor: colors.light,
                    height: '80px',
                    borderRadius: ODLTheme.borders.radius.md,
                    marginBottom: ODLTheme.spacing[2],
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff'
                  }}
                >
                  {name}
                </div>
                <div style={{ fontSize: ODLTheme.typography.fontSize.xs }}>
                  <strong>{name}</strong><br />
                  Light: {colors.light}<br />
                  Dark: {colors.dark}<br />
                  High Contrast: {colors.highContrast}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Secondary Colors */}
      <div style={{ marginBottom: ODLTheme.spacing[8] }}>
        <h3 style={{ marginBottom: ODLTheme.spacing[4] }}>Secondary Colors</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: ODLTheme.spacing[4] }}>
          {Object.entries({
            'Secondary Light': { light: '#DAE8FF', dark: '#464F62', highContrast: '#DAE8FF' },
            'Secondary Main': { light: '#CCDBFE', dark: '#62697A', highContrast: '#CCDBFE' },
            'Secondary Dark': { light: '#B2CAFE', dark: '#7C9FFC', highContrast: '#B2CAFE' },
          }).map(([name, colors]) => (
            <div key={name}>
              <div
                style={{
                  backgroundColor: colors.light,
                  height: '80px',
                  borderRadius: ODLTheme.borders.radius.md,
                  marginBottom: ODLTheme.spacing[2]
                }}
              />
              <div style={{ fontSize: ODLTheme.typography.fontSize.xs }}>
                <strong>{name}</strong><br />
                Light: {colors.light}<br />
                Dark: {colors.dark}<br />
                High Contrast: {colors.highContrast}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Base Colors */}
      <div style={{ marginBottom: ODLTheme.spacing[8] }}>
        <h3 style={{ marginBottom: ODLTheme.spacing[4] }}>Base Colors</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: ODLTheme.spacing[4] }}>
          {Object.entries({
            'Paper': { light: '#FFFFFF', dark: '#28292B', highContrast: '#FFFFFF' },
            'Default': { light: '#EDF1F5', dark: '#1D1D1D', highContrast: '#EDF1F5' },
          }).map(([name, colors]) => (
            <div key={name}>
              <div
                style={{
                  backgroundColor: colors.light,
                  height: '60px',
                  borderRadius: ODLTheme.borders.radius.md,
                  marginBottom: ODLTheme.spacing[2],
                  border: `1px solid ${ODLTheme.colors.border}`
                }}
              />
              <div style={{ fontSize: ODLTheme.typography.fontSize.xs }}>
                <strong>{name}</strong><br />
                Light: {colors.light}<br />
                Dark: {colors.dark}<br />
                High Contrast: {colors.highContrast}
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
            'Grey 700': { light: '#707070', dark: '#96A5BD', highContrast: '#000000' },
            'Grey 600': { light: '#ACACAC', dark: '#6C7789', highContrast: '#ACACAC' },
            'Grey 500': { light: '#D1D1D1', dark: '#8A9AB3', highContrast: '#000000' },
            'Grey 400': { light: '#E8E8E8', dark: '#38393B', highContrast: '#E8E8E8' },
            'Grey 300': { light: '#F5F5F5', dark: '#3C3D3F', highContrast: '#F5F5F5' },
            'Grey 200': { light: '#F7F7F7', dark: '#6F7073', highContrast: '#F7F7F7' },
            'Grey 100': { light: '#F8F8F8', dark: '#88898C', highContrast: '#F8F8F8' },
            'Grey 50': { light: '#FAFAFA', dark: '#CCCDCE', highContrast: '#FAFAFA' },
          }).map(([name, colors]) => (
            <div key={name}>
              <div
                style={{
                  backgroundColor: colors.light,
                  height: '50px',
                  borderRadius: ODLTheme.borders.radius.base,
                  marginBottom: ODLTheme.spacing[1],
                  border: `1px solid ${ODLTheme.colors.border}`
                }}
              />
              <div style={{ fontSize: ODLTheme.typography.fontSize.xs }}>
                <strong>{name}</strong><br />
                <span title={`Light: ${colors.light}`}>{colors.light}</span>
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
            'Text Muted': ODLTheme.colors.text.tertiary,
            'Text Disabled': ODLTheme.colors.text.disabled,
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

      {/* State Colors */}
      <div style={{ marginBottom: ODLTheme.spacing[8] }}>
        <h3 style={{ marginBottom: ODLTheme.spacing[4] }}>State Colors</h3>
        <div style={{ marginBottom: ODLTheme.spacing[4] }}>
          <h4 style={{ marginBottom: ODLTheme.spacing[2], fontSize: ODLTheme.typography.fontSize.base }}>Success</h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: ODLTheme.spacing[4] }}>
            {Object.entries({
              'Success Light': { light: '#DFF8DF', dark: '#1B4A25', highContrast: '#DFF8DF' },
              'Success Main': { light: '#2A7D2A', dark: '#40D6BD', highContrast: '#2A7D2A' },
            }).map(([name, colors]) => (
              <div key={name}>
                <div 
                  style={{ 
                    backgroundColor: colors.light,
                    height: '60px',
                    borderRadius: ODLTheme.borders.radius.md,
                    marginBottom: ODLTheme.spacing[2],
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: name.includes('Main') ? '#fff' : '#000'
                  }}
                >
                  {name}
                </div>
                <div style={{ fontSize: ODLTheme.typography.fontSize.xs }}>
                  <strong>{name}</strong><br />
                  Light: {colors.light}<br />
                  Dark: {colors.dark}<br />
                  High Contrast: {colors.highContrast}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ marginBottom: ODLTheme.spacing[4] }}>
          <h4 style={{ marginBottom: ODLTheme.spacing[2], fontSize: ODLTheme.typography.fontSize.base }}>Warning</h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: ODLTheme.spacing[4] }}>
            {Object.entries({
              'Warning Light': { light: '#FDEED3', dark: '#4A481B', highContrast: '#FDEED3' },
              'Warning Main': { light: '#F3AD2E', dark: '#F3BE5F', highContrast: '#F3AD2E' },
            }).map(([name, colors]) => (
              <div key={name}>
                <div 
                  style={{ 
                    backgroundColor: colors.light,
                    height: '60px',
                    borderRadius: ODLTheme.borders.radius.md,
                    marginBottom: ODLTheme.spacing[2]
                  }}
                />
                <div style={{ fontSize: ODLTheme.typography.fontSize.xs }}>
                  <strong>{name}</strong><br />
                  Light: {colors.light}<br />
                  Dark: {colors.dark}<br />
                  High Contrast: {colors.highContrast}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ marginBottom: ODLTheme.spacing[4] }}>
          <h4 style={{ marginBottom: ODLTheme.spacing[2], fontSize: ODLTheme.typography.fontSize.base }}>Error</h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: ODLTheme.spacing[4] }}>
            {Object.entries({
              'Error Light': { light: '#F7E4E6', dark: '#4A1B18', highContrast: '#F7E4E6' },
              'Error Main': { light: '#D0000A', dark: '#FC98A5', highContrast: '#D0000A' },
            }).map(([name, colors]) => (
              <div key={name}>
                <div 
                  style={{ 
                    backgroundColor: colors.light,
                    height: '60px',
                    borderRadius: ODLTheme.borders.radius.md,
                    marginBottom: ODLTheme.spacing[2],
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: name.includes('Main') ? '#fff' : '#000'
                  }}
                >
                  {name}
                </div>
                <div style={{ fontSize: ODLTheme.typography.fontSize.xs }}>
                  <strong>{name}</strong><br />
                  Light: {colors.light}<br />
                  Dark: {colors.dark}<br />
                  High Contrast: {colors.highContrast}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h4 style={{ marginBottom: ODLTheme.spacing[2], fontSize: ODLTheme.typography.fontSize.base }}>Info</h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: ODLTheme.spacing[4] }}>
            <div>
              <div 
                style={{ 
                  backgroundColor: '#E0F3FF',
                  height: '60px',
                  borderRadius: ODLTheme.borders.radius.md,
                  marginBottom: ODLTheme.spacing[2]
                }}
              />
              <div style={{ fontSize: ODLTheme.typography.fontSize.xs }}>
                <strong>Info</strong><br />
                Light: #E0F3FF<br />
                Dark: #1B2E4A<br />
                High Contrast: #E0F3FF
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chip Colors */}
      <div style={{ marginBottom: ODLTheme.spacing[8] }}>
        <h3 style={{ marginBottom: ODLTheme.spacing[4] }}>Chip Colors</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: ODLTheme.spacing[3] }}>
          {Object.entries({
            'Chip Blue': { light: '#E5F5FE', dark: '#082A78', highContrast: '#E5F5FE' },
            'Chip Pink': { light: '#F7E2F9', dark: '#9C27B0', highContrast: '#F7E2F9' },
            'Chip Red': { light: '#F8E8EA', dark: '#C2185B', highContrast: '#F8E8EA' },
            'Chip Orange': { light: '#FCEEDA', dark: '#C93713', highContrast: '#FCEEDA' },
            'Chip Yellow': { light: '#FFFBCE', dark: '#A15202', highContrast: '#FFFBCE' },
            'Chip Olive': { light: '#DAE3BF', dark: '#54622C', highContrast: '#DAE3BF' },
            'Chip Mint': { light: '#D0FAF7', dark: '#1F787A', highContrast: '#D0FAF7' },
            'Chip Brown': { light: '#E1D5C7', dark: '#4F3E34', highContrast: '#E1D5C7' },
            'Chip Purple': { light: '#D6C8F6', dark: '#381A93', highContrast: '#D6C8F6' },
            'Chip Green': { light: '#E4F7E4', dark: '#31622C', highContrast: '#E4F7E4' },
          }).map(([name, colors]) => (
            <div key={name}>
              <div 
                style={{ 
                  backgroundColor: colors.light,
                  height: '40px',
                  borderRadius: '999px',
                  marginBottom: ODLTheme.spacing[1],
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: ODLTheme.typography.fontSize.xs,
                  padding: `0 ${ODLTheme.spacing[3]}`
                }}
              >
                {name.replace('Chip ', '')}
              </div>
              <div style={{ fontSize: '10px', textAlign: 'center' }}>
                <strong>{name.replace('Chip ', '')}</strong><br />
                {colors.light}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Static Colors */}
      <div style={{ marginBottom: ODLTheme.spacing[8] }}>
        <h3 style={{ marginBottom: ODLTheme.spacing[4] }}>Static Colors (Do not change with theme)</h3>
        
        {/* Folder Colors */}
        <div style={{ marginBottom: ODLTheme.spacing[4] }}>
          <h4 style={{ marginBottom: ODLTheme.spacing[2], fontSize: ODLTheme.typography.fontSize.base }}>Folder Colors</h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: ODLTheme.spacing[3] }}>
            {Object.entries({
              'Yellow': '#FF9B00',
              'Red': '#E91E63',
              'Burgundy': '#C2185B',
              'Purple': '#9C27B0',
              'Lavender': '#6A31D4',
              'Deep Blue': '#5255F3',
              'Ocean': '#2769B0',
              'Sky': '#57ACDC',
              'Teal': '#57DCBE',
              'Green': '#60C689',
              'Grey': '#CFD8DC',
            }).map(([name, color]) => (
              <div key={name}>
                <div 
                  style={{ 
                    backgroundColor: color,
                    height: '50px',
                    borderRadius: ODLTheme.borders.radius.base,
                    marginBottom: ODLTheme.spacing[1],
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <span style={{ color: '#fff', fontSize: ODLTheme.typography.fontSize.xs }}>
                    {name}
                  </span>
                </div>
                <div style={{ fontSize: '10px', textAlign: 'center' }}>
                  {color}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Brand Colors */}
        <div style={{ marginBottom: ODLTheme.spacing[4] }}>
          <h4 style={{ marginBottom: ODLTheme.spacing[2], fontSize: ODLTheme.typography.fontSize.base }}>Brand Colors</h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: ODLTheme.spacing[3] }}>
            {Object.entries({
              'Office': '#D83B00',
              'Perform': '#BD2841',
              'Teams': '#5558AF',
              'Build': '#5DA10C',
              'Content Solutions': '#0B77D8',
              'Regtech': '#00928F',
            }).map(([name, color]) => (
              <div key={name}>
                <div 
                  style={{ 
                    backgroundColor: color,
                    height: '60px',
                    borderRadius: ODLTheme.borders.radius.md,
                    marginBottom: ODLTheme.spacing[1],
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <span style={{ color: '#fff', fontSize: ODLTheme.typography.fontSize.xs }}>
                    {name}
                  </span>
                </div>
                <div style={{ fontSize: ODLTheme.typography.fontSize.xs, textAlign: 'center' }}>
                  <strong>{name}</strong><br />
                  {color}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chart Colors - Nivo Rocks */}
        <div>
          <h4 style={{ marginBottom: ODLTheme.spacing[2], fontSize: ODLTheme.typography.fontSize.base }}>Chart Colors - Nivo Rocks</h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: ODLTheme.spacing[2] }}>
            {Object.entries({
              'Light Green': '#B3DE8E',
              'Crimson': '#E11F27',
              'Thistle': '#CAB3D5',
              'Sienna': '#B0592F',
              'Steel Blue': '#2679B2',
              'Light Coral': '#F99B9B',
              'Dark Orange': '#FD7F23',
              'Goldenrod': '#F1E15B',
              'Light Blue': '#A8CEE2',
              'Forest Green': '#399F34',
              'Sandy Brown': '#FCBE75',
              'Dark Slate Blue': '#6A4198',
            }).map(([name, color]) => (
              <div key={name}>
                <div 
                  style={{ 
                    backgroundColor: color,
                    height: '40px',
                    borderRadius: ODLTheme.borders.radius.base,
                    marginBottom: ODLTheme.spacing[1]
                  }}
                />
                <div style={{ fontSize: '10px' }}>
                  <strong>{name}</strong><br />
                  {color}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  ),
};

// Typography
export const Typography: Story = {
  name: '02 Typography',
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
  name: '03 Spacing',
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
  name: '04 Border Radius',
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
  name: '05 Shadows',
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
  name: '06 Transitions',
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
  name: '07 Z Index',
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
  name: '08 Breakpoints',
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
  name: '09 Component Presets',
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
  name: '10 Complete Reference',
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