import React, { useState } from 'react';
import Stepper, { Step } from '../components/Stepper/Stepper';
import Button from '../components/Button/Button';
import Icon from '../components/Icon/Icon';
import DemoBreadcrumb from '../components/DemoBreadcrumb/DemoBreadcrumb';
import BackToTop from '../components/BackToTop/BackToTop';
import ODLTheme from '../styles/ODLTheme';
import styles from './TableDemo.module.css';

type DemoType = 'horizontal' | 'vertical' | 'interactive' | 'customized' | 'compact' | 'fill-space' | 'with-content';

const StepperDemo: React.FC = () => {
  const [selectedDemo, setSelectedDemo] = useState<DemoType>('horizontal');
  const [showCode, setShowCode] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [contentStep, setContentStep] = useState(1);

  // Sample steps for demos
  const basicSteps: Step[] = [
    {
      id: 'step1',
      title: 'Finished',
      description: 'This is a description.',
      status: 'finished'
    },
    {
      id: 'step2', 
      title: 'In Progress',
      description: 'This is a description.',
      status: 'current'
    },
    {
      id: 'step3',
      title: 'Waiting',
      description: 'This is a description.',
      status: 'waiting'
    },
    {
      id: 'step4',
      title: 'Waiting',
      description: 'This is a description.',
      status: 'waiting'
    }
  ];

  const verticalSteps: Step[] = [
    {
      id: 'step1',
      title: 'Title',
      description: 'Description',
      status: 'finished'
    },
    {
      id: 'step2',
      title: 'Title',
      description: 'Description',
      status: 'finished'
    },
    {
      id: 'step3',
      title: 'Title',
      description: 'Description',
      status: 'error'
    },
    {
      id: 'step4',
      title: 'Title',
      description: 'Description',
      status: 'current'
    },
    {
      id: 'step5',
      title: 'Title',
      description: 'Description',
      status: 'waiting'
    }
  ];

  const applicationSteps: Step[] = [
    {
      id: 'lodge',
      title: 'Lodge Application',
      description: 'Submit your development application',
      status: currentStep >= 0 ? 'finished' : 'waiting'
    },
    {
      id: 'review',
      title: 'Initial Review',
      description: 'Council reviews your submission',
      status: currentStep === 1 ? 'current' : currentStep > 1 ? 'finished' : 'waiting'
    },
    {
      id: 'assessment',
      title: 'Assessment',
      description: 'Detailed assessment and consultation',
      status: currentStep === 2 ? 'current' : currentStep > 2 ? 'finished' : 'waiting'
    },
    {
      id: 'decision',
      title: 'Decision',
      description: 'Final determination made',
      status: currentStep === 3 ? 'current' : currentStep > 3 ? 'finished' : 'waiting'
    },
    {
      id: 'complete',
      title: 'Complete',
      description: 'Application process finalized',
      status: currentStep === 4 ? 'current' : currentStep > 4 ? 'finished' : 'waiting'
    }
  ];

  const customizedSteps: Step[] = [
    {
      id: 'upload',
      title: 'Upload Documents',
      description: 'Select and upload files',
      status: 'finished',
      icon: 'upload'
    },
    {
      id: 'validate',
      title: 'Validation',
      description: 'Checking document compliance',
      status: 'current',
      icon: 'checkmark-outline'
    },
    {
      id: 'process',
      title: 'Processing',
      description: 'AI analysis in progress',
      status: 'waiting',
      icon: 'workflow-automation'
    },
    {
      id: 'review',
      title: 'Review',
      description: 'Manual review required',
      status: 'waiting',
      icon: 'view'
    },
    {
      id: 'approve',
      title: 'Approval',
      description: 'Awaiting final approval',
      status: 'waiting',
      icon: 'checkmark-filled'
    }
  ];

  const getCodeExample = (demo: DemoType): string => {
    switch (demo) {
      case 'horizontal':
        return `import Stepper from '../components/Stepper/Stepper';

const steps = [
  {
    id: 'step1',
    title: 'Finished',
    description: 'This is a description.',
    status: 'finished'
  },
  {
    id: 'step2',
    title: 'In Progress',
    description: 'This is a description.',
    status: 'current'
  },
  {
    id: 'step3',
    title: 'Waiting',
    description: 'This is a description.',
    status: 'waiting'
  }
];

// Basic horizontal stepper
<Stepper
  steps={steps}
  orientation="horizontal"
  showDescription={true}
/>`;

      case 'vertical':
        return `import Stepper from '../components/Stepper/Stepper';

const steps = [
  {
    id: 'step1',
    title: 'Title',
    description: 'Description',
    status: 'finished'
  },
  {
    id: 'step2',
    title: 'Title',
    description: 'Description',
    status: 'error'
  },
  {
    id: 'step3',
    title: 'Title',
    description: 'Description',
    status: 'current'
  }
];

// Vertical stepper with error state
<Stepper
  steps={steps}
  orientation="vertical"
  showDescription={true}
/>`;

      case 'interactive':
        return `import Stepper from '../components/Stepper/Stepper';
import { useState } from 'react';

const [currentStep, setCurrentStep] = useState(1);

const steps = steps.map((step, index) => ({
  ...step,
  status: index < currentStep ? 'finished' : 
          index === currentStep ? 'current' : 'waiting'
}));

// Interactive stepper with click handling
<Stepper
  steps={steps}
  orientation="horizontal"
  currentStep={currentStep}
  onStepClick={(index, step) => {
    if (step.status === 'finished' || step.status === 'current') {
      setCurrentStep(index);
    }
  }}
/>

// Navigation buttons
<Button onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}>
  Previous
</Button>
<Button onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}>
  Next
</Button>`;

      case 'customized':
        return `import Stepper from '../components/Stepper/Stepper';

const customSteps = [
  {
    id: 'upload',
    title: 'Upload Documents',
    description: 'Select and upload files',
    status: 'finished',
    icon: 'upload' // Custom icon
  },
  {
    id: 'validate',
    title: 'Validation',
    description: 'Checking compliance',
    status: 'current',
    icon: 'checkmark-outline'
  }
];

// Customized stepper with icons
<Stepper
  steps={customSteps}
  orientation="horizontal"
  showDescription={true}
/>`;

      case 'with-content':
        return `import Stepper from '../components/Stepper/Stepper';
import Button from '../components/Button/Button';

const steps = [
  {
    id: 'basic-info',
    title: 'Basic information',
    status: 'current',
    content: (
      <div>
        <p>Form content goes here...</p>
      </div>
    ),
    actions: (
      <>
        <Button variant="primary" onClick={handleContinue}>
          Continue
        </Button>
        <Button variant="secondary" onClick={handleBack}>
          Back
        </Button>
      </>
    )
  },
  // ... more steps
];

// Vertical stepper with expanded content
<Stepper
  steps={steps}
  orientation="vertical"
  expandedContent={true}
  showDescription={false}
  currentStep={currentStep}
/>`;

      case 'compact':
        return `import Stepper from '../components/Stepper/Stepper';

// Compact stepper for limited space
<Stepper
  steps={steps}
  orientation="horizontal"
  compact={true}
  showDescription={false}
/>

// Compact vertical stepper
<Stepper
  steps={steps}
  orientation="vertical"
  compact={true}
  showDescription={true}
/>`;

      case 'fill-space':
        return `import Stepper from '../components/Stepper/Stepper';

// Fill available width
<Stepper
  steps={steps}
  orientation="horizontal"
  fillSpace={true}
  showDescription={true}
/>

// Fixed dimensions
<Stepper
  steps={steps}
  orientation="vertical"
  width="300px"
  height="400px"
  showDescription={true}
/>`;

      default:
        return '';
    }
  };

  // Steps with expanded content
  const contentSteps: Step[] = [
    {
      id: 'getting-started',
      title: 'Getting started',
      status: contentStep === 0 ? 'current' : contentStep > 0 ? 'finished' : 'waiting'
    },
    {
      id: 'basic-info',
      title: 'Basic information',
      status: contentStep === 1 ? 'current' : contentStep > 1 ? 'finished' : 'waiting',
      content: (
        <div>
          <p style={{ marginBottom: '1rem', color: ODLTheme.colors.text.secondary }}>
            No! The cat shelter's on to me. That's a popular name today. Little "e", big "B"? Negative, bossy meat creature! 
            Soothe us with sweet lies.
          </p>
        </div>
      ),
      actions: (
        <>
          <Button variant="primary" onClick={() => setContentStep(2)}>
            Continue
          </Button>
          <Button variant="secondary" onClick={() => setContentStep(0)}>
            Back
          </Button>
        </>
      )
    },
    {
      id: 'upload-docs',
      title: 'Upload documents',
      status: contentStep === 2 ? 'current' : contentStep > 2 ? 'finished' : 'waiting',
      content: (
        <div>
          <p style={{ marginBottom: '1rem', color: ODLTheme.colors.text.secondary }}>
            Please upload the required documents for your application.
          </p>
          <div style={{
            padding: '2rem',
            border: `2px dashed ${ODLTheme.colors.border}`,
            borderRadius: ODLTheme.borders.radius.md,
            textAlign: 'center',
            backgroundColor: ODLTheme.colors.background
          }}>
            <Icon name="upload" size={32} style={{ color: ODLTheme.colors.text.secondary, marginBottom: '0.5rem' }} />
            <p style={{ color: ODLTheme.colors.text.secondary }}>
              Drag and drop files here or click to browse
            </p>
          </div>
        </div>
      ),
      actions: (
        <>
          <Button variant="primary" onClick={() => setContentStep(3)}>
            Continue
          </Button>
          <Button variant="secondary" onClick={() => setContentStep(1)}>
            Back
          </Button>
        </>
      )
    },
    {
      id: 'review',
      title: 'Review',
      status: contentStep === 3 ? 'current' : contentStep > 3 ? 'finished' : 'waiting',
      content: (
        <div>
          <p style={{ marginBottom: '1rem', color: ODLTheme.colors.text.secondary }}>
            Review your information before submitting.
          </p>
          <div style={{ 
            padding: '1rem', 
            backgroundColor: ODLTheme.colors.background,
            borderRadius: ODLTheme.borders.radius.sm,
            border: `1px solid ${ODLTheme.colors.border}`
          }}>
            <h4 style={{ marginBottom: '0.5rem' }}>Application Summary</h4>
            <p style={{ fontSize: ODLTheme.typography.fontSize.sm, color: ODLTheme.colors.text.secondary }}>
              All information has been provided and documents uploaded.
            </p>
          </div>
        </div>
      ),
      actions: (
        <>
          <Button variant="primary" onClick={() => alert('Application submitted!')}>
            Submit
          </Button>
          <Button variant="secondary" onClick={() => setContentStep(2)}>
            Back
          </Button>
        </>
      )
    }
  ];

  const demoTabs = [
    { key: 'horizontal', label: 'Horizontal', desc: 'Side-by-side steps', icon: '→' },
    { key: 'vertical', label: 'Vertical', desc: 'Stacked steps', icon: '↓' },
    { key: 'with-content', label: 'With Content', desc: 'Expanded content & actions', icon: '📝' },
    { key: 'interactive', label: 'Interactive', desc: 'Click to navigate', icon: '👆' },
    { key: 'customized', label: 'Customized', desc: 'Custom icons & colors', icon: '🎨' },
    { key: 'compact', label: 'Compact', desc: 'Space-saving mode', icon: '📦' },
    { key: 'fill-space', label: 'Fill Space', desc: 'Responsive sizing', icon: '↔️' }
  ];

  return (
    <div className={styles.tableDemo}>
      <DemoBreadcrumb componentName="Stepper" />
      
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.headerText}>
            <h1>Stepper Component</h1>
            <p>Guide users through multi-step processes with clear visual progress indicators</p>
          </div>
          <div className={styles.headerActions}>
            <Button
              variant={showCode ? 'primary' : 'secondary'}
              size="small"
              onClick={() => setShowCode(!showCode)}
            >
              <Icon name="code" size={20} />
              {showCode ? 'Hide Code' : 'View Code'}
            </Button>
          </div>
        </div>
      </div>

      {/* Demo Selector */}
      <div className={styles.demoSelector}>
        <div className={styles.demoTabs}>
          {demoTabs.map(demo => (
            <button
              key={demo.key}
              className={`${styles.demoTab} ${selectedDemo === demo.key ? styles.active : ''}`}
              onClick={() => setSelectedDemo(demo.key as DemoType)}
            >
              <span className={styles.demoIcon}>{demo.icon}</span>
              <div className={styles.demoTabContent}>
                <span className={styles.demoLabel}>{demo.label}</span>
                <span className={styles.demoDesc}>{demo.desc}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Demo Content */}
      <div className={styles.demoContent}>
        {selectedDemo === 'horizontal' && (
          <div className={styles.tableSection}>
            <div className={styles.sectionHeader}>
              <h2>Horizontal Stepper</h2>
              <p>Display steps in a horizontal layout, perfect for forms and wizards</p>
            </div>
            <div style={{ padding: '2rem', background: 'white', borderRadius: '0 0 12px 12px' }}>
              <Stepper
                steps={basicSteps}
                orientation="horizontal"
                showDescription={true}
              />
            </div>
          </div>
        )}

        {selectedDemo === 'vertical' && (
          <div className={styles.tableSection}>
            <div className={styles.sectionHeader}>
              <h2>Vertical Stepper</h2>
              <p>Stack steps vertically for detailed processes or mobile layouts</p>
            </div>
            <div style={{ padding: '2rem', background: 'white', borderRadius: '0 0 12px 12px' }}>
              <div style={{ maxWidth: '400px' }}>
                <Stepper
                  steps={verticalSteps}
                  orientation="vertical"
                  showDescription={true}
                />
              </div>
            </div>
          </div>
        )}

        {selectedDemo === 'interactive' && (
          <div className={styles.tableSection}>
            <div className={styles.sectionHeader}>
              <h2>Interactive Stepper</h2>
              <p>Allow users to navigate between completed steps</p>
            </div>
            <div style={{ padding: '2rem', background: 'white', borderRadius: '0 0 12px 12px' }}>
              <Stepper
                steps={applicationSteps}
                orientation="horizontal"
                currentStep={currentStep}
                showDescription={true}
                onStepClick={(index) => {
                  if (index <= currentStep + 1) {
                    setCurrentStep(index);
                  }
                }}
              />
              
              <div style={{ 
                marginTop: '2rem', 
                display: 'flex', 
                gap: '1rem', 
                justifyContent: 'center' 
              }}>
                <Button
                  variant="secondary"
                  onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                  disabled={currentStep === 0}
                >
                  <Icon name="arrow-left" size={16} />
                  Previous
                </Button>
                <Button
                  variant="primary"
                  onClick={() => setCurrentStep(Math.min(applicationSteps.length - 1, currentStep + 1))}
                  disabled={currentStep === applicationSteps.length - 1}
                >
                  Next
                  <Icon name="arrow-right" size={16} />
                </Button>
              </div>
            </div>
          </div>
        )}

        {selectedDemo === 'customized' && (
          <div className={styles.tableSection}>
            <div className={styles.sectionHeader}>
              <h2>Customized Stepper</h2>
              <p>Use custom icons and styling for specialized workflows</p>
            </div>
            <div style={{ padding: '2rem', background: 'white', borderRadius: '0 0 12px 12px' }}>
              <Stepper
                steps={customizedSteps}
                orientation="horizontal"
                showDescription={true}
              />
              
              <div style={{ marginTop: '3rem' }}>
                <h3 style={{ marginBottom: '1rem', color: ODLTheme.colors.text.primary }}>
                  Vertical with Custom Icons
                </h3>
                <div style={{ maxWidth: '400px' }}>
                  <Stepper
                    steps={customizedSteps}
                    orientation="vertical"
                    showDescription={true}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedDemo === 'with-content' && (
          <div className={styles.tableSection}>
            <div className={styles.sectionHeader}>
              <h2>Vertical Stepper with Content</h2>
              <p>Expanded content areas with forms and actions for wizard-like experiences</p>
            </div>
            <div style={{ padding: '2rem', background: 'white', borderRadius: '0 0 12px 12px' }}>
              <div style={{ maxWidth: '600px' }}>
                <Stepper
                  steps={contentSteps}
                  orientation="vertical"
                  expandedContent={true}
                  showDescription={false}
                  currentStep={contentStep}
                />
              </div>
            </div>
          </div>
        )}

        {selectedDemo === 'compact' && (
          <div className={styles.tableSection}>
            <div className={styles.sectionHeader}>
              <h2>Compact Mode</h2>
              <p>Space-efficient steppers for constrained layouts</p>
            </div>
            <div style={{ padding: '2rem', background: 'white', borderRadius: '0 0 12px 12px' }}>
              <h3 style={{ marginBottom: '1rem', color: ODLTheme.colors.text.primary }}>
                Compact Horizontal
              </h3>
              <Stepper
                steps={basicSteps}
                orientation="horizontal"
                compact={true}
                showDescription={false}
              />
              
              <h3 style={{ margin: '2rem 0 1rem', color: ODLTheme.colors.text.primary }}>
                Compact Vertical with Descriptions
              </h3>
              <div style={{ maxWidth: '300px' }}>
                <Stepper
                  steps={verticalSteps}
                  orientation="vertical"
                  compact={true}
                  showDescription={true}
                />
              </div>
            </div>
          </div>
        )}

        {selectedDemo === 'fill-space' && (
          <div className={styles.tableSection}>
            <div className={styles.sectionHeader}>
              <h2>Responsive Sizing</h2>
              <p>Steppers that adapt to their container dimensions</p>
            </div>
            <div style={{ padding: '2rem', background: 'white', borderRadius: '0 0 12px 12px' }}>
              <h3 style={{ marginBottom: '1rem', color: ODLTheme.colors.text.primary }}>
                Fill Available Width
              </h3>
              <div style={{ width: '100%', padding: '1rem', backgroundColor: ODLTheme.colors.background, borderRadius: ODLTheme.borders.radius.md }}>
                <Stepper
                  steps={basicSteps}
                  orientation="horizontal"
                  fillSpace={true}
                  showDescription={true}
                />
              </div>
              
              <h3 style={{ margin: '2rem 0 1rem', color: ODLTheme.colors.text.primary }}>
                Fixed Dimensions
              </h3>
              <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                <div style={{ 
                  padding: '1rem', 
                  backgroundColor: ODLTheme.colors.background, 
                  borderRadius: ODLTheme.borders.radius.md 
                }}>
                  <h4 style={{ marginBottom: '1rem', fontSize: ODLTheme.typography.fontSize.sm }}>
                    Fixed Width (600px)
                  </h4>
                  <Stepper
                    steps={basicSteps.slice(0, 3)}
                    orientation="horizontal"
                    width="600px"
                    showDescription={true}
                  />
                </div>
                
                <div style={{ 
                  padding: '1rem', 
                  backgroundColor: ODLTheme.colors.background, 
                  borderRadius: ODLTheme.borders.radius.md 
                }}>
                  <h4 style={{ marginBottom: '1rem', fontSize: ODLTheme.typography.fontSize.sm }}>
                    Fixed Height (300px)
                  </h4>
                  <Stepper
                    steps={verticalSteps.slice(0, 3)}
                    orientation="vertical"
                    height="300px"
                    showDescription={true}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Code Panel */}
        {showCode && (
          <div className={styles.codePanel}>
            <h3>
              <Icon name="code" size={20} style={{ marginRight: '0.5rem' }} />
              Code Example
            </h3>
            <pre className={styles.codeBlock}>
              <code>{getCodeExample(selectedDemo)}</code>
            </pre>
          </div>
        )}

        {/* Features Showcase */}
        <div className={styles.featuresShowcase}>
          <div className={styles.sectionHeader}>
            <h3>Stepper Component Features</h3>
            <p>Everything you need for guiding users through multi-step processes</p>
          </div>
          
          <div className={styles.featureGrid}>
            <div className={styles.featureCategory}>
              <h4>🎨 Core Features</h4>
              <ul>
                <li>Horizontal and vertical orientations</li>
                <li>Multiple status states (finished, current, waiting, error)</li>
                <li>Customizable step icons</li>
                <li>Optional descriptions</li>
                <li>Compact mode for space-saving</li>
                <li>Responsive sizing options</li>
              </ul>
            </div>
            
            <div className={styles.featureCategory}>
              <h4>⚡ Advanced</h4>
              <ul>
                <li>Interactive step navigation</li>
                <li>Custom click handlers</li>
                <li>Programmatic step control</li>
                <li>Dynamic step updates</li>
                <li>Error state handling</li>
                <li>Progress tracking</li>
              </ul>
            </div>
            
            <div className={styles.featureCategory}>
              <h4>🎯 Customization</h4>
              <ul>
                <li>Custom icons per step</li>
                <li>Fill space or fixed dimensions</li>
                <li>Show/hide descriptions</li>
                <li>Compact or standard sizing</li>
                <li>Theme-aware colors</li>
                <li>Custom CSS classes</li>
              </ul>
            </div>
            
            <div className={styles.featureCategory}>
              <h4>🚀 Performance</h4>
              <ul>
                <li>Lightweight component</li>
                <li>No external dependencies</li>
                <li>Optimized rendering</li>
                <li>Smooth transitions</li>
                <li>Minimal DOM updates</li>
                <li>Efficient state management</li>
              </ul>
            </div>
            
            <div className={styles.featureCategory}>
              <h4>♿ Accessibility</h4>
              <ul>
                <li>Keyboard navigation support</li>
                <li>ARIA labels and roles</li>
                <li>Screen reader friendly</li>
                <li>Focus indicators</li>
                <li>High contrast support</li>
                <li>Semantic HTML structure</li>
              </ul>
            </div>
            
            <div className={styles.featureCategory}>
              <h4>💼 Use Cases</h4>
              <ul>
                <li>Form wizards</li>
                <li>Application workflows</li>
                <li>Onboarding processes</li>
                <li>Checkout flows</li>
                <li>Registration steps</li>
                <li>Progress tracking</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <BackToTop />
    </div>
  );
};

export default StepperDemo;