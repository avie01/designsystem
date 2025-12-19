/**
 * Carbon Icon Mapping Utility
 * 
 * This file provides a comprehensive mapping between Carbon icon names and their imports.
 * When the user provides an icon like <Alarm />, we can find it here.
 * 
 * RULES:
 * 1. User provides icon as JSX: <IconName />
 * 2. We extract "IconName" and convert to kebab-case: "icon-name"
 * 3. Look up in our mapping to find the correct Carbon import
 * 
 * HOW TO ADD NEW ICONS:
 * 1. User gives you <SomeName />
 * 2. Add entry: 'some-name': 'SomeName'
 * 3. The Icon component will automatically import from @carbon/icons-react
 */

// Comprehensive mapping of icon names to Carbon exports
// Format: 'kebab-case-name': 'CarbonExportName'
export const carbonIconMapping: Record<string, string> = {
  // A
  'add': 'Add',
  'audit': 'DataAuditing',
  'add-alt': 'AddAlt',
  'add-filled': 'AddFilled',
  'add-large': 'AddLarge',
  'ai-generate': 'AiGenerate',
  'ai-label': 'WatsonHealthAiResults',
  'alarm': 'Alarm',
  'alarm-add': 'AlarmAdd',
  'alarm-subtract': 'AlarmSubtract',
  'analytics': 'Analytics',
  'application': 'Application',
  'apps': 'Apps',
  'archive': 'Archive',
  'arrow-down': 'ArrowDown',
  'arrow-left': 'ArrowLeft',
  'arrow-right': 'ArrowRight',
  'arrow-up': 'ArrowUp',
  'arrows': 'Arrows',
  'assignment': 'AssignmentActionUsage',
  'attachment': 'DocumentAttachment',
  
  // B
  'back-to-top': 'BackToTop',
  'badge': 'Badge',
  'bar': 'ChartBar',
  'beta': 'Beta',
  'bluetooth': 'Bluetooth',
  'bookmark': 'Star',
  'bookmark-filled': 'StarFilled',
  'blueprint': 'Blueprint',
  'briefcase': 'Portfolio',
  'build': 'Build',
  'building': 'Building',
  'button': 'ButtonCentered',
  
  // C
  'calendar': 'Calendar',
  'camera': 'Camera',
  'caret-down': 'CaretDown',
  'caret-up': 'CaretUp',
  'caret-left': 'CaretLeft',
  'caret-right': 'CaretRight',
  'catalog': 'IbmKnowledgeCatalog',
  'certificate': 'Certificate',
  'chart-bar': 'ChartBar',
  'chart-line': 'ChartLine',
  'chart-pie': 'ChartPie',
  'chat': 'Chat',
  'checkmark': 'Checkmark',
  'checkmark-filled': 'CheckmarkFilled',
  'checkmark-outline': 'Checkmark',
  'content': 'ExecutableProgram',
  'chevron-down': 'ChevronDown',
  'chevron-left': 'ChevronLeft',
  'chevron-right': 'ChevronRight',
  'chevron-up': 'ChevronUp',
  'clean': 'Clean',
  'close': 'Close',
  'close-filled': 'CloseFilled',
  'close-outline': 'CloseOutline',
  'cloud': 'Cloud',
  'code': 'Code',
  'code-block': 'Code',
  'collaborate': 'Collaborate',
  'color-palette': 'ColorPalette',
  'column': 'Column',
  'comment': 'Chat',
  'copy': 'Copy',
  'copy-file': 'CopyFile',
  'crop': 'Crop',
  'currency': 'Currency',
  'cursor': 'Cursor',
  
  // D
  'dashboard': 'Dashboard',
  'data': 'Data',
  'data-base': 'DataBase',
  'data-bin': 'DataBin',
  'data-table': 'DataTable',
  'delete': 'TrashCan',
  'delivery': 'Delivery',
  'document': 'Document',
  'document-multiple': 'Documents',
  'dot-mark': 'DotMark',
  'document-add': 'DocumentAdd',
  'document-blank': 'DocumentBlank',
  'document-export': 'DocumentExport',
  'document-pdf': 'DocumentPdf',
  'document-tasks': 'DocumentTasks',
  'download': 'Download',
  'draggable': 'Draggable',
  'draw': 'Draw',
  
  // E
  'edit': 'Edit',
  'email': 'Email',
  'error': 'Error',
  'error-filled': 'ErrorFilled',
  'event': 'Event',
  'event-warning': 'EventWarning',
  'export': 'Export',
  
  // F
  'face-satisfied': 'FaceSatisfied',
  'favorite': 'Favorite',
  'favorite-filled': 'FavoriteFilled',
  'file': 'Document',
  'filter': 'Filter',
  'fit-to-width': 'FitToWidth',
  'flag': 'Flag',
  'flash': 'Flash',
  'flash-filled': 'FlashFilled',
  'folder': 'Folder',
  'folder-add': 'FolderAdd',
  'folder-open': 'FolderOpen',
  'form': 'IbmZOsAiControlInterface',
  
  // G
  'generate-ai': 'AiGenerate',
  'gift': 'Gift',
  'globe': 'Globe',
  'grid': 'Thumbnail_2',
  'group': 'UserMultiple',
  
  // H
  'headset': 'Headset',
  'heart': 'Favorite',
  'heart-filled': 'FavoriteFilled',
  'help': 'Help',
  'help-filled': 'HelpFilled',
  'history': 'Time',
  'home': 'Home',
  
  // I
  'idea': 'IdeaCheck',
  'image': 'Image',
  'information': 'Information',
  'information-filled': 'InformationFilled',
  
  // K
  'keyboard': 'Text',
  
  // L
  'launch': 'Launch',
  'layers': 'Layers',
  'link': 'Link',
  'list': 'List',
  'list-bulleted': 'ListBulleted',
  'list-numbered': 'ListNumbered',
  'location': 'Location',
  'locked': 'Locked',
  'logout': 'Logout',
  'logo-react': 'LogoReact',
  
  // M
  'magic-wand': 'MagicWand',
  'map': 'Map',
  'choropleth-map': 'Map',
  'maximize': 'Maximize',
  'menu': 'Menu',
  'microphone': 'Microphone',
  'minimize': 'Minimize',
  'mobile': 'Mobile',
  'moon': 'Moon',
  
  // N
  'navigation': 'OverflowMenuVertical',
  'notification': 'Notification',
  'notification-new': 'NotificationNew',
  
  // O
  'overflow-menu-horizontal': 'OverflowMenuHorizontal',
  'overflow-menu-vertical': 'OverflowMenuVertical',
  'overlay': 'Blockchain',
  
  // P
  'page-first': 'PageFirst',
  'page-last': 'PageLast',
  'paint-brush': 'PaintBrush',
  'panel-expansion': 'PanelExpansion',
  'password': 'Password',
  'paste': 'Paste',
  'pause': 'Pause',
  'pause-filled': 'PauseFilled',
  'pen': 'Pen',
  'phone': 'Phone',
  'pin': 'Pin',
  'pin-filled': 'PinFilled',
  'play': 'Play',
  'play-filled': 'PlayFilled',
  'printer': 'Document',
  'print': 'Printer',
  
  // Q
  'question': 'Help',
  
  // R
  'radio-button': 'RadioButton',
  'radio-button-checked': 'RadioButtonChecked',
  'recent': 'UpdateNow',
  'redo': 'Redo',
  'refresh': 'Renew',
  'renew': 'Renew',
  'report': 'Report',
  'reset': 'Reset',
  'restart': 'Restart',
  'rocket': 'Rocket',
  'rotate': 'Rotate',
  'row': 'Row',
  'ruler': 'Ruler',
  'ruler-alt': 'Ruler',
  
  // S
  'save': 'Save',
  'scan': 'Scan',
  'screen': 'Screen',
  'search': 'Search',
  'search-locate': 'SearchLocate',
  'security': 'Security',
  'send': 'Send',
  'send-alt': 'SendAlt',
  'send-filled': 'SendFilled',
  'settings': 'Settings',
  'status': 'WarningOther',
  'share': 'Share',
  'shopping-cart': 'ShoppingCart',
  'sort': 'SortAscending',
  'sort-ascending': 'SortAscending',
  'sort-descending': 'SortDescending',
  'star': 'Star',
  'star-filled': 'StarFilled',
  'stop': 'Stop',
  'stop-filled': 'StopFilled',
  'store': 'Store',
  'subtract': 'Subtract',
  'sun': 'Sun',
  
  // T
  'table': 'TableSplit',
  'tag': 'Tag',
  'task': 'Task',
  'task-complete': 'TaskComplete',
  'template': 'Template',
  'text': 'TextSelection',
  'text-align-center': 'TextAlignCenter',
  'text-align-justify': 'TextAlignJustify',
  'text-align-left': 'TextAlignLeft',
  'text-align-right': 'TextAlignRight',
  'text-bold': 'TextBold',
  'text-indent': 'TextIndent',
  'text-indent-less': 'TextIndentLess',
  'text-indent-more': 'TextIndentMore',
  'text-italic': 'TextItalic',
  'text-strikethrough': 'TextStrikethrough',
  'text-underline': 'TextUnderline',
  'thumbs-down': 'ThumbsDown',
  'thumbs-up': 'ThumbsUp',
  'time': 'Time',
  'timer': 'Timer',
  'tools': 'Tools',
  'touch': 'Cursor',
  'translate': 'Translate',
  'trash-can': 'TrashCan',
  'trending-up': 'Growth',
  'trophy': 'Trophy',
  
  // U
  'undo': 'Undo',
  'unlock': 'Unlocked',
  'update-now': 'UpdateNow',
  'upload': 'Upload',
  'user': 'User',
  'user-accessibility': 'Accessibility',
  'user-admin': 'UserAdmin',
  'user-avatar': 'UserAvatar',
  'user-filled': 'UserFilled',
  'user-multiple': 'UserMultiple',
  
  // V
  'version': 'VersionPatch',
  'video': 'Video',
  'view': 'View',
  'view-off': 'ViewOff',
  'volume-up': 'VolumeUp',
  'volume-down': 'VolumeDown',
  'volume-mute': 'VolumeMute',
  
  // W
  'warning': 'Warning',
  'warning-alt': 'WarningAlt',
  'warning-filled': 'WarningFilled',
  'watson': 'AiGenerate',
  'wifi': 'Wifi',
  'workflow-automation': 'FlowData',
  
  // Z
  'zip': 'Archive',
  'zoom-fit': 'Maximize',
  'zoom-in': 'Add',
  'zoom-out': 'Subtract',
  
  // Special/Common aliases
  'accessibility': 'Accessibility',
  'activity': 'Activity',
  'meter': 'Meter',
  'model': 'Model',
  'network': 'Network',
  'portfolio': 'Portfolio',
  'progress': 'Progress',
  'progress-bar': 'ProgressBar',
  'rule': 'Rule',
  'schema': 'DataTable',
  'terminal': 'Terminal',
  'workspace': 'Workspace',
};

/**
 * Convert JSX icon name to kebab-case
 * Examples:
 * - Alarm -> alarm
 * - AlarmAdd -> alarm-add
 * - WatsonHealthAiResults -> watson-health-ai-results
 */
export function jsxToKebab(jsxName: string): string {
  return jsxName
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
    .toLowerCase();
}

/**
 * Get Carbon icon export name from JSX notation
 * Example: <Alarm /> -> 'Alarm'
 */
export function getCarbonIconName(jsxIcon: string): string | null {
  // Remove < > and / from JSX notation
  const iconName = jsxIcon.replace(/[<>/\s]/g, '');
  
  // Convert to kebab case for lookup
  const kebabName = jsxToKebab(iconName);
  
  // Check if we have a direct mapping
  if (carbonIconMapping[kebabName]) {
    return carbonIconMapping[kebabName];
  }
  
  // If not found, try the original name (it might already be correct)
  return iconName;
}

/**
 * Helper to add new icon mapping
 */
export function addIconMapping(jsxName: string, carbonExport: string): void {
  const kebabName = jsxToKebab(jsxName);
  carbonIconMapping[kebabName] = carbonExport;
  console.log(`Added icon mapping: '${kebabName}': '${carbonExport}'`);
}