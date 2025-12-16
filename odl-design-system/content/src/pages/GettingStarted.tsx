import React from 'react';
import Icon from '../components/Icon/Icon';

export default function GettingStarted() {
  return (
    <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: '60px' }}>
        <h1 style={{ fontSize: '48px', fontWeight: 700, margin: '0 0 16px 0', color: '#1a1a1a' }}>
          ODL Design System
        </h1>
        <p style={{ fontSize: '20px', color: '#666', margin: 0 }}>
          A comprehensive React component library for building modern, accessible web applications
        </p>
      </div>

      {/* Quick Links */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px', marginBottom: '60px' }}>
        <a
          href="https://github.com/steamfrog2012/ODL-Library"
          style={{
            padding: '24px',
            background: '#f5f5f5',
            borderRadius: '8px',
            textDecoration: 'none',
            border: '1px solid #e0e0e0',
            transition: 'all 0.3s',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = 'none';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <Icon name="github" size={24} />
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 600 }}>GitHub Repository</h3>
          </div>
          <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>
            View source code on GitHub
          </p>
        </a>

        <a
          href="https://content-39edbyv6y-steamfrog2012s-projects.vercel.app"
          style={{
            padding: '24px',
            background: '#f5f5f5',
            borderRadius: '8px',
            textDecoration: 'none',
            border: '1px solid #e0e0e0',
            transition: 'all 0.3s',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = 'none';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <Icon name="cloud" size={24} />
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 600 }}>Vercel Deployment</h3>
          </div>
          <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>
            Live Storybook on Vercel
          </p>
        </a>

        <div
          style={{
            padding: '24px',
            background: '#f5f5f5',
            borderRadius: '8px',
            border: '1px solid #e0e0e0'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <Icon name="document" size={24} />
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 600 }}>53 Components</h3>
          </div>
          <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>
            WCAG 2.1 Level AA compliant
          </p>
        </div>
      </div>

      {/* Using in Claude Code */}
      <section style={{ marginBottom: '60px', background: '#f9f9f9', padding: '32px', borderRadius: '8px' }}>
        <h2 style={{ fontSize: '28px', fontWeight: 600, marginTop: 0, marginBottom: '24px', color: '#1a1a1a' }}>
          Using in Claude Code
        </h2>

        <div style={{ background: 'white', padding: '24px', borderRadius: '8px', border: '1px solid #e0e0e0', marginBottom: '24px' }}>
          <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: 600 }}>Quick Reference</h3>
          <p style={{ margin: '0 0 12px 0', fontSize: '14px', color: '#333' }}>
            When using Claude Code with ODL Design System components, provide this context:
          </p>
          <pre style={{
            background: '#f0f0f0',
            padding: '16px',
            borderRadius: '6px',
            overflow: 'auto',
            fontSize: '13px',
            margin: '12px 0 0 0'
          }}>
{`I'm using the ODL Design System:
- GitHub: github.com/steamfrog2012/ODL-Library
- Branch: 003-complete-wcag-aa
- Import from: @odl/design-system
- Storybook: https://content-39edbyv6y-steamfrog2012s-projects.vercel.app`}
          </pre>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
          <div style={{ background: 'white', padding: '24px', borderRadius: '8px', border: '1px solid #e0e0e0' }}>
            <h3 style={{ margin: '0 0 12px 0', fontSize: '16px', fontWeight: 600 }}>Option 1: Reference GitHub</h3>
            <p style={{ margin: '0 0 12px 0', fontSize: '14px', color: '#666' }}>
              Tell Claude Code to read components from the GitHub repository. I can explore and understand the component APIs from the source code.
            </p>
            <code style={{ background: '#f0f0f0', padding: '8px 12px', borderRadius: '4px', fontSize: '13px' }}>
              Read Button from ODL Design System
            </code>
          </div>

          <div style={{ background: 'white', padding: '24px', borderRadius: '8px', border: '1px solid #e0e0e0' }}>
            <h3 style={{ margin: '0 0 12px 0', fontSize: '16px', fontWeight: 600 }}>Option 2: Reference Storybook</h3>
            <p style={{ margin: '0 0 12px 0', fontSize: '14px', color: '#666' }}>
              Direct Claude Code to check the live Storybook for component stories and usage examples.
            </p>
            <code style={{ background: '#f0f0f0', padding: '8px 12px', borderRadius: '4px', fontSize: '13px' }}>
              Check Storybook for Card component
            </code>
          </div>

          <div style={{ background: 'white', padding: '24px', borderRadius: '8px', border: '1px solid #e0e0e0' }}>
            <h3 style={{ margin: '0 0 12px 0', fontSize: '16px', fontWeight: 600 }}>Option 3: Provide Import Paths</h3>
            <p style={{ margin: '0 0 12px 0', fontSize: '14px', color: '#666' }}>
              Specify where components are located for easier reference and faster imports.
            </p>
            <code style={{ background: '#f0f0f0', padding: '8px 12px', borderRadius: '4px', fontSize: '13px' }}>
              CardComponents folder at src/components/
            </code>
          </div>
        </div>
      </section>

      {/* Component Organization */}
      <section style={{ marginBottom: '60px' }}>
        <h2 style={{ fontSize: '28px', fontWeight: 600, marginTop: 0, marginBottom: '24px', color: '#1a1a1a' }}>
          Component Organization
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
          {[
            {
              icon: 'shape',
              title: 'CardComponents Folder',
              items: ['Card', 'Cards', 'ChartCard', 'CollapsibleCard', 'DocumentLibraryCard', 'ApplicationDetailCard', 'FolderCards', 'StatsCard', 'StatusCard', 'UserCard']
            },
            {
              icon: 'button',
              title: 'Form Components',
              items: ['Button', 'Input', 'Dropdown', 'FileUpload', 'SimpleEditor']
            },
            {
              icon: 'layers',
              title: 'Layout & Navigation',
              items: ['Header', 'NavigationRail', 'PageTemplate', 'Breadcrumb', 'Tabs', 'Stepper', 'TreeNavigation']
            },
            {
              icon: 'data__table',
              title: 'Data Display',
              items: ['Table', 'AdvancedTable', 'List', 'Icon', 'UserAvatar', 'Chip']
            },
            {
              icon: 'chart__bar',
              title: 'Visualization',
              items: ['Graph', 'Treemap', 'DocumentTreemap', 'StatsGrid']
            },
            {
              icon: 'notification',
              title: 'Feedback & Overlays',
              items: ['Modal', 'Drawer', 'Popover', 'AlertBanner', 'AlertPanel']
            }
          ].map((category, idx) => (
            <div key={idx} style={{ background: '#f9f9f9', padding: '24px', borderRadius: '8px', border: '1px solid #e0e0e0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <Icon name={category.icon} size={20} />
                <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 600 }}>
                  {category.title}
                </h3>
              </div>
              <ul style={{ margin: 0, paddingLeft: '20px' }}>
                {category.items.map((item) => (
                  <li key={item} style={{ fontSize: '14px', color: '#666', margin: '8px 0' }}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Design Tokens */}
      <section style={{ marginBottom: '60px', background: '#f9f9f9', padding: '32px', borderRadius: '8px' }}>
        <h2 style={{ fontSize: '28px', fontWeight: 600, marginTop: 0, marginBottom: '24px', color: '#1a1a1a' }}>
          Design Tokens
        </h2>
        <p style={{ fontSize: '14px', color: '#666', marginBottom: '24px' }}>
          Use ODL design tokens for consistent styling across all components:
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
          {[
            { name: 'Colors', example: 'ODLTheme.colors.primary' },
            { name: 'Spacing', example: 'ODLTheme.spacing[4]' },
            { name: 'Typography', example: 'ODLTheme.fontSize' },
            { name: 'Shadows', example: 'ODLTheme.shadows' },
            { name: 'Border Radius', example: 'ODLTheme.borderRadius' },
            { name: 'Transitions', example: 'ODLTheme.transitions' }
          ].map((token) => (
            <div key={token.name} style={{ background: 'white', padding: '16px', borderRadius: '6px', border: '1px solid #e0e0e0' }}>
              <p style={{ margin: '0 0 8px 0', fontSize: '14px', fontWeight: 600 }}>
                {token.name}
              </p>
              <code style={{ background: '#f0f0f0', padding: '6px 8px', borderRadius: '4px', fontSize: '12px' }}>
                {token.example}
              </code>
            </div>
          ))}
        </div>
      </section>

      {/* Getting Started */}
      <section style={{ marginBottom: '60px' }}>
        <h2 style={{ fontSize: '28px', fontWeight: 600, marginTop: 0, marginBottom: '24px', color: '#1a1a1a' }}>
          Getting Started
        </h2>

        <div style={{ background: 'white', border: '1px solid #e0e0e0', borderRadius: '8px', overflow: 'hidden' }}>
          {[
            {
              step: '1',
              title: 'Browse Components',
              description: 'Explore the Storybook to see all available components and their variations'
            },
            {
              step: '2',
              title: 'Check Import Paths',
              description: 'Components are organized in CardComponents folder and other feature folders'
            },
            {
              step: '3',
              title: 'Review Props',
              description: 'Each component story shows available props and their types in Storybook docs'
            },
            {
              step: '4',
              title: 'Use in Projects',
              description: 'Import and use components with @odl/design-system or direct GitHub paths'
            }
          ].map((item, idx) => (
            <div
              key={idx}
              style={{
                padding: '24px',
                borderBottom: idx < 3 ? '1px solid #e0e0e0' : 'none',
                display: 'flex',
                gap: '24px'
              }}
            >
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: '#007bff',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 600,
                  flexShrink: 0
                }}
              >
                {item.step}
              </div>
              <div>
                <h3 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: 600 }}>
                  {item.title}
                </h3>
                <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Key Features */}
      <section style={{ marginBottom: '60px' }}>
        <h2 style={{ fontSize: '28px', fontWeight: 600, marginTop: 0, marginBottom: '24px', color: '#1a1a1a' }}>
          Key Features
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
          {[
            { icon: 'checkmark--filled', title: 'Accessible', desc: 'WCAG 2.1 Level AA compliant' },
            { icon: 'responsive', title: 'Responsive', desc: 'Mobile-first design approach' },
            { icon: 'paint--brush', title: 'Themeable', desc: 'Built with design tokens' },
            { icon: 'typescript', title: 'TypeScript', desc: 'Full type safety included' },
            { icon: 'github', title: 'Open Source', desc: 'Available on GitHub' },
            { icon: 'rocket', title: 'Production Ready', desc: '53 tested components' }
          ].map((feature, idx) => (
            <div
              key={idx}
              style={{
                background: '#f9f9f9',
                padding: '24px',
                borderRadius: '8px',
                border: '1px solid #e0e0e0',
                textAlign: 'center'
              }}
            >
              <div style={{ marginBottom: '12px' }}>
                <Icon name={feature.icon} size={32} />
              </div>
              <h3 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: 600 }}>
                {feature.title}
              </h3>
              <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <div style={{ textAlign: 'center', paddingTop: '40px', borderTop: '1px solid #e0e0e0' }}>
        <p style={{ fontSize: '14px', color: '#666', margin: 0 }}>
          For more information, visit the{' '}
          <a href="https://github.com/steamfrog2012/ODL-Library" style={{ color: '#007bff', textDecoration: 'none' }}>
            GitHub repository
          </a>
          {' '}or view the{' '}
          <a href="https://content-39edbyv6y-steamfrog2012s-projects.vercel.app" style={{ color: '#007bff', textDecoration: 'none' }}>
            live Storybook
          </a>
        </p>
      </div>
    </div>
  );
}
