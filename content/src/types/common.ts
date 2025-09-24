// Common type definitions to replace 'any' usage across the library

/**
 * Base interface for objects with an identifier
 */
export interface Identifiable {
  id: string | number;
}

/**
 * Base interface for table row data
 */
export interface TableRowData extends Identifiable {
  [key: string]: unknown;
}

/**
 * Generic data item with flexible properties
 */
export interface DataItem extends Record<string, unknown> {
  id: string | number;
}

/**
 * Sort configuration for tables and lists
 */
export interface SortConfig<T = string> {
  key: T;
  direction: 'asc' | 'desc';
}

/**
 * Filter configuration
 */
export interface FilterConfig {
  [key: string]: string | number | boolean | undefined;
}

/**
 * Pagination configuration
 */
export interface PaginationConfig {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages?: number;
}

/**
 * Generic API response wrapper
 */
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  error?: string;
  message?: string;
}

/**
 * Form field value types
 */
export type FormValue = string | number | boolean | Date | null | undefined;

/**
 * Form data structure
 */
export interface FormData {
  [key: string]: FormValue | FormValue[] | FormData;
}

/**
 * Generic event handler types
 */
export type ClickHandler<T = HTMLElement> = (event: React.MouseEvent<T>) => void;
export type ChangeHandler<T = HTMLInputElement> = (event: React.ChangeEvent<T>) => void;
export type KeyboardHandler<T = HTMLElement> = (event: React.KeyboardEvent<T>) => void;
export type FocusHandler<T = HTMLElement> = (event: React.FocusEvent<T>) => void;

/**
 * Component size variants
 */
export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * Component variant types
 */
export type Variant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';

/**
 * Component status types
 */
export type Status = 'idle' | 'loading' | 'success' | 'error' | 'disabled';

/**
 * Theme types
 */
export type ThemeMode = 'light' | 'dark' | 'auto';

/**
 * Navigation item structure
 */
export interface NavigationItem {
  id: string;
  label: string;
  path?: string;
  icon?: string;
  children?: NavigationItem[];
  disabled?: boolean;
  badge?: string | number;
}

/**
 * User information structure
 */
export interface User {
  id: string | number;
  name: string;
  email?: string;
  avatar?: string;
  role?: string;
  permissions?: string[];
}

/**
 * Option for select/dropdown components
 */
export interface SelectOption<T = string> {
  value: T;
  label: string;
  disabled?: boolean;
  group?: string;
}

/**
 * Tree node structure
 */
export interface TreeNodeData<T = unknown> {
  id: string | number;
  label: string;
  children?: TreeNodeData<T>[];
  data?: T;
  expanded?: boolean;
  selected?: boolean;
  disabled?: boolean;
}

/**
 * Notification/Alert structure
 */
export interface Notification {
  id: string | number;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message?: string;
  timestamp?: Date | string;
  duration?: number;
  dismissible?: boolean;
}

/**
 * File/Document structure
 */
export interface FileData {
  id: string | number;
  name: string;
  size?: number;
  type?: string;
  url?: string;
  uploadedAt?: Date | string;
  uploadedBy?: string | User;
}

/**
 * Department data structure
 */
export interface Department extends TableRowData {
  id: string;
  name: string;
  director: string;
  documents: number;
  activeWorkflows: number;
  clearanceLevel: string;
  lastActivity: string;
}

/**
 * Workflow data structure
 */
export interface Workflow {
  id: string;
  title: string;
  workflow: string;
  status: string;
  documents: number;
  priority: string;
  assignedTo: string;
  lastUpdated: string;
}

/**
 * Security Alert data structure
 */
export interface SecurityAlert {
  id: string;
  alertType: string;
  severity: string; // Allow any string for flexibility
  status: string;
  department: string;
  affectedSystems: number;
  assignedTo: string;
  lastUpdated: string;
}

/**
 * Document data structure
 */
export interface Document {
  id: string;
  title: string;
  classification: string;
  type?: string; // Make optional since some documents don't have this
  department: string;
  status: string;
  accessLevel: string;
  clearance?: string;
  lastModified: string;
  size?: string;
  owner?: string;
  auditTrail?: AuditEntry[];
  disposalSchedule?: string; // Add this for TotalDocumentsDemo
}

/**
 * Audit trail entry
 */
export interface AuditEntry {
  action: string;
  user: string;
  timestamp: string;
  details?: string;
}

/**
 * Table column definition with proper typing
 */
export interface TableColumn<T = TableRowData> {
  key: string;
  header: string;
  sortable?: boolean;
  width?: string;
  render?: (item: T) => React.ReactNode;
}

/**
 * Generic props for icon components
 */
export interface IconProps {
  name: string;
  className?: string;
  size?: number;
  color?: string;
  [key: string]: unknown;
}

/**
 * Type guard functions
 */
export function isIdentifiable(value: unknown): value is Identifiable {
  return (
    typeof value === 'object' &&
    value !== null &&
    'id' in value &&
    (typeof (value as any).id === 'string' || typeof (value as any).id === 'number')
  );
}

export function isTableRowData(value: unknown): value is TableRowData {
  return isIdentifiable(value);
}

export function isUser(value: unknown): value is User {
  return (
    typeof value === 'object' &&
    value !== null &&
    'id' in value &&
    'name' in value &&
    typeof (value as any).name === 'string'
  );
}

export function isNotification(value: unknown): value is Notification {
  return (
    typeof value === 'object' &&
    value !== null &&
    'id' in value &&
    'type' in value &&
    'title' in value &&
    typeof (value as any).title === 'string'
  );
}

export function isDepartment(value: unknown): value is Department {
  return (
    typeof value === 'object' &&
    value !== null &&
    'id' in value &&
    'name' in value &&
    'director' in value &&
    typeof (value as any).name === 'string'
  );
}

export function isDocument(value: unknown): value is Document {
  return (
    typeof value === 'object' &&
    value !== null &&
    'id' in value &&
    'title' in value &&
    typeof (value as any).title === 'string'
  );
}