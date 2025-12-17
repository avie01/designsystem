import React, { useState } from 'react';
import Icon from '../components/Icon/Icon';
import BackToTop from '../components/BackToTop/BackToTop';

const ImportGuide: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('quick-start');
  const [copiedCode, setCopiedCode] = useState<string>('');

  const handleCopyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(''), 2000);
  };

  const codeExamples = {
    button: `const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'medium',
  onClick 
}) => {
  const baseStyles = {
    padding: size === 'small' ? '8px 16px' : '12px 24px',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer',
    fontSize: size === 'small' ? '14px' : '16px',
  };

  const variantStyles = {
    primary: {
      backgroundColor: '#0F62FE',
      color: 'white',
    },
    secondary: {
      backgroundColor: '#F4F4F4',
      color: '#161616',
    },
    danger: {
      backgroundColor: '#DA1E28',
      color: 'white',
    },
  };

  return (
    <button
      style={{ ...baseStyles, ...variantStyles[variant] }}
      onClick={onClick}
    >
      {children}
    </button>
  );
};`,
    buttonUsage: `function MyApp() {
  return (
    <div>
      <Button variant="primary" size="medium" onClick={() => alert('Clicked!')}>
        Click Me
      </Button>
      
      <Button variant="danger" size="small">
        Delete
      </Button>
    </div>
  );
}`,
    avatarUsage: `// Basic avatar
<UserAvatar 
  user={{ name: 'John Doe' }} 
/>

// With status indicator
<UserAvatar 
  user={{ 
    name: 'Jane Smith',
    status: 'online' 
  }}
  showStatus={true}
/>

// Different sizes
<UserAvatar user={user} size="small" />   // 24px
<UserAvatar user={user} size="medium" />  // 32px (default)
<UserAvatar user={user} size="large" />   // 40px
<UserAvatar user={user} size="xlarge" />  // 64px`,
    customVariants: `const variantStyles = {
  primary: { backgroundColor: '#0F62FE', color: 'white' },
  secondary: { backgroundColor: '#F4F4F4', color: '#161616' },
  danger: { backgroundColor: '#DA1E28', color: 'white' },
  // Add your custom variants
  success: { backgroundColor: '#24A148', color: 'white' },
  warning: { backgroundColor: '#F1C21B', color: '#161616' },
};

// Now you can use them:
<Button variant="success">Save</Button>
<Button variant="warning">Caution</Button>`,
    profileCard: `import Button from './components/Button';
import Card from './components/Card';
import UserAvatar from './components/UserAvatar';

function UserProfileCard({ user }) {
  return (
    <Card>
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        <UserAvatar 
          user={user} 
          size="large"
          showStatus={true}
        />
        <div>
          <h3>{user.name}</h3>
          <p>{user.role}</p>
        </div>
      </div>
      <div style={{ marginTop: '16px', display: 'flex', gap: '8px' }}>
        <Button variant="primary" size="small">
          View Profile
        </Button>
        <Button variant="secondary" size="small">
          Send Message
        </Button>
      </div>
    </Card>
  );
}`
  };

  const sections = [
    { id: 'quick-start', label: 'Quick Start', icon: '🚀' },
    { id: 'find-components', label: 'Find Components', icon: '📋' },
    { id: 'copy-code', label: 'Copy Code', icon: '📦' },
    { id: 'customize', label: 'Customize Variants', icon: '🎨' },
    { id: 'organize', label: 'Organize', icon: '📁' },
    { id: 'troubleshooting', label: 'Troubleshooting', icon: '🆘' },
    { id: 'examples', label: 'Examples', icon: '📚' },
  ];

  const componentLinks = [
    { name: 'Buttons', path: '/button-demo.html', description: 'Interactive buttons with variants' },
    { name: 'Cards', path: '/cards-demo.html', description: 'Content containers' },
    { name: 'Tables', path: '/table-demo.html', description: 'Data tables with sorting' },
    { name: 'Inputs', path: '/input-demo.html', description: 'Form input fields' },
    { name: 'Dropdowns', path: '/dropdown-demo.html', description: 'Select menus' },
    { name: 'Tabs', path: '/tabs-demo.html', description: 'Tabbed interfaces' },
    { name: 'User Avatars', path: '/user-avatar-demo.html', description: 'Profile pictures' },
    { name: 'Navigation Rail', path: '/navigation-rail-demo.html', description: 'Sidebar navigation' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#f9fafb' }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
        color: 'white',
        padding: '3rem 2rem',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <a 
              href="/components-showcase.html" 
              style={{ 
                color: 'white', 
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                opacity: 0.8,
                fontSize: '14px'
              }}
            >
              ← Back to Component Library
            </a>
          </div>
          <h1 style={{ fontSize: '3rem', fontWeight: 700, marginBottom: '1rem' }}>
            📚 Component Import Guide
          </h1>
          <p style={{ fontSize: '1.25rem', opacity: 0.95, lineHeight: 1.6 }}>
            Learn how to copy and use ODL components in your own projects
          </p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div style={{
        background: 'white',
        borderBottom: '1px solid #e5e7eb',
        position: 'sticky',
        top: 0,
        zIndex: 10,
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', gap: 0, overflowX: 'auto' }}>
          {sections.map(section => (
            <button
              key={section.id}
              onClick={() => {
                setActiveSection(section.id);
                document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              style={{
                padding: '1rem 1.5rem',
                background: activeSection === section.id ? 'linear-gradient(135deg, #059669, #047857)' : 'transparent',
                color: activeSection === section.id ? 'white' : '#374151',
                border: 'none',
                borderBottom: activeSection === section.id ? '3px solid #059669' : '3px solid transparent',
                cursor: 'pointer',
                fontSize: '0.95rem',
                fontWeight: 600,
                transition: 'all 0.3s ease',
                whiteSpace: 'nowrap',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <span>{section.icon}</span>
              {section.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 2rem' }}>
        
        {/* Quick Start Section */}
        <section id="quick-start" style={{ marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 600, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            🚀 Quick Start - Copy & Paste Components
          </h2>
          <div style={{
            background: 'white',
            padding: '2rem',
            borderRadius: '12px',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
          }}>
            <p style={{ fontSize: '1.125rem', lineHeight: 1.8, color: '#374151', marginBottom: '1.5rem' }}>
              The ODL Library components are designed to be <strong>copied directly</strong> into your project. 
              This gives you full control and customization without dependencies.
            </p>
            <div style={{
              background: '#f0fdf4',
              border: '1px solid #86efac',
              borderRadius: '8px',
              padding: '1rem 1.25rem',
              marginTop: '1rem'
            }}>
              <p style={{ color: '#166534', fontWeight: 500 }}>
                ✅ <strong>No npm install required</strong> - Just copy the code you need!
              </p>
            </div>
          </div>
        </section>

        {/* Find Components Section */}
        <section id="find-components" style={{ marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 600, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            📋 Step 1: Find the Component You Need
          </h2>
          <div style={{
            background: 'white',
            padding: '2rem',
            borderRadius: '12px',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
          }}>
            <p style={{ fontSize: '1rem', color: '#6b7280', marginBottom: '1.5rem' }}>
              Browse these demo pages to see all available components:
            </p>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
              gap: '1rem'
            }}>
              {componentLinks.map(link => (
                <a
                  key={link.path}
                  href={link.path}
                  target="_blank"
                  style={{
                    display: 'block',
                    padding: '1rem',
                    background: '#f9fafb',
                    borderRadius: '8px',
                    border: '1px solid #e5e7eb',
                    textDecoration: 'none',
                    transition: 'all 0.2s ease',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div style={{ fontWeight: 600, color: '#111827', marginBottom: '0.25rem' }}>
                    {link.name}
                  </div>
                  <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                    {link.description}
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Copy Code Section */}
        <section id="copy-code" style={{ marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 600, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            📦 Step 2: Copy the Component Code
          </h2>
          
          {/* Button Example */}
          <div style={{
            background: 'white',
            padding: '2rem',
            borderRadius: '12px',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
            marginBottom: '2rem'
          }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem' }}>
              Example: Simple Button Component
            </h3>
            <ol style={{ marginLeft: '1.5rem', marginBottom: '1.5rem', lineHeight: 1.8 }}>
              <li>Go to <code style={{ background: '#f3f4f6', padding: '2px 6px', borderRadius: '4px' }}>/src/pages/ButtonDemo.tsx</code></li>
              <li>Find the Button component (around line 10-50)</li>
              <li>Copy the entire component:</li>
            </ol>
            
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => handleCopyCode(codeExamples.button, 'button')}
                style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  padding: '0.5rem 1rem',
                  background: copiedCode === 'button' ? '#059669' : '#3b82f6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  zIndex: 1
                }}
              >
                <Icon name={copiedCode === 'button' ? 'checkmark' : 'copy'} size={16} />
                {copiedCode === 'button' ? 'Copied!' : 'Copy Code'}
              </button>
              <pre style={{
                background: '#1e293b',
                color: '#e2e8f0',
                padding: '1.5rem',
                borderRadius: '8px',
                overflow: 'auto',
                fontSize: '0.875rem',
                lineHeight: 1.6
              }}>
                <code>{codeExamples.button}</code>
              </pre>
            </div>

            <h4 style={{ fontSize: '1.125rem', fontWeight: 600, marginTop: '2rem', marginBottom: '1rem' }}>
              Use it in your component:
            </h4>
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => handleCopyCode(codeExamples.buttonUsage, 'buttonUsage')}
                style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  padding: '0.5rem 1rem',
                  background: copiedCode === 'buttonUsage' ? '#059669' : '#3b82f6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  zIndex: 1
                }}
              >
                <Icon name={copiedCode === 'buttonUsage' ? 'checkmark' : 'copy'} size={16} />
                {copiedCode === 'buttonUsage' ? 'Copied!' : 'Copy Code'}
              </button>
              <pre style={{
                background: '#1e293b',
                color: '#e2e8f0',
                padding: '1.5rem',
                borderRadius: '8px',
                overflow: 'auto',
                fontSize: '0.875rem',
                lineHeight: 1.6
              }}>
                <code>{codeExamples.buttonUsage}</code>
              </pre>
            </div>
          </div>

          {/* Avatar Example */}
          <div style={{
            background: 'white',
            padding: '2rem',
            borderRadius: '12px',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
          }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem' }}>
              Example: User Avatar with Variants
            </h3>
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => handleCopyCode(codeExamples.avatarUsage, 'avatarUsage')}
                style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  padding: '0.5rem 1rem',
                  background: copiedCode === 'avatarUsage' ? '#059669' : '#3b82f6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  zIndex: 1
                }}
              >
                <Icon name={copiedCode === 'avatarUsage' ? 'checkmark' : 'copy'} size={16} />
                {copiedCode === 'avatarUsage' ? 'Copied!' : 'Copy Code'}
              </button>
              <pre style={{
                background: '#1e293b',
                color: '#e2e8f0',
                padding: '1.5rem',
                borderRadius: '8px',
                overflow: 'auto',
                fontSize: '0.875rem',
                lineHeight: 1.6
              }}>
                <code>{codeExamples.avatarUsage}</code>
              </pre>
            </div>
          </div>
        </section>

        {/* Customize Section */}
        <section id="customize" style={{ marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 600, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            🎨 Step 3: Customize Variants
          </h2>
          <div style={{
            background: 'white',
            padding: '2rem',
            borderRadius: '12px',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
          }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem' }}>
              Common Variant Props
            </h3>
            <table style={{
              width: '100%',
              borderCollapse: 'collapse',
              marginBottom: '2rem'
            }}>
              <thead>
                <tr style={{ background: '#f9fafb', borderBottom: '2px solid #e5e7eb' }}>
                  <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: 600 }}>Prop</th>
                  <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: 600 }}>Options</th>
                  <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: 600 }}>What it does</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                  <td style={{ padding: '0.75rem' }}><code>variant</code></td>
                  <td style={{ padding: '0.75rem' }}>'primary', 'secondary', 'danger', etc.</td>
                  <td style={{ padding: '0.75rem' }}>Changes colors/style</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                  <td style={{ padding: '0.75rem' }}><code>size</code></td>
                  <td style={{ padding: '0.75rem' }}>'small', 'medium', 'large'</td>
                  <td style={{ padding: '0.75rem' }}>Changes component size</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                  <td style={{ padding: '0.75rem' }}><code>disabled</code></td>
                  <td style={{ padding: '0.75rem' }}>true/false</td>
                  <td style={{ padding: '0.75rem' }}>Disables interaction</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                  <td style={{ padding: '0.75rem' }}><code>icon</code></td>
                  <td style={{ padding: '0.75rem' }}>Icon name</td>
                  <td style={{ padding: '0.75rem' }}>Adds an icon</td>
                </tr>
              </tbody>
            </table>

            <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem' }}>
              Creating Your Own Variants
            </h3>
            <p style={{ marginBottom: '1rem', color: '#6b7280' }}>
              You can easily modify the copied component to add your own variants:
            </p>
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => handleCopyCode(codeExamples.customVariants, 'customVariants')}
                style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  padding: '0.5rem 1rem',
                  background: copiedCode === 'customVariants' ? '#059669' : '#3b82f6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  zIndex: 1
                }}
              >
                <Icon name={copiedCode === 'customVariants' ? 'checkmark' : 'copy'} size={16} />
                {copiedCode === 'customVariants' ? 'Copied!' : 'Copy Code'}
              </button>
              <pre style={{
                background: '#1e293b',
                color: '#e2e8f0',
                padding: '1.5rem',
                borderRadius: '8px',
                overflow: 'auto',
                fontSize: '0.875rem',
                lineHeight: 1.6
              }}>
                <code>{codeExamples.customVariants}</code>
              </pre>
            </div>
          </div>
        </section>

        {/* Organize Section */}
        <section id="organize" style={{ marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 600, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            📁 Step 4: Organize Your Components
          </h2>
          <div style={{
            background: 'white',
            padding: '2rem',
            borderRadius: '12px',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
          }}>
            <p style={{ marginBottom: '1.5rem' }}>Create a components folder in your project:</p>
            <pre style={{
              background: '#f9fafb',
              border: '1px solid #e5e7eb',
              padding: '1.5rem',
              borderRadius: '8px',
              fontSize: '0.875rem',
              lineHeight: 1.8
            }}>
{`your-project/
├── src/
│   ├── components/
│   │   ├── Button.tsx      (copied from ODL)
│   │   ├── Card.tsx        (copied from ODL)
│   │   ├── UserAvatar.tsx  (copied from ODL)
│   │   └── Table.tsx       (copied from ODL)
│   └── App.tsx`}
            </pre>

            <div style={{
              background: '#fef3c7',
              border: '1px solid #fbbf24',
              borderRadius: '8px',
              padding: '1rem 1.25rem',
              marginTop: '1.5rem'
            }}>
              <p style={{ color: '#92400e', fontWeight: 500 }}>
                💡 <strong>Pro Tip:</strong> Some components need the Icon component. Copy it from{' '}
                <code style={{ background: '#fef3c7', padding: '2px 4px' }}>/src/components/Icon/Icon.tsx</code>
              </p>
            </div>
          </div>
        </section>

        {/* Troubleshooting Section */}
        <section id="troubleshooting" style={{ marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 600, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            🆘 Troubleshooting
          </h2>
          <div style={{
            background: 'white',
            padding: '2rem',
            borderRadius: '12px',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
          }}>
            <div style={{ marginBottom: '1.5rem' }}>
              <h4 style={{ fontWeight: 600, marginBottom: '0.5rem' }}>Component looks different?</h4>
              <ul style={{ marginLeft: '1.5rem', color: '#6b7280' }}>
                <li>Make sure you copied all the styles</li>
                <li>Check if you need to copy the Icon component too</li>
              </ul>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h4 style={{ fontWeight: 600, marginBottom: '0.5rem' }}>TypeScript errors?</h4>
              <ul style={{ marginLeft: '1.5rem', color: '#6b7280' }}>
                <li>Copy the interface definitions too (usually at the top of the component)</li>
                <li>Or change the file extension to `.jsx` instead of `.tsx`</li>
              </ul>
            </div>

            <div>
              <h4 style={{ fontWeight: 600, marginBottom: '0.5rem' }}>Missing icons?</h4>
              <ul style={{ marginLeft: '1.5rem', color: '#6b7280' }}>
                <li>Install Carbon icons: <code style={{ background: '#f3f4f6', padding: '2px 6px', borderRadius: '4px' }}>npm install @carbon/icons-react</code></li>
                <li>Copy the Icon component from <code style={{ background: '#f3f4f6', padding: '2px 6px', borderRadius: '4px' }}>/src/components/Icon/Icon.tsx</code></li>
              </ul>
            </div>
          </div>
        </section>

        {/* Complete Example Section */}
        <section id="examples" style={{ marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 600, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            📚 Complete Example: Building a User Profile Card
          </h2>
          <div style={{
            background: 'white',
            padding: '2rem',
            borderRadius: '12px',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
          }}>
            <p style={{ marginBottom: '1.5rem', color: '#6b7280' }}>
              Here's how to combine multiple components to create something more complex:
            </p>
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => handleCopyCode(codeExamples.profileCard, 'profileCard')}
                style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  padding: '0.5rem 1rem',
                  background: copiedCode === 'profileCard' ? '#059669' : '#3b82f6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  zIndex: 1
                }}
              >
                <Icon name={copiedCode === 'profileCard' ? 'checkmark' : 'copy'} size={16} />
                {copiedCode === 'profileCard' ? 'Copied!' : 'Copy Code'}
              </button>
              <pre style={{
                background: '#1e293b',
                color: '#e2e8f0',
                padding: '1.5rem',
                borderRadius: '8px',
                overflow: 'auto',
                fontSize: '0.875rem',
                lineHeight: 1.6
              }}>
                <code>{codeExamples.profileCard}</code>
              </pre>
            </div>
          </div>
        </section>

        {/* Next Steps */}
        <section style={{
          background: 'linear-gradient(135deg, #059669, #047857)',
          color: 'white',
          padding: '3rem',
          borderRadius: '16px',
          textAlign: 'center'
        }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 600, marginBottom: '1rem' }}>
            🚀 Next Steps
          </h2>
          <ol style={{
            maxWidth: '600px',
            margin: '0 auto',
            textAlign: 'left',
            lineHeight: 2,
            fontSize: '1.125rem'
          }}>
            <li>Browse all demo pages to see available components</li>
            <li>Start with 2-3 simple components</li>
            <li>Copy and customize them for your needs</li>
            <li>Combine components to build complex UIs</li>
            <li>Modify styles and variants as needed</li>
          </ol>
          <p style={{
            marginTop: '2rem',
            fontSize: '1.125rem',
            opacity: 0.95
          }}>
            Remember: These components are meant to be <strong>copied and customized</strong>.<br />
            Don't be afraid to modify them to fit your exact needs!
          </p>
        </section>
      </div>

      <BackToTop />
    </div>
  );
};

export default ImportGuide;