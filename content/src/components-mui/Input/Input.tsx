/**
 * MUI TextField Component with ODL Theming
 * This wraps MUI's TextField to match ODL Input design exactly
 */

import React from 'react';
import { TextField, TextFieldProps } from '@mui/material';
import { styled } from '@mui/material/styles';

// ODL-styled TextField
const ODLTextField = styled(TextField)(() => ({
  '& .MuiInputLabel-root': {
    position: 'static',
    transform: 'none',
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '1.125rem',
    color: '#161616',
    marginBottom: '8px',

    '&.MuiInputLabel-shrink': {
      transform: 'none',
    },
  },
}));

export interface ODLInputProps extends Omit<TextFieldProps, 'variant'> {
  /**
   * Input size variant
   */
  inputSize?: 'small' | 'medium' | 'large';
}

/**
 * MUI TextField with ODL Input styling
 *
 * @example
 * ```tsx
 * <Input
 *   label="Email Address"
 *   placeholder="Enter your email"
 *   value={email}
 *   onChange={(e) => setEmail(e.target.value)}
 * />
 * ```
 */
export const Input: React.FC<ODLInputProps> = ({
  inputSize = 'medium',
  label,
  required,
  error,
  helperText,
  ...props
}) => {
  // Map ODL size to MUI size
  const muiSize = inputSize === 'small' ? 'small' : 'medium';

  return (
    <ODLTextField
      variant="standard"
      size={muiSize}
      label={label && (
        <span>
          {label}
          {required && <span style={{ color: '#DA1E28' }}> *</span>}
        </span>
      )}
      error={error}
      helperText={helperText}
      fullWidth
      {...props}
    />
  );
};

export default Input;