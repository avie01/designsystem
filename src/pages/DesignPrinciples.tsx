import React from 'react';
import { ODLTheme } from '../styles/ODLTheme';
import userFirstIcon from '../assets/userfirst.svg';
import consistentIcon from '../assets/consistent.svg';
import accessibleIcon from '../assets/accessible.svg';
import clarityIcon from '../assets/clarity.svg';
import valuableIcon from '../assets/valuable.svg';

export default function DesignPrinciples() {
  // Add electric border CSS
  React.useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes electricFlow {
        0% {
          border-image-source: linear-gradient(330deg, #54A0E4 0.86%, #0B77D8 49.02%, #0347BF 99.14%);
        }
        50% {
          border-image-source: linear-gradient(330deg, #0347BF 0.86%, #54A0E4 49.02%, #0B77D8 99.14%);
        }
        100% {
          border-image-source: linear-gradient(330deg, #54A0E4 0.86%, #0B77D8 49.02%, #0347BF 99.14%);
        }
      }
      
      .electric-border {
        position: relative;
        border: 2px solid;
        border-image: linear-gradient(330deg, #54A0E4 0.86%, #0B77D8 49.02%, #0347BF 99.14%);
        border-image-slice: 1;
        border-radius: 16px;
        animation: electricFlow 2.5s linear infinite;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const principleStyle = {
    marginBottom: '48px',
    padding: '32px',
    background: '#ffffff',
    borderRadius: '16px',
  };

  const headerStyle = {
    fontSize: '24px',
    fontWeight: ODLTheme.typography.fontWeight.semibold,
    marginBottom: '16px',
    color: ODLTheme.colors.text.primary,
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  };

  const iconStyle = {
    width: '32px',
    height: '32px',
    flexShrink: 0,
  };

  const descriptionStyle = {
    fontSize: '16px',
    lineHeight: ODLTheme.typography.lineHeight.relaxed,
    color: ODLTheme.colors.text.secondary,
    marginBottom: '24px',
  };

  const exampleStyle = {
    padding: '20px',
    background: ODLTheme.colors.white,
    borderRadius: ODLTheme.borders.radius.base,
    border: `1px solid ${ODLTheme.colors.border}`,
    marginTop: '16px',
  };

  return (
    <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: '60px' }}>
        <h1 style={{ fontSize: '48px', fontWeight: 700, margin: '0 0 16px 0', color: ODLTheme.colors.text.primary }}>
          Design Principles
        </h1>
        <p style={{ fontSize: '20px', color: ODLTheme.colors.text.secondary, margin: 0 }}>
          Core principles that guide the ODL Design System
        </p>
      </div>

      {/* Principles */}
      <div>
        {/* User First */}
        <div style={principleStyle} className="electric-border">
          <h2 style={headerStyle}>
            <img src={userFirstIcon} alt="User First" style={iconStyle} />
            1. User First
          </h2>
          <p style={descriptionStyle}>
            Every design decision starts with the user. We prioritize user needs, goals, and 
            experiences above all else, ensuring our components solve real problems effectively.
          </p>
          <div style={exampleStyle}>
            <h4 style={{ marginBottom: '12px', color: ODLTheme.colors.text.primary }}>Key Practices:</h4>
            <ul style={{ margin: 0, paddingLeft: '20px', color: ODLTheme.colors.text.secondary }}>
              <li>Focus on user needs in each phase of the design process</li>
              <li>Involve users throughout the design process to create highly usable and accessible products</li>
              <li>Understand user workflows and pain points</li>
              <li>Design for real-world use cases</li>
              <li>Provide clear feedback and guidance</li>
              <li>Minimize user effort and cognitive load</li>
            </ul>
          </div>
        </div>

        {/* Consistency */}
        <div style={principleStyle} className="electric-border">
          <h2 style={headerStyle}>
            <img src={consistentIcon} alt="Consistency" style={iconStyle} />
            2. Consistency
          </h2>
          <p style={descriptionStyle}>
            Create a cohesive experience across all touchpoints. Consistent patterns, behaviors, 
            and visual language help users build familiarity and confidence.
          </p>
          <div style={exampleStyle}>
            <h4 style={{ marginBottom: '12px', color: ODLTheme.colors.text.primary }}>Implementation:</h4>
            <ul style={{ margin: 0, paddingLeft: '20px', color: ODLTheme.colors.text.secondary }}>
              <li>Consistent design patterns and interface elements such as familiar icons, standard text styles and uniform terminology</li>
              <li>Design systems that interact with our users with a single voice and builds trust</li>
              <li>Use standardized spacing units (4px grid system)</li>
              <li>Apply consistent color palette from ODLTheme</li>
              <li>Maintain uniform typography scales</li>
              <li>Ensure predictable component behaviors</li>
            </ul>
          </div>
        </div>

        {/* Accessible */}
        <div style={principleStyle} className="electric-border">
          <h2 style={headerStyle}>
            <img src={accessibleIcon} alt="Accessible" style={iconStyle} />
            3. Accessible
          </h2>
          <p style={descriptionStyle}>
            Design for everyone. Our components must be usable by people of all abilities, 
            meeting WCAG 2.1 AA standards and beyond.
          </p>
          <div style={exampleStyle}>
            <h4 style={{ marginBottom: '12px', color: ODLTheme.colors.text.primary }}>Requirements:</h4>
            <ul style={{ margin: 0, paddingLeft: '20px', color: ODLTheme.colors.text.secondary }}>
              <li>Design with accessibility in mind enabling people with a range of abilities and disabilities to easily perceive, understand, navigate, and interact with the product</li>
              <li>Focus on some key elements such as colour and contrast, clarity and scannability. We strive to deliver a valuable experience to people, regardless of their circumstances</li>
              <li>Users can access and interact with content in their preferred way</li>
              <li>Minimum contrast ratio of 4.5:1 for normal text</li>
              <li>Full keyboard navigation support</li>
              <li>Screen reader compatibility with proper ARIA</li>
              <li>Clear and visible focus indicators</li>
            </ul>
          </div>
        </div>

        {/* Clarity */}
        <div style={principleStyle} className="electric-border">
          <h2 style={headerStyle}>
            <img src={clarityIcon} alt="Clarity" style={iconStyle} />
            4. Clarity
          </h2>
          <p style={descriptionStyle}>
            Communicate clearly and simply. Every element should have a clear purpose, and 
            interfaces should be intuitive without requiring explanation.
          </p>
          <div style={exampleStyle}>
            <h4 style={{ marginBottom: '12px', color: ODLTheme.colors.text.primary }}>Guidelines:</h4>
            <ul style={{ margin: 0, paddingLeft: '20px', color: ODLTheme.colors.text.secondary }}>
              <li>Emphasis on subtle, appropriate and sharpened focus to enhance design functionality of all products</li>
              <li>Clear visual hierarchy and information structure</li>
              <li>Concise and meaningful labels</li>
              <li>Obvious interactive elements</li>
              <li>Unambiguous feedback and states</li>
            </ul>
          </div>
        </div>

        {/* Valuable */}
        <div style={principleStyle} className="electric-border">
          <h2 style={headerStyle}>
            <img src={valuableIcon} alt="Valuable" style={iconStyle} />
            5. Valuable
          </h2>
          <p style={descriptionStyle}>
            Every component must provide real value. We build purposeful solutions that enhance 
            productivity and deliver meaningful outcomes for users.
          </p>
          <div style={exampleStyle}>
            <h4 style={{ marginBottom: '12px', color: ODLTheme.colors.text.primary }}>Focus Areas:</h4>
            <ul style={{ margin: 0, paddingLeft: '20px', color: ODLTheme.colors.text.secondary }}>
              <li>Provide utility and value to all</li>
              <li>Engage users with our products in a seamless and streamlined way</li>
              <li>Ensure users efficiently achieve their goals with minimal clicks</li>
              <li>Solve real user problems effectively</li>
              <li>Enhance productivity and efficiency</li>
              <li>Reduce complexity and friction</li>
              <li>Enable users to achieve their goals faster</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Implementation */}
      <div style={{ 
        marginTop: '60px', 
        padding: '32px', 
        background: ODLTheme.colors.primaryLight,
        borderRadius: ODLTheme.borders.radius.md,
        border: `1px solid ${ODLTheme.colors.primary}`,
      }}>
        <h2 style={{ fontSize: '20px', marginBottom: '16px', color: ODLTheme.colors.primary }}>
          Implementing These Principles
        </h2>
        <p style={{ fontSize: '16px', lineHeight: '1.6', color: ODLTheme.colors.text.primary, margin: 0 }}>
          When building or extending components in the ODL Design System, always refer back to these 
          principles. They serve as a north star for decision-making and help ensure that every 
          addition to the system maintains the quality and consistency users expect.
        </p>
      </div>
    </div>
  );
}