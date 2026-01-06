import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { ODLTheme } from '../../styles/ODLTheme';

const meta: Meta = {
  title: 'Design System/Tokens/Transitions',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Interactive demo of all ODL transition timing functions. Click any box to see the transition in action.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

const TransitionBox = ({
  label,
  transitionValue,
  description,
}: {
  label: string;
  transitionValue: string;
  description: string;
}) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div style={{ marginBottom: '32px' }}>
      <div style={{ marginBottom: '12px' }}>
        <h4 style={{ margin: '0 0 4px 0', fontSize: '14px', fontWeight: 600 }}>
          {label}
        </h4>
        <p style={{ margin: 0, fontSize: '12px', color: ODLTheme.colors.text.secondary }}>
          {transitionValue}
        </p>
        <p style={{ margin: '4px 0 0 0', fontSize: '11px', color: ODLTheme.colors.text.tertiary }}>
          {description}
        </p>
      </div>

      <div
        onClick={() => setIsActive(!isActive)}
        style={{
          width: '100%',
          height: '80px',
          background: isActive ? ODLTheme.colors.primary : ODLTheme.colors.grey100,
          color: isActive ? 'white' : ODLTheme.colors.text.primary,
          border: `2px solid ${ODLTheme.colors.border}`,
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          transition: transitionValue,
          transform: isActive ? 'scale(1.05) translateY(-4px)' : 'scale(1) translateY(0)',
          userSelect: 'none',
          fontWeight: 500,
          fontSize: '14px',
        }}
      >
        {isActive ? '✓ Active' : 'Click to animate'}
      </div>
    </div>
  );
};

export const AllTransitions: Story = {
  name: 'All Transitions',
  render: () => (
    <div style={{ maxWidth: '600px' }}>
      <div style={{ marginBottom: '32px' }}>
        <h2 style={{ margin: '0 0 8px 0', fontSize: '20px', fontWeight: 600 }}>
          ODL Transitions
        </h2>
        <p style={{ margin: 0, color: ODLTheme.colors.text.secondary, fontSize: '14px' }}>
          Click each box to trigger its transition animation. Watch how the timing and easing affect the movement.
        </p>
      </div>

      <TransitionBox
        label="Fast (0.15s)"
        transitionValue={ODLTheme.transitions.fast}
        description="Quick feedback for UI interactions"
      />

      <TransitionBox
        label="Base (0.2s)"
        transitionValue={ODLTheme.transitions.base}
        description="Default timing for most components"
      />

      <TransitionBox
        label="Slow (0.3s)"
        transitionValue={ODLTheme.transitions.slow}
        description="Smooth, noticeable transitions for important state changes"
      />

      <TransitionBox
        label="Color (0.2s)"
        transitionValue={ODLTheme.transitions.color}
        description="Specific transition for color, background-color, and border-color"
      />

      <TransitionBox
        label="Transform (0.2s)"
        transitionValue={ODLTheme.transitions.transform}
        description="Optimized for 2D/3D transforms and positioning"
      />

      <TransitionBox
        label="Opacity (0.2s)"
        transitionValue={ODLTheme.transitions.opacity}
        description="Fade in/out effects"
      />

      <TransitionBox
        label="Input (0.15s cubic-bezier)"
        transitionValue={ODLTheme.transitions.input}
        description="Precise easing curve for form interactions"
      />
    </div>
  ),
};

