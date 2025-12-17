/**
 * MUI Components with ODL Theming
 *
 * This index exports all MUI-based components that have been themed
 * to match the ODL design system.
 *
 * Usage:
 * ```ts
 * import { Button, TextField } from '@odl/components-mui';
 * ```
 */

// Button component
export { Button, ButtonGroup } from './Button';
export type { ODLMuiButtonProps, ButtonGroupProps } from './Button';

// Re-export commonly used MUI components that work well with ODL theme
export {
  // Layout
  Box,
  Container,
  Grid,
  Stack,

  // Surfaces
  Card,
  CardContent,
  CardActions,
  CardHeader,
  Paper,

  // Navigation
  AppBar,
  Toolbar,
  Drawer,
  Tabs,
  Tab,

  // Inputs
  TextField,
  Checkbox,
  Radio,
  RadioGroup,
  FormControlLabel,
  Select,
  MenuItem,
  Switch,

  // Display
  Chip,
  Avatar,
  Badge,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,

  // Feedback
  Alert,
  Snackbar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  LinearProgress,
  Skeleton,

  // Typography
  Typography,

  // Utils
  Divider,
  Tooltip,
  IconButton,

} from '@mui/material';

// Export theme provider
export { ODLThemeProvider } from '../theme/ODLThemeProvider';
export { odlMuiTheme } from '../theme/muiTheme';

// Export MUI icons (commonly used ones)
export {
  Add as AddIcon,
  Close as CloseIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Search as SearchIcon,
  Settings as SettingsIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  Menu as MenuIcon,
  MoreVert as MoreVertIcon,
  Check as CheckIcon,
  Clear as ClearIcon,
  Info as InfoIcon,
  Warning as WarningIcon,
  Error as ErrorIcon,
  CheckCircle as CheckCircleIcon,
} from '@mui/icons-material';