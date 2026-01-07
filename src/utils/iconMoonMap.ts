/**
 * IconMoon Icon Mapping Utility
 * 
 * This file provides a mapping between Carbon icon names (or common icon names)
 * and their corresponding IconMoon font class names.
 * 
 * IconMoon icons use the format: icon-{category}-{name}
 * Example: icon-operations-copy-id, icon-product-excel
 * 
 * HOW TO ADD NEW ICONS:
 * 1. Find the IconMoon class name in src/assets/font/style.css
 * 2. Add entry: 'carbon-icon-name': 'icon-moon-class-name'
 * 3. The Icon component will automatically use the IconMoon font
 */

// Comprehensive mapping of icon names to IconMoon class names
// Format: 'carbon-icon-name': 'icon-moon-class-name'
export const iconMoonMapping: Record<string, string> = {
  // Common UI Icons - Operations
  'add': 'icon-navigation-add',
  'add-alt': 'icon-navigation-add-alt',
  'add-filled': 'icon-navigation-add-filled',
  'close': 'icon-navigation-close',
  'close-filled': 'icon-navigation-close-filled',
  'close-outline': 'icon-navigation-close-outline',
  'checkmark': 'icon-status-checkmark',
  'checkmark-filled': 'icon-status-checkmark-filled',
  'checkmark-outline': 'icon-status-checkmark-outline',
  'edit': 'icon-format-edit',
  'delete': 'icon-file-document-subtract',
  'trash-can': 'icon-file-document-subtract',
  'copy': 'icon-operations-copy-id',
  'copy-file': 'icon-file-copy-file',
  'download': 'icon-file-download',
  'upload': 'icon-file-upload',
  'save': 'icon-format-save',
  'search': 'icon-operations-search',
  'settings': 'icon-controls-settings',
  'menu': 'icon-navigation-menu',
  'overflow-menu-horizontal': 'icon-navigation-overflow-menu-horizontal',
  'overflow-menu-vertical': 'icon-navigation-overflow-menu-vertical',
  'notification': 'icon-toggle-notification',
  'notification-new': 'icon-toggle-notification-new',
  'user': 'icon-user',
  'user-multiple': 'icon-user-multiple',
  'user-admin': 'icon-user-admin',
  'user-avatar': 'icon-user-avatar',
  'information': 'icon-status-information',
  'information-filled': 'icon-status-information-filled',
  'help': 'icon-status-help',
  'help-filled': 'icon-status-help-filled',
  'warning': 'icon-status-warning',
  'warning-filled': 'icon-status-warning-filled',
  'warning-alt': 'icon-status-warning-alt',
  'error': 'icon-status-error',
  'error-filled': 'icon-status-error-filled',
  
  // File/Document Icons
  'folder': 'icon-file-folder',
  'folder-open': 'icon-file-folder-open',
  'folder-add': 'icon-file-folder-add',
  'document': 'icon-file-document',
  'file': 'icon-file-document',
  'document-pdf': 'icon-file-document-pdf',
  'pdf': 'icon-file-document-pdf',
  'excel': 'icon-product-excel',
  'xls': 'icon-product-excel',
  'word': 'icon-product-word',
  'powerpoint': 'icon-product-powerpoint',
  'ppt': 'icon-product-powerpoint',
  
  // Navigation Icons
  'arrow-up': 'icon-navigation-arrow-up',
  'arrow-down': 'icon-navigation-arrow-down',
  'arrow-left': 'icon-navigation-arrow-left',
  'arrow-right': 'icon-navigation-arrow-right',
  'chevron-up': 'icon-navigation-chevron-up',
  'chevron-down': 'icon-navigation-chevron-down',
  'chevron-left': 'icon-navigation-chevron-left',
  'chevron-right': 'icon-navigation-chevron-right',
  'caret-up': 'icon-navigation-caret-up',
  'caret-down': 'icon-navigation-caret-down',
  'caret-left': 'icon-navigation-caret-left',
  'caret-right': 'icon-navigation-caret-right',
  
  // Status Icons
  'star': 'icon-toggle-star',
  'star-filled': 'icon-toggle-star-filled',
  'bookmark': 'icon-operations-bookmark',
  'bookmark-filled': 'icon-operations-bookmark-filled',
  
  // System Icons
  'full-screen': 'icon-system-full-screen',
  'exit-full-screen': 'icon-system-exit-full-screen',
  'ai': 'icon-system-ai-alternative',
  'ai-generate': 'icon-system-ai-alternative',
  'ai-label': 'icon-health-ai-results',
  
  // Additional Common Icons
  'filter': 'icon-operations-filter-edit',
  'share': 'icon-operations-send',
  'send': 'icon-operations-send',
  'send-filled': 'icon-operations-send-filled',
  'calendar': 'icon-time-calendar-add',
  'time': 'icon-time-alarm-add',
  'analytics': 'icon-data-chart-error-bar',
  'chart-line': 'icon-data-chart-error-bar',
  'chart-bar': 'icon-data-chart-error-bar',
  'renew': 'icon-operations-update-now',
  'refresh': 'icon-operations-restart',
  'play': 'icon-operations-run',
  'pause': 'icon-operations-pause',
  'stop': 'icon-operations-stop',
  'view': 'icon-file-document-view',
  'cloud': 'icon-tech-cloud-download',
  'cloud-download': 'icon-tech-cloud-download',
  'email': 'icon-tech-email',
  'shopping-cart': 'icon-commerce-shopping-cart-arrow-down',
  'growth': 'icon-catalog-growth',
  'revenue': 'icon-catalog-revenue',
  'data-table': 'icon-data-table-edit',
  'play-filled': 'icon-operations-run',
  'version': 'icon-file-version',
  
  // Note: More icons can be added as needed. There are 2158 IconMoon icons available.
  // To find available icons, use: grep -E '^\.icon-' src/assets/font/style.css | sed 's/:before.*//' | sed 's/^\.//'
};

/**
 * Get IconMoon class name from icon name
 * Returns the IconMoon class name if found, otherwise returns null
 */
export function getIconMoonClassName(iconName: string): string | null {
  // Direct mapping lookup
  if (iconMoonMapping[iconName]) {
    return iconMoonMapping[iconName];
  }
  
  // Try kebab-case conversion
  const kebabName = iconName
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
    .toLowerCase();
  
  if (iconMoonMapping[kebabName]) {
    return iconMoonMapping[kebabName];
  }
  
  // Try to find a matching IconMoon icon by pattern matching
  // This is a fallback - you may need to add specific mappings
  const possibleMatch = `icon-${kebabName}`;
  
  // Check if this class exists (would need to check against actual IconMoon classes)
  // For now, return null to indicate no match found
  return null;
}

/**
 * Helper to add new icon mapping
 */
export function addIconMoonMapping(iconName: string, iconMoonClass: string): void {
  iconMoonMapping[iconName] = iconMoonClass;
  console.log(`Added IconMoon mapping: '${iconName}': '${iconMoonClass}'`);
}

