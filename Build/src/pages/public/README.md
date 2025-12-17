# Public Pages

This folder contains all PUBLIC-FACING pages that use ODL components with CUSTOM STYLING.

## Rules:
- Import ODL components as base
- Apply CUSTOM CSS/styles on top
- Override ODL theme with public styles
- Custom designs and layouts
- Public user interface

## Example:
```tsx
import Button from '../../components/Button/Button';
import Table from '../../components/Table/Table';

// ODL component with custom public styling
<Button 
  className="public-button"
  style={{ 
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    fontFamily: 'Custom Font'
  }}
>
  Public Action
</Button>
```