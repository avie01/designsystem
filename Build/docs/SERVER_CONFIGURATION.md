# ODL Component Library - Development Server Configuration

## Fixed ERR_CONNECTION_REFUSED Issues

### Problem Diagnosis
The development server was starting and showing "ready" messages but was not accessible via browser due to server binding configuration issues.

### Root Causes Identified
1. **Server Binding Issue**: Vite was not properly binding to network interfaces
2. **Input Component API Mismatch**: Test components were using Carbon Design System API (`labelText`, `invalid`) while implementation used custom API (`label`, `error`)
3. **Port Management**: No fallback mechanism for port conflicts

### Solutions Implemented

#### 1. Server Configuration Optimization
**File**: `example/vite.config.ts` and `vite.config.ts`

```typescript
server: {
  port: 3000,
  host: '0.0.0.0', // Explicitly bind to all interfaces (was: true)
  open: true,
  strictPort: false, // Allow fallback to next available port
  cors: true,
},
```

**Changes**:
- Changed `host: true` to `host: '0.0.0.0'` for explicit interface binding
- Added `strictPort: false` to allow port fallback
- Added `cors: true` for better cross-origin support

#### 2. Input Component API Compatibility
**File**: `src/components/Input/Input.tsx`

**Added Legacy API Support**:
```typescript
// Legacy API compatibility (Carbon Design System style)
labelText?: string;  // Alias for label
invalid?: boolean;   // Alias for error
invalidText?: string; // Alias for errorMessage
```

**Implementation**:
```typescript
// Handle legacy API compatibility
const actualLabel = label || labelText;
const actualError = error || invalid || false;
const actualErrorMessage = errorMessage || invalidText;
```

This ensures backward compatibility with existing test components while maintaining the new API.

#### 3. Reliable Server Startup Script
**File**: `start-dev-server.sh`

Features:
- Automatically kills existing Vite processes
- Finds next available port if default is occupied
- Provides clear network access information
- Handles port conflicts gracefully

## Usage

### Quick Start
```bash
npm run example
```

### Reliable Start (with port management)
```bash
./start-dev-server.sh
```

### Testing Different Components
Edit `example/App.tsx` to switch between test components:
```typescript
// return <InputComponentTest />; // Test Input API compatibility
return <ApplicationsPage />; // Test real-world usage
```

## Network Access

The server now binds to all interfaces and is accessible via:
- **Local**: `http://localhost:3000/`
- **Network**: `http://[your-ip]:3000/`

## Port Management

If port 3000 is occupied, the server will:
1. Log the conflict
2. Find next available port (3001, 3002, etc.)
3. Start on the available port
4. Display correct URLs

## Testing ApplicationsPage

The ApplicationsPage demonstrates:
- ✅ Custom Input components with bottom borders
- ✅ Focus states and hover effects
- ✅ Form validation and error states
- ✅ Integration with Table, Button, and Chip components
- ✅ Responsive design and accessibility

## Troubleshooting

### If server still shows ERR_CONNECTION_REFUSED:
1. Check firewall settings
2. Verify no other services on the port
3. Use the startup script: `./start-dev-server.sh`
4. Check network interface: `ipconfig getifaddr en0`

### If Input components don't render properly:
1. Verify CSS imports in `example/styles.css`
2. Check console for TypeScript errors
3. Ensure component exports in `src/index.ts`

## Performance Optimizations

1. **CSS Bundling**: All styles included in single CSS file
2. **Icon Optimization**: Only Carbon icons used, React dependency removed
3. **Build Configuration**: Optimized Rollup config for library builds
4. **Development Speed**: Fast refresh enabled, optimized rebuilds

## Future Improvements

1. **Health Check Endpoint**: Add `/health` endpoint for monitoring
2. **Docker Support**: Containerized development environment
3. **Hot Module Replacement**: Enhanced HMR for component updates
4. **Testing Integration**: Automated component testing in CI/CD