export const TransitionComparison: Story = {
  name: 'Timing Comparison',
  render: () => {
    const [isActive, setIsActive] = useState(false);

    return (
      <div style={{ maxWidth: '800px' }}>
        <div style={{ marginBottom: '32px' }}>
          <h2 style={{ margin: '0 0 8px 0', fontSize: '20px', fontWeight: 600 }}>
            Compare Transition Speeds
          </h2>
          <p style={{ margin: 0, color: ODLTheme.colors.text.secondary, fontSize: '14px' }}>
            Click the button below to see all transitions animate simultaneously at their different speeds.
          </p>
        </div>

        <button
          onClick={() => setIsActive(!isActive)}
          style={{
            padding: '12px 24px',
            marginBottom: '32px',
            background: ODLTheme.colors.primary,
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '14px',
            fontWeight: 500,
            cursor: 'pointer',
            transition: ODLTheme.transitions.base,
            opacity: isActive ? 0.8 : 1,
          }}
        >
          {isActive ? 'Reset' : 'Animate All'}
        </button>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '16px',
          }}
        >
          {[
            { label: 'Fast', duration: ODLTheme.transitions.fast },
            { label: 'Base', duration: ODLTheme.transitions.base },
            { label: 'Slow', duration: ODLTheme.transitions.slow },
            { label: 'Input', duration: ODLTheme.transitions.input },
          ].map((item) => (
            <div key={item.label}>
              <p style={{ margin: '0 0 8px 0', fontSize: '12px', fontWeight: 500 }}>
                {item.label}
              </p>
              <div
                style={{
                  width: '100%',
                  height: '60px',
                  background: ODLTheme.colors.grey100,
                  borderRadius: '4px',
                  transition: item.duration,
                  transform: isActive ? 'translateX(40px)' : 'translateX(0)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px',
                  fontWeight: 500,
                  color: ODLTheme.colors.text.secondary,
                }}
              >
                {isActive ? '→' : '•'}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  },
};

export const EasingVisualization: Story = {
  name: 'Easing Curves',
  render: () => {
    const [isActive, setIsActive] = useState(false);

    const easingExamples = [
      {
        name: 'Linear (ease)',
        timing: '0.3s ease',
        description: 'Constant speed throughout',
      },
      {
        name: 'Ease-out',
        timing: '0.3s ease-out',
        description: 'Fast start, slow end',
      },
      {
        name: 'Ease-in',
        timing: '0.3s ease-in',
        description: 'Slow start, fast end',
      },
      {
        name: 'Cubic-bezier (Input)',
        timing: '0.3s cubic-bezier(0.2, 0, 0.38, 0.9)',
        description: 'Custom curve for input feedback',
      },
    ];

    return (
      <div style={{ maxWidth: '800px' }}>
        <div style={{ marginBottom: '32px' }}>
          <h2 style={{ margin: '0 0 8px 0', fontSize: '20px', fontWeight: 600 }}>
            Easing Curves Visualization
          </h2>
          <p style={{ margin: 0, color: ODLTheme.colors.text.secondary, fontSize: '14px' }}>
            Click the button to see how different easing functions affect animation speed.
          </p>
        </div>

        <button
          onClick={() => setIsActive(!isActive)}
          style={{
            padding: '12px 24px',
            marginBottom: '32px',
            background: ODLTheme.colors.primary,
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '14px',
            fontWeight: 500,
            cursor: 'pointer',
            transition: ODLTheme.transitions.base,
          }}
        >
          {isActive ? 'Reset' : 'Run Animation'}
        </button>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {easingExamples.map((example) => (
            <div key={example.name}>
              <div style={{ marginBottom: '8px' }}>
                <h4 style={{ margin: '0 0 2px 0', fontSize: '13px', fontWeight: 600 }}>
                  {example.name}
                </h4>
                <p style={{ margin: 0, fontSize: '11px', color: ODLTheme.colors.text.secondary }}>
                  {example.description}
                </p>
              </div>
              <div
                style={{
                  position: 'relative',
                  height: '40px',
                  background: ODLTheme.colors.wave,
                  borderRadius: '4px',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    width: '20px',
                    height: '20px',
                    background: ODLTheme.colors.primary,
                    borderRadius: '50%',
                    top: '50%',
                    left: 0,
                    transform: 'translateY(-50%)',
                    transition: example.timing,
                    marginLeft: isActive ? 'calc(100% - 20px)' : 0,
                  }}
                />
              </div>
              <p style={{ margin: '4px 0 0 0', fontSize: '10px', color: ODLTheme.colors.text.tertiary }}>
                {example.timing}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  },
};

