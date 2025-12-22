import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import ODLTheme from './ODLTheme';

// Define theme modes
type ThemeMode = 'light' | 'dark' | 'highContrast';

// Define the complete color palette with all theme modes
const themeColors = {
  light: {
    // Primary Colors
    primaryNight: '#32373F',
    primaryTwilight: '#525965',
    primaryMain: '#3560C1',
    primaryLight: '#0037B1',
    primaryDark: '#00277F',
    // Secondary Colors
    secondaryLight: '#DAE8FF',
    secondaryMain: '#CCDBFE',
    secondaryDark: '#B2CAFE',
    // Base Colors
    paper: '#FFFFFF',
    default: '#EDF1F5',
    // Grey Scale
    grey700: '#707070',
    grey600: '#ACACAC',
    grey500: '#D1D1D1',
    grey400: '#E8E8E8',
    grey300: '#F5F5F5',
    grey200: '#F7F7F7',
    grey100: '#F8F8F8',
    grey50: '#FAFAFA',
    // Text Colors
    textPrimary: '#32373F',
    textSecondary: '#525965',
    textMuted: '#707070',
    textDisabled: '#ACACAC',
    // State Colors
    successLight: '#DFF8DF',
    successMain: '#2A7D2A',
    warningLight: '#FDEED3',
    warningMain: '#F3AD2E',
    errorLight: '#F7E4E6',
    errorMain: '#D0000A',
    info: '#E0F3FF',
    // Chip Colors
    chipBlue: '#E5F5FE',
    chipPink: '#F7E2F9',
    chipRed: '#F8E8EA',
    chipOrange: '#FCEEDA',
    chipYellow: '#FFFBCE',
    chipOlive: '#DAE3BF',
    chipMint: '#D0FAF7',
    chipBrown: '#E1D5C7',
    chipPurple: '#D6C8F6',
    chipGreen: '#E4F7E4',
  },
  dark: {
    // Primary Colors
    primaryNight: '#FFFFFF',
    primaryTwilight: '#E1E7F2',
    primaryMain: '#A7C2FD',
    primaryLight: '#D3E1FE',
    primaryDark: '#7C9FFC',
    // Secondary Colors
    secondaryLight: '#464F62',
    secondaryMain: '#62697A',
    secondaryDark: '#7C9FFC',
    // Base Colors
    paper: '#28292B',
    default: '#1D1D1D',
    // Grey Scale
    grey700: '#96A5BD',
    grey600: '#6C7789',
    grey500: '#8A9AB3',
    grey400: '#38393B',
    grey300: '#3C3D3F',
    grey200: '#6F7073',
    grey100: '#88898C',
    grey50: '#CCCDCE',
    // Text Colors
    textPrimary: '#FFFFFF',
    textSecondary: '#E1E7F2',
    textMuted: '#96A5BD',
    textDisabled: '#6C7789',
    // State Colors
    successLight: '#1B4A25',
    successMain: '#40D6BD',
    warningLight: '#4A481B',
    warningMain: '#F3BE5F',
    errorLight: '#4A1B18',
    errorMain: '#FC98A5',
    info: '#1B2E4A',
    // Chip Colors
    chipBlue: '#082A78',
    chipPink: '#9C27B0',
    chipRed: '#C2185B',
    chipOrange: '#C93713',
    chipYellow: '#A15202',
    chipOlive: '#54622C',
    chipMint: '#1F787A',
    chipBrown: '#4F3E34',
    chipPurple: '#381A93',
    chipGreen: '#31622C',
  },
  highContrast: {
    // Primary Colors
    primaryNight: '#000000',
    primaryTwilight: '#000000',
    primaryMain: '#000000',
    primaryLight: '#0037B1',
    primaryDark: '#00277F',
    // Secondary Colors
    secondaryLight: '#DAE8FF',
    secondaryMain: '#CCDBFE',
    secondaryDark: '#B2CAFE',
    // Base Colors
    paper: '#FFFFFF',
    default: '#EDF1F5',
    // Grey Scale
    grey700: '#000000',
    grey600: '#ACACAC',
    grey500: '#000000',
    grey400: '#E8E8E8',
    grey300: '#F5F5F5',
    grey200: '#F7F7F7',
    grey100: '#F8F8F8',
    grey50: '#FAFAFA',
    // Text Colors
    textPrimary: '#000000',
    textSecondary: '#000000',
    textMuted: '#000000',
    textDisabled: '#ACACAC',
    // State Colors
    successLight: '#DFF8DF',
    successMain: '#2A7D2A',
    warningLight: '#FDEED3',
    warningMain: '#F3AD2E',
    errorLight: '#F7E4E6',
    errorMain: '#D0000A',
    info: '#E0F3FF',
    // Chip Colors
    chipBlue: '#E5F5FE',
    chipPink: '#F7E2F9',
    chipRed: '#F8E8EA',
    chipOrange: '#FCEEDA',
    chipYellow: '#FFFBCE',
    chipOlive: '#DAE3BF',
    chipMint: '#D0FAF7',
    chipBrown: '#E1D5C7',
    chipPurple: '#D6C8F6',
    chipGreen: '#E4F7E4',
  }
};

