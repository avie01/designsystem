/**
 * MUI Button Component with ODL Theming
 * This is a wrapper around MUI's Button that supports all ODL variants
 */

import React from 'react';
import {
  Button as MuiButton,
  ButtonProps as MuiButtonProps
} from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';

// Extend MUI ButtonProps to include ODL-specific props
export interface ODLMuiButtonProps extends Omit<MuiButtonProps, 'variant' | 'size'> {
  /**
   * ODL button variants
   */
  variant?: 'primary' | 'secondary' | 'tertiary' | 'ghost' | 'destructive' | 'text';
  /**
   * ODL button sizes
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * Show loading state
   */
  loading?: boolean;
  /**
   * Icon to display on the left
   */
  leftIcon?: React.ReactNode;
  /**
   * Icon to display on the right
   */
  rightIcon?: React.ReactNode;
}

// Map ODL variants to MUI variants
const mapVariant = (odlVariant?: string): MuiButtonProps['variant'] => {
  switch (odlVariant) {
    case 'primary':
      return 'contained';
    case 'secondary':
      return 'outlined';
    case 'tertiary':
      return 'tertiary' as any; // Custom variant defined in theme
    case 'ghost':
      return 'ghost' as any; // Custom variant defined in theme
    case 'destructive':
      return 'destructive' as any; // Custom variant defined in theme
    case 'text':
      return 'text';
    default:
      return 'contained';
  }
};

// Spinner rotation animation
const spinAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

// ODL Spinner Component (matches ODL exactly)
const ODLSpinner: React.FC<{ color?: string }> = ({ color = 'currentColor' }) => (
  <svg
    className="mui-button-spinner"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    aria-hidden="true"
    style={{
      width: '16px',
      height: '16px',
      animation: `${spinAnimation} 1s linear infinite`,
      color: color,
    }}
  >
    <circle
      style={{ opacity: 0.25 }}
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      style={{ opacity: 0.75 }}
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
);

// Styled button with loading state support
const StyledButton = styled(MuiButton)<{ loading?: boolean }>(({ loading }) => ({
  position: 'relative',
  '& .MuiButton-startIcon': {
    display: loading ? 'none' : 'inherit',
  },
  '& .MuiButton-endIcon': {
    display: loading ? 'none' : 'inherit',
  },
}));

/**
 * MUI Button with ODL design system styling
 *
 * @example
 * ```tsx
 * // Primary button
 * <Button variant="primary">Click me</Button>
 *
 * // Ghost button with icon
 * <Button variant="ghost" leftIcon={<Icon />}>
 *   Settings
 * </Button>
 *
 * // Loading state
 * <Button variant="primary" loading>
 *   Saving...
 * </Button>
 * ```
 */
export const Button: React.FC<ODLMuiButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  loading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  children,
  ...props
}) => {
  const muiVariant = mapVariant(variant);

  // Determine spinner color based on variant
  const getSpinnerColor = () => {
    if (variant === 'primary' || variant === 'destructive') {
      return '#FFFFFF'; // White for primary/destructive
    }
    return undefined; // Use currentColor for others
  };

  return (
    <StyledButton
      variant={muiVariant}
      size={size}
      disabled={disabled || loading}
      loading={loading}
      startIcon={loading ? <ODLSpinner color={getSpinnerColor()} /> : leftIcon}
      endIcon={!loading ? rightIcon : undefined}
      {...props}
    >
      {children}
    </StyledButton>
  );
};

// Re-export button group components from MUI with ODL naming
export { ButtonGroup } from '@mui/material';
export type { ButtonGroupProps } from '@mui/material';

export default Button;