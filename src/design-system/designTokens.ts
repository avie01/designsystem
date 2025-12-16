import designTokens from './design-tokens.tokens.json';

// Light Theme Colors
export const colors = {
  // Primary colors
  primary: designTokens.color['light theme']['obj night'].value, // #32373f - Primary text
  secondary: designTokens.color['light theme']['obj twilight'].value, // #525965 - Secondary text
  disabled: designTokens.color['light theme']['obj neutral ac'].value, // #acacac - Disabled text
  
  // Background colors
  backgroundWhite: designTokens.color['light theme']['obj white ff'].value, // #ffffff
  backgroundGray: designTokens.color['light theme']['obj day f5'].value, // #f5f5f5
  backgroundWave: designTokens.color['light theme']['obj wave'].value, // #edf1f5
  
  // Border & Decorations
  border: designTokens.color['light theme']['obj light deco'].value, // #d1d1d1
  
  // Interactive colors
  blueDefault: designTokens.color['light theme']['obj blue default'].value, // #3560c1
  blueHover: designTokens.color['light theme']['obj blue hover'].value, // #0037b1
  bluePressed: designTokens.color['light theme']['obj blue pressed'].value, // #00277f
  
  // Semantic colors
  error: designTokens.color['light theme']['obj red'].value, // #e3001e
  success: designTokens.color['light theme']['obj green'].value, // #2a7d2a
  purple: designTokens.color['light theme']['obj purple'].value, // #9d4098
  warning: designTokens.color['light theme']['obj yellow'].value, // #f3ad2e
};

// Status colors for tags
export const statusColors = {
  // Light backgrounds for tags
  blueberry: designTokens['light - status colours']['obj lt blueberry'].value,
  raspberry: designTokens['light - status colours']['obj lt raspberry'].value,
  grapefruit: designTokens['light - status colours']['obj lt grapefruit'].value,
  mango: designTokens['light - status colours']['obj lt mango'].value,
  cardamom: designTokens['light - status colours']['obj lt cardamom'].value,
  lime: designTokens['light - status colours']['obj lt lime'].value,
  mint: designTokens['light - status colours']['obj lt mint'].value,
  nutmeg: designTokens['light - status colours']['obj lt nutmeg'].value,
  
  // Darker tag colors
  eggplant: designTokens['light - status colours']['obj eggplant'].value,
  radish: designTokens['light - status colours']['obj raddish'].value,
  pawpaw: designTokens['light - status colours']['obj pawpaw'].value,
  pumpkin: designTokens['light - status colours']['obj pumkin'].value,
  zucchini: designTokens['light - status colours']['obj zucchini'].value,
  cucumber: designTokens['light - status colours']['obj cucumber'].value,
  kale: designTokens['light - status colours']['obj kale'].value,
  potato: designTokens['light - status colours']['obj potato'].value,
};

// Brand colors
export const brandColors = {
  keystone: designTokens['brand colours']['brand keystone'].value,
  connect: designTokens['brand colours']['brand connect'].value,
  regworks: designTokens['brand colours']['brand regworks'].value,
  reach: designTokens['brand colours']['brand reach'].value,
  ecm: designTokens['brand colours']['brand ecm'].value,
  alpha: designTokens['brand colours']['brand alpha'].value,
  inform: designTokens['brand colours']['brand inform'].value,
  perform: designTokens['brand colours']['brand perform'].value,
  trapeze: designTokens['brand colours']['brand trapeze'].value,
  teams: designTokens['brand colours']['brand teams'].value,
  office: designTokens['brand colours']['brand office'].value,
};

// Typography
export const typography = {
  h1: {
    fontSize: `${designTokens.font.h1.value.fontSize}px`,
    fontWeight: designTokens.font.h1.value.fontWeight,
    lineHeight: `${designTokens.font.h1.value.lineHeight}px`,
    fontFamily: designTokens.font.h1.value.fontFamily,
  },
  h2: {
    fontSize: `${designTokens.font.h2.value.fontSize}px`,
    fontWeight: designTokens.font.h2.value.fontWeight,
    lineHeight: `${designTokens.font.h2.value.lineHeight}px`,
    fontFamily: designTokens.font.h2.value.fontFamily,
  },
  h3: {
    fontSize: `${designTokens.font.h3.value.fontSize}px`,
    fontWeight: designTokens.font.h3.value.fontWeight,
    lineHeight: `${designTokens.font.h3.value.lineHeight}px`,
    fontFamily: designTokens.font.h3.value.fontFamily,
  },
  body: {
    fontSize: `${designTokens.font['body 2 (p reg)'].value.fontSize}px`,
    fontWeight: designTokens.font['body 2 (p reg)'].value.fontWeight,
    lineHeight: `${designTokens.font['body 2 (p reg)'].value.lineHeight}px`,
    fontFamily: designTokens.font['body 2 (p reg)'].value.fontFamily,
  },
  button: {
    fontSize: `${designTokens.font.buttonmedium.value.fontSize}px`,
    fontWeight: designTokens.font.buttonmedium.value.fontWeight,
    lineHeight: `${designTokens.font.buttonmedium.value.lineHeight}px`,
    fontFamily: designTokens.font.buttonmedium.value.fontFamily,
  },
};

// Spacing - using fixed values since they're not in the JSON structure
export const spacing = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  xxl: '48px',
};

// Border radius - using fixed values
export const borderRadius = {
  sm: '4px',
  md: '8px',
  lg: '12px',
};

// Gradients
export const gradients = {
  regtech: `linear-gradient(${designTokens.gradient.regtech.value.rotation}deg, ${designTokens.gradient.regtech.value.stops.map(s => `${s.color} ${s.position * 100}%`).join(', ')})`,
  build: `linear-gradient(${designTokens.gradient['build gradient'].value.rotation}deg, ${designTokens.gradient['build gradient'].value.stops.map(s => `${s.color} ${s.position * 100}%`).join(', ')})`,
  contentProcess: `linear-gradient(${designTokens.gradient['content & process'].value.rotation}deg, ${designTokens.gradient['content & process'].value.stops.map(s => `${s.color} ${s.position * 100}%`).join(', ')})`,
};