// Static colors that don't change with theme
const staticColors = {
  // Folder Colors
  folderYellow: '#FF9B00',
  folderRed: '#E91E63',
  folderBurgundy: '#C2185B',
  folderPurple: '#9C27B0',
  folderLavender: '#6A31D4',
  folderDeepBlue: '#5255F3',
  folderOcean: '#2769B0',
  folderSky: '#57ACDC',
  folderTeal: '#57DCBE',
  folderGreen: '#60C689',
  folderGrey: '#CFD8DC',
  // Brand Colors
  brandOffice: '#D83B00',
  brandPerform: '#BD2841',
  brandTeams: '#5558AF',
  brandBuild: '#5DA10C',
  brandContentSolutions: '#0B77D8',
  brandRegtech: '#00928F',
  // Chart Colors - Nivo Rocks
  chartLightGreen: '#B3DE8E',
  chartCrimson: '#E11F27',
  chartThistle: '#CAB3D5',
  chartSienna: '#B0592F',
  chartSteelBlue: '#2679B2',
  chartLightCoral: '#F99B9B',
  chartDarkOrange: '#FD7F23',
  chartGoldenrod: '#F1E15B',
  chartLightBlue: '#A8CEE2',
  chartForestGreen: '#399F34',
  chartSandyBrown: '#FCBE75',
  chartDarkSlateBlue: '#6A4198',
};

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

// Theme Switcher Component
const ThemeSwitcher: React.FC<{ theme: ThemeMode; onChange: (theme: ThemeMode) => void }> = ({ theme, onChange }) => (
  <div style={{
    position: 'sticky',
    top: 0,
    zIndex: 10,
    backgroundColor: '#fff',
    padding: ODLTheme.spacing[4],
    marginBottom: ODLTheme.spacing[4],
    borderBottom: `1px solid ${ODLTheme.colors.border}`,
    display: 'flex',
    alignItems: 'center',
    gap: ODLTheme.spacing[4]
  }}>
    <label style={{ fontSize: ODLTheme.typography.fontSize.base, fontWeight: ODLTheme.typography.fontWeight.medium }}>
      Theme Mode:
    </label>
    <select
      value={theme}
      onChange={(e) => onChange(e.target.value as ThemeMode)}
      style={{
        ...ODLTheme.formStyles.select,
        minWidth: '150px'
      }}
    >
      <option value="light">Light</option>
      <option value="dark">Dark</option>
      <option value="highContrast">High Contrast</option>
    </select>
  </div>
);

