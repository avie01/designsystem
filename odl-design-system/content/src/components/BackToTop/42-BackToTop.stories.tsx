import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import BackToTop from './BackToTop';

const meta: Meta<typeof BackToTop> = {
  title: 'Design System/Components/BackToTop',
  component: BackToTop,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A floating "Back to Top" button that appears when the user scrolls down the page. Provides smooth scrolling back to the top with accessibility support.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const LongContent: React.FC = () => (
  <div style={{ minHeight: '200vh', padding: '40px' }}>
    <h1>Scroll Down to See the Back to Top Button</h1>
    <p>The button will appear once you scroll down by one full viewport height.</p>

    {Array.from({ length: 50 }, (_, i) => (
      <div key={i} style={{ marginBottom: '24px', padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
        <h2>Section {i + 1}</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
      </div>
    ))}
  </div>
);

export const Default: Story = {
  render: () => (
    <div>
      <LongContent />
      <BackToTop />
    </div>
  ),
};

export const WithInstructions: Story = {
  name: '02 With Instructions',
  render: () => (
    <div>
      <div style={{
        position: 'sticky',
        top: 0,
        backgroundColor: '#4a90e2',
        color: 'white',
        padding: '16px',
        textAlign: 'center',
        zIndex: 100,
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <strong>Scroll down one full viewport height to see the Back to Top button appear in the bottom right</strong>
      </div>
      <LongContent />
      <BackToTop />
    </div>
  ),
};

export const LongArticle: Story = {
  name: '03 Long Article',
  render: () => (
    <div>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 20px', minHeight: '250vh' }}>
        <article>
          <h1 style={{ fontSize: '36px', marginBottom: '8px' }}>Understanding the Back to Top Component</h1>
          <p style={{ color: '#666', marginBottom: '32px' }}>Published on January 15, 2024</p>

          <h2>Introduction</h2>
          <p>
            The Back to Top button is a common UI pattern that enhances user experience by providing a quick way
            to return to the top of long pages. This component appears automatically when the user scrolls down,
            providing contextual assistance without cluttering the initial view.
          </p>

          <h2>Key Features</h2>
          <ul>
            <li>Automatic visibility based on scroll position (appears after one full viewport height)</li>
            <li>Smooth scrolling animation</li>
            <li>Fixed positioning in the bottom right corner</li>
            <li>Accessible with proper title attribute</li>
            <li>Responsive design that works on all screen sizes</li>
          </ul>

          <h2>Implementation Details</h2>
          <p>
            The component uses React hooks to track scroll position and conditionally render based on the
            current scroll offset. It leverages the Window API's scroll event listener to detect when the
            user has scrolled past a threshold (300 pixels by default).
          </p>

          <h3>Technical Specifications</h3>
          <ul>
            <li>Position: Fixed at bottom: 2rem, right: 2rem</li>
            <li>Size: 48px × 48px circular button</li>
            <li>Animation: Fade and scale transition (0.3s ease)</li>
            <li>Gradient background: Linear gradient from #667eea to #764ba2</li>
            <li>Z-index: 1000 to stay above most content</li>
          </ul>

          <h2>User Experience Considerations</h2>
          <p>
            The Back to Top button is particularly useful for:
          </p>
          <ul>
            <li>Long-form articles and blog posts</li>
            <li>Documentation pages with extensive content</li>
            <li>Product listings and catalog pages</li>
            <li>Dashboard views with scrollable content</li>
            <li>Mobile browsing where scrolling large distances is common</li>
          </ul>

          <h2>Accessibility</h2>
          <p>
            The component includes several accessibility features:
          </p>
          <ul>
            <li>Semantic button element with proper role</li>
            <li>Descriptive title attribute for screen readers</li>
            <li>Keyboard accessible via standard button interactions</li>
            <li>Sufficient color contrast for visibility</li>
            <li>Clear visual affordance through icon and styling</li>
          </ul>

          <h2>Customization Options</h2>
          <p>
            While the component works out of the box, developers can customize:
          </p>
          <ul>
            <li>Scroll threshold for when the button appears</li>
            <li>Position on the screen</li>
            <li>Visual styling (colors, size, shadows)</li>
            <li>Animation timing and easing functions</li>
            <li>Icon choice for the button</li>
          </ul>

          <h2>Browser Compatibility</h2>
          <p>
            The component uses modern web APIs that are supported in all current browsers:
          </p>
          <ul>
            <li>Window.scrollTo with smooth behavior (with fallback)</li>
            <li>React hooks (useEffect, useState)</li>
            <li>CSS transitions and transforms</li>
            <li>Fixed positioning</li>
          </ul>

          <h2>Performance Considerations</h2>
          <p>
            The component is optimized for performance by:
          </p>
          <ul>
            <li>Using passive event listeners where appropriate</li>
            <li>Properly cleaning up event listeners on unmount</li>
            <li>Minimizing re-renders through efficient state management</li>
            <li>Using CSS transforms for animations (GPU accelerated)</li>
          </ul>

          <h2>Common Use Cases</h2>

          <h3>1. Documentation Sites</h3>
          <p>
            Technical documentation often contains extensive content organized in a single page.
            The Back to Top button helps users navigate back to the table of contents or navigation menu.
          </p>

          <h3>2. E-commerce Product Lists</h3>
          <p>
            Online stores with long product listings benefit from this component, allowing users to
            quickly return to filters and search options at the top of the page.
          </p>

          <h3>3. Blog Posts and Articles</h3>
          <p>
            Long-form content like this example article makes the Back to Top button essential for
            improving reading experience and navigation.
          </p>

          <h3>4. Dashboard Applications</h3>
          <p>
            Data-heavy dashboards with scrollable content areas can use this component to help users
            return to top-level navigation or controls.
          </p>

          <h2>Best Practices</h2>
          <ul>
            <li>Only show the button after meaningful scroll (avoid showing it immediately)</li>
            <li>Position consistently in the bottom-right corner (user expectation)</li>
            <li>Use smooth scrolling for better user experience</li>
            <li>Ensure sufficient contrast with page background</li>
            <li>Keep the button size touch-friendly (minimum 44×44px)</li>
            <li>Don't interfere with other floating elements (chat widgets, etc.)</li>
          </ul>

          <h2>Conclusion</h2>
          <p>
            The Back to Top component is a simple yet powerful addition to any website with long content.
            It enhances user experience by reducing the effort needed to navigate back to the top of the page,
            particularly on mobile devices where scrolling long distances can be tedious.
          </p>

          <p style={{ marginTop: '80px', padding: '20px', backgroundColor: '#f0f0f0', borderRadius: '8px', textAlign: 'center' }}>
            <strong>You've reached the end of the article!</strong><br />
            Click the circular button in the bottom-right corner to scroll back to the top.
          </p>
        </article>
      </div>
      <BackToTop />
    </div>
  ),
};

export const MultipleScrollableAreas: Story = {
  name: '04 Multiple Scrollable Areas',
  render: () => (
    <div>
      <div style={{ padding: '40px' }}>
        <h1>Dashboard with Multiple Sections</h1>
        <p>Scroll through this page with multiple content sections.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginTop: '20px' }}>
          {Array.from({ length: 20 }, (_, i) => (
            <div key={i} style={{
              padding: '20px',
              backgroundColor: i % 2 === 0 ? '#e3f2fd' : '#f3e5f5',
              borderRadius: '8px',
              minHeight: '150px'
            }}>
              <h2>Card {i + 1}</h2>
              <p>This is a card with some content. The Back to Top button will help you navigate back up quickly.</p>
              <p>More content to increase the scroll height and demonstrate the functionality.</p>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '40px', padding: '20px', backgroundColor: '#fff3e0', borderRadius: '8px' }}>
          <h2>Additional Information</h2>
          {Array.from({ length: 10 }, (_, i) => (
            <p key={i}>
              Paragraph {i + 1}: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          ))}
        </div>
      </div>
      <BackToTop />
    </div>
  ),
};

export const ProductCatalog: Story = {
  name: '05 Product Catalog',
  render: () => (
    <div>
      <div style={{
        position: 'sticky',
        top: 0,
        backgroundColor: 'white',
        borderBottom: '2px solid #e0e0e0',
        padding: '20px',
        zIndex: 10,
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{ margin: 0 }}>Product Catalog</h1>
        <p style={{ margin: '8px 0 0 0', color: '#666' }}>Browse our extensive collection</p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: '20px',
        padding: '40px'
      }}>
        {Array.from({ length: 48 }, (_, i) => (
          <div key={i} style={{
            border: '1px solid #e0e0e0',
            borderRadius: '8px',
            overflow: 'hidden',
            backgroundColor: 'white'
          }}>
            <div style={{
              height: '200px',
              backgroundColor: `hsl(${i * 7.5}, 70%, 80%)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '48px',
              fontWeight: 'bold',
              color: 'white'
            }}>
              {i + 1}
            </div>
            <div style={{ padding: '16px' }}>
              <h2 style={{ margin: '0 0 8px 0', fontSize: '16px' }}>Product {i + 1}</h2>
              <p style={{ margin: '0', color: '#666', fontSize: '14px' }}>
                Description of product {i + 1}. High quality item with great features.
              </p>
              <p style={{ margin: '8px 0 0 0', fontWeight: 'bold', color: '#4a90e2' }}>
                ${(Math.random() * 100 + 20).toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>
      <BackToTop />
    </div>
  ),
};