// Color Palette
export const ColorPalette: Story = {
  name: '01 Color Palette',
  render: () => {
    const [selectedTheme, setSelectedTheme] = useState<ThemeMode>('light');
    const colors = themeColors[selectedTheme];
    const backgroundColor = selectedTheme === 'dark' ? '#1D1D1D' : '#FFFFFF';
    const textColor = selectedTheme === 'dark' ? '#FFFFFF' : '#161616';
    
    return (
    <div style={{ backgroundColor, color: textColor, minHeight: '100vh', margin: '-1rem', padding: '1rem' }}>
      <ThemeSwitcher theme={selectedTheme} onChange={setSelectedTheme} />
      <div style={{ padding: ODLTheme.spacing[4] }}>
        <h2 style={{ marginBottom: ODLTheme.spacing[6], color: textColor }}>ODL Color Palette - {selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)} Mode</h2>
        <div style={{ marginBottom: ODLTheme.spacing[4], padding: ODLTheme.spacing[4], backgroundColor: colors.info, borderRadius: ODLTheme.borders.radius.md }}>
          <p style={{ margin: 0, fontSize: ODLTheme.typography.fontSize.sm, color: selectedTheme === 'dark' ? '#fff' : '#000' }}>
            <strong>Note:</strong> Use the theme switcher above to view colors in different modes. The design system adapts all colors based on the selected theme.
          </p>
        </div>
      
        {/* Primary Colors - All Variants */}
        <div style={{ marginBottom: ODLTheme.spacing[8] }}>
          <h3 style={{ marginBottom: ODLTheme.spacing[4], color: textColor }}>Primary Colors</h3>
          <div style={{ marginBottom: ODLTheme.spacing[4] }}>
            <h4 style={{ marginBottom: ODLTheme.spacing[2], fontSize: ODLTheme.typography.fontSize.base, color: textColor }}>Primary Base Colors</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: ODLTheme.spacing[4] }}>
              <div>
                <div 
                  style={{ 
                    backgroundColor: colors.primaryNight,
                    height: '80px',
                    borderRadius: ODLTheme.borders.radius.md,
                    marginBottom: ODLTheme.spacing[2],
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: selectedTheme === 'dark' ? '#000' : '#fff',
                    border: `1px solid ${selectedTheme === 'dark' ? '#444' : '#ddd'}`
                  }}
                >
                  Primary Night
                </div>
                <div style={{ fontSize: ODLTheme.typography.fontSize.sm, color: textColor }}>
                  <strong>Primary Night</strong><br />
                  {colors.primaryNight}
                </div>
              </div>
              <div>
                <div 
                  style={{ 
                    backgroundColor: colors.primaryTwilight,
                    height: '80px',
                    borderRadius: ODLTheme.borders.radius.md,
                    marginBottom: ODLTheme.spacing[2],
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: selectedTheme === 'dark' ? '#000' : '#fff',
                    border: `1px solid ${selectedTheme === 'dark' ? '#444' : '#ddd'}`
                  }}
                >
                  Primary Twilight
                </div>
                <div style={{ fontSize: ODLTheme.typography.fontSize.sm, color: textColor }}>
                  <strong>Primary Twilight</strong><br />
                  {colors.primaryTwilight}
                </div>
              </div>
            </div>
          </div>
          <div style={{ marginBottom: ODLTheme.spacing[4] }}>
            <h4 style={{ marginBottom: ODLTheme.spacing[2], fontSize: ODLTheme.typography.fontSize.base, color: textColor }}>Primary Theme Colors</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: ODLTheme.spacing[4] }}>
              {[
                { name: 'Primary Main', key: 'primaryMain' },
                { name: 'Primary Light', key: 'primaryLight' },
                { name: 'Primary Dark', key: 'primaryDark' },
              ].map(({ name, key }) => (
                <div key={key}>
                  <div 
                    style={{ 
                      backgroundColor: colors[key],
                      height: '80px',
                      borderRadius: ODLTheme.borders.radius.md,
                      marginBottom: ODLTheme.spacing[2],
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: selectedTheme === 'dark' ? '#000' : '#fff',
                      border: `1px solid ${selectedTheme === 'dark' ? '#444' : '#ddd'}`
                    }}
                  >
                    {name}
                  </div>
                  <div style={{ fontSize: ODLTheme.typography.fontSize.sm, color: textColor }}>
                    <strong>{name}</strong><br />
                    {colors[key]}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Secondary Colors */}
        <div style={{ marginBottom: ODLTheme.spacing[8] }}>
          <h3 style={{ marginBottom: ODLTheme.spacing[4], color: textColor }}>Secondary Colors</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: ODLTheme.spacing[4] }}>
            {[
              { name: 'Secondary Light', key: 'secondaryLight' },
              { name: 'Secondary Main', key: 'secondaryMain' },
              { name: 'Secondary Dark', key: 'secondaryDark' },
            ].map(({ name, key }) => (
              <div key={key}>
                <div
                  style={{
                    backgroundColor: colors[key],
                    height: '80px',
                    borderRadius: ODLTheme.borders.radius.md,
                    marginBottom: ODLTheme.spacing[2],
                    border: `1px solid ${selectedTheme === 'dark' ? '#444' : '#ddd'}`
                  }}
                />
                <div style={{ fontSize: ODLTheme.typography.fontSize.sm, color: textColor }}>
                  <strong>{name}</strong><br />
                  {colors[key]}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Base Colors */}
        <div style={{ marginBottom: ODLTheme.spacing[8] }}>
          <h3 style={{ marginBottom: ODLTheme.spacing[4], color: textColor }}>Base Colors</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: ODLTheme.spacing[4] }}>
            {[
              { name: 'Paper', key: 'paper' },
              { name: 'Default', key: 'default' },
            ].map(({ name, key }) => (
              <div key={key}>
                <div
                  style={{
                    backgroundColor: colors[key],
                    height: '60px',
                    borderRadius: ODLTheme.borders.radius.md,
                    marginBottom: ODLTheme.spacing[2],
                    border: `1px solid ${selectedTheme === 'dark' ? '#444' : '#ddd'}`
                  }}
                />
                <div style={{ fontSize: ODLTheme.typography.fontSize.sm, color: textColor }}>
                  <strong>{name}</strong><br />
                  {colors[key]}
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Grey Scale */}
      <div style={{ marginBottom: ODLTheme.spacing[8] }}>
        <h3 style={{ marginBottom: ODLTheme.spacing[4], color: textColor }}>Grey Scale</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: ODLTheme.spacing[3] }}>
          {[
            { name: 'Grey 700', key: 'grey700' },
            { name: 'Grey 600', key: 'grey600' },
            { name: 'Grey 500', key: 'grey500' },
            { name: 'Grey 400', key: 'grey400' },
            { name: 'Grey 300', key: 'grey300' },
            { name: 'Grey 200', key: 'grey200' },
            { name: 'Grey 100', key: 'grey100' },
            { name: 'Grey 50', key: 'grey50' },
          ].map(({ name, key }) => (
            <div key={key}>
              <div
                style={{
                  backgroundColor: colors[key],
                  height: '50px',
                  borderRadius: ODLTheme.borders.radius.base,
                  marginBottom: ODLTheme.spacing[1],
                  border: `1px solid ${selectedTheme === 'dark' ? '#444' : '#ddd'}`
                }}
              />
              <div style={{ fontSize: ODLTheme.typography.fontSize.xs, color: textColor }}>
                <strong>{name}</strong><br />
                {colors[key]}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Text Colors */}
      <div style={{ marginBottom: ODLTheme.spacing[8] }}>
        <h3 style={{ marginBottom: ODLTheme.spacing[4], color: textColor }}>Text Colors</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: ODLTheme.spacing[4] }}>
          {[
            { name: 'Text Primary', key: 'textPrimary' },
            { name: 'Text Secondary', key: 'textSecondary' },
            { name: 'Text Muted', key: 'textMuted' },
            { name: 'Text Disabled', key: 'textDisabled' },
          ].map(({ name, key }) => (
            <div key={key}>
              <div
                style={{
                  backgroundColor: colors[key],
                  height: '50px',
                  borderRadius: ODLTheme.borders.radius.md,
                  marginBottom: ODLTheme.spacing[2],
                  border: `1px solid ${selectedTheme === 'dark' ? '#444' : '#ddd'}`
                }}
              />
              <div style={{ fontSize: ODLTheme.typography.fontSize.sm, color: textColor }}>
                <strong>{name}</strong><br />
                {colors[key]}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* State Colors */}
      <div style={{ marginBottom: ODLTheme.spacing[8] }}>
        <h3 style={{ marginBottom: ODLTheme.spacing[4], color: textColor }}>State Colors</h3>
        <div style={{ marginBottom: ODLTheme.spacing[4] }}>
          <h4 style={{ marginBottom: ODLTheme.spacing[2], fontSize: ODLTheme.typography.fontSize.base, color: textColor }}>Success</h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: ODLTheme.spacing[4] }}>
            {[
              { name: 'Success Light', key: 'successLight' },
              { name: 'Success Main', key: 'successMain' },
            ].map(({ name, key }) => (
              <div key={key}>
                <div 
                  style={{ 
                    backgroundColor: colors[key],
                    height: '60px',
                    borderRadius: ODLTheme.borders.radius.md,
                    marginBottom: ODLTheme.spacing[2],
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: name.includes('Main') ? '#fff' : (selectedTheme === 'dark' ? '#fff' : '#000'),
                    border: `1px solid ${selectedTheme === 'dark' ? '#444' : '#ddd'}`
                  }}
                >
                  {name}
                </div>
                <div style={{ fontSize: ODLTheme.typography.fontSize.xs, color: textColor }}>
                  <strong>{name}</strong><br />
                  {colors[key]}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ marginBottom: ODLTheme.spacing[4] }}>
          <h4 style={{ marginBottom: ODLTheme.spacing[2], fontSize: ODLTheme.typography.fontSize.base, color: textColor }}>Warning</h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: ODLTheme.spacing[4] }}>
            {[
              { name: 'Warning Light', key: 'warningLight' },
              { name: 'Warning Main', key: 'warningMain' },
            ].map(({ name, key }) => (
              <div key={key}>
                <div 
                  style={{ 
                    backgroundColor: colors[key],
                    height: '60px',
                    borderRadius: ODLTheme.borders.radius.md,
                    marginBottom: ODLTheme.spacing[2],
                    border: `1px solid ${selectedTheme === 'dark' ? '#444' : '#ddd'}`
                  }}
                />
                <div style={{ fontSize: ODLTheme.typography.fontSize.xs, color: textColor }}>
                  <strong>{name}</strong><br />
                  {colors[key]}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ marginBottom: ODLTheme.spacing[4] }}>
          <h4 style={{ marginBottom: ODLTheme.spacing[2], fontSize: ODLTheme.typography.fontSize.base, color: textColor }}>Error</h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: ODLTheme.spacing[4] }}>
            {[
              { name: 'Error Light', key: 'errorLight' },
              { name: 'Error Main', key: 'errorMain' },
            ].map(({ name, key }) => (
              <div key={key}>
                <div 
                  style={{ 
                    backgroundColor: colors[key],
                    height: '60px',
                    borderRadius: ODLTheme.borders.radius.md,
                    marginBottom: ODLTheme.spacing[2],
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: name.includes('Main') ? '#fff' : (selectedTheme === 'dark' ? '#fff' : '#000'),
                    border: `1px solid ${selectedTheme === 'dark' ? '#444' : '#ddd'}`
                  }}
                >
                  {name}
                </div>
                <div style={{ fontSize: ODLTheme.typography.fontSize.xs, color: textColor }}>
                  <strong>{name}</strong><br />
                  {colors[key]}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h4 style={{ marginBottom: ODLTheme.spacing[2], fontSize: ODLTheme.typography.fontSize.base, color: textColor }}>Info</h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: ODLTheme.spacing[4] }}>
            <div>
              <div 
                style={{ 
                  backgroundColor: colors.info,
                  height: '60px',
                  borderRadius: ODLTheme.borders.radius.md,
                  marginBottom: ODLTheme.spacing[2],
                  border: `1px solid ${selectedTheme === 'dark' ? '#444' : '#ddd'}`
                }}
              />
              <div style={{ fontSize: ODLTheme.typography.fontSize.xs, color: textColor }}>
                <strong>Info</strong><br />
                {colors.info}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chip Colors */}
      <div style={{ marginBottom: ODLTheme.spacing[8] }}>
        <h3 style={{ marginBottom: ODLTheme.spacing[4], color: textColor }}>Chip Colors</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: ODLTheme.spacing[3] }}>
          {[
            { name: 'Chip Blue', key: 'chipBlue' },
            { name: 'Chip Pink', key: 'chipPink' },
            { name: 'Chip Red', key: 'chipRed' },
            { name: 'Chip Orange', key: 'chipOrange' },
            { name: 'Chip Yellow', key: 'chipYellow' },
            { name: 'Chip Olive', key: 'chipOlive' },
            { name: 'Chip Mint', key: 'chipMint' },
            { name: 'Chip Brown', key: 'chipBrown' },
            { name: 'Chip Purple', key: 'chipPurple' },
            { name: 'Chip Green', key: 'chipGreen' },
          ].map(({ name, key }) => (
            <div key={key}>
              <div 
                style={{ 
                  backgroundColor: colors[key],
                  height: '40px',
                  borderRadius: '999px',
                  marginBottom: ODLTheme.spacing[1],
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: ODLTheme.typography.fontSize.xs,
                  padding: `0 ${ODLTheme.spacing[3]}`,
                  color: selectedTheme === 'dark' ? '#fff' : '#000'
                }}
              >
                {name.replace('Chip ', '')}
              </div>
              <div style={{ fontSize: '10px', textAlign: 'center', color: textColor }}>
                <strong>{name.replace('Chip ', '')}</strong><br />
                {colors[key]}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Static Colors */}
      <div style={{ marginBottom: ODLTheme.spacing[8] }}>
        <h3 style={{ marginBottom: ODLTheme.spacing[4], color: textColor }}>Static Colors (Do not change with theme)</h3>
        
        {/* Folder Colors */}
        <div style={{ marginBottom: ODLTheme.spacing[4] }}>
          <h4 style={{ marginBottom: ODLTheme.spacing[2], fontSize: ODLTheme.typography.fontSize.base, color: textColor }}>Folder Colors</h4>
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
                <div style={{ fontSize: '10px', textAlign: 'center', color: textColor }}>
                  {color}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Brand Colors */}
        <div style={{ marginBottom: ODLTheme.spacing[4] }}>
          <h4 style={{ marginBottom: ODLTheme.spacing[2], fontSize: ODLTheme.typography.fontSize.base, color: textColor }}>Brand Colors</h4>
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
                <div style={{ fontSize: ODLTheme.typography.fontSize.xs, textAlign: 'center', color: textColor }}>
                  <strong>{name}</strong><br />
                  {color}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chart Colors - Nivo Rocks */}
        <div>
          <h4 style={{ marginBottom: ODLTheme.spacing[2], fontSize: ODLTheme.typography.fontSize.base, color: textColor }}>Chart Colors - Nivo Rocks</h4>
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
                <div style={{ fontSize: '10px', color: textColor }}>
                  <strong>{name}</strong><br />
                  {color}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      </div>
    </div>
    );
  },
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