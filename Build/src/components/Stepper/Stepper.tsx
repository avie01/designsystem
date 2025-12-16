import React, { useCallback, KeyboardEvent, useRef } from 'react';
import Icon from '../Icon/Icon';
import './Stepper.css';

export interface Step {
  id: string;
  title: string;
  description?: string;
  status: 'finished' | 'current' | 'waiting' | 'error';
  icon?: string;
  content?: React.ReactNode;
  actions?: React.ReactNode;
}

export interface StepperProps {
  /** Array of steps to display */
  steps: Step[];
  /** Stepper orientation */
  orientation?: 'horizontal' | 'vertical';
  /** Current active step index */
  currentStep?: number;
  /** Whether to show step descriptions */
  showDescription?: boolean;
  /** Component size */
  size?: 'small' | 'medium' | 'large';
  /** Whether the stepper is disabled */
  disabled?: boolean;
  /** Error state */
  error?: boolean | string;
  /** Use compact spacing */
  compact?: boolean;
  /** Fill available space */
  fillSpace?: boolean;
  /** Custom width */
  width?: string | number;
  /** Custom height */
  height?: string | number;
  /** Show expanded content for current step */
  expandedContent?: boolean;
  /** Callback when step is clicked */
  onStepClick?: (stepIndex: number, step: Step) => void;
  /** Custom class name */
  className?: string;
  /** Accessible label for the stepper */
  'aria-label'?: string;
  /** ARIA attributes */
  'aria-describedby'?: string;
}

const Stepper: React.FC<StepperProps> = ({
  steps,
  orientation = 'horizontal',
  currentStep = 0,
  showDescription = true,
  size = 'medium',
  disabled = false,
  error = false,
  compact = false,
  fillSpace = false,
  width,
  height,
  expandedContent = false,
  onStepClick,
  className,
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedBy
}) => {
  const stepperRef = useRef<HTMLDivElement>(null);
  const errorId = useRef(`stepper-error-${Math.random().toString(36).substr(2, 9)}`).current;

  // Keyboard navigation handler
  const handleKeyDown = useCallback((e: KeyboardEvent<HTMLDivElement>, stepIndex: number, step: Step) => {
    if (disabled) return;

    const isClickable = onStepClick && (step.status === 'finished' || step.status === 'current');
    if (!isClickable) return;

    switch (e.key) {
      case 'Enter':
      case ' ':
        e.preventDefault();
        onStepClick(stepIndex, step);
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        e.preventDefault();
        focusPreviousStep(stepIndex);
        break;
      case 'ArrowRight':
      case 'ArrowDown':
        e.preventDefault();
        focusNextStep(stepIndex);
        break;
      case 'Home':
        e.preventDefault();
        focusFirstClickableStep();
        break;
      case 'End':
        e.preventDefault();
        focusLastClickableStep();
        break;
    }
  }, [disabled, onStepClick, steps]);

  const focusPreviousStep = useCallback((currentIndex: number) => {
    if (!stepperRef.current) return;
    
    for (let i = currentIndex - 1; i >= 0; i--) {
      const step = steps[i];
      const isClickable = onStepClick && (step.status === 'finished' || step.status === 'current');
      if (isClickable) {
        const stepElement = stepperRef.current.querySelector(`[data-step-index="${i}"]`) as HTMLElement;
        if (stepElement) {
          stepElement.focus();
          return;
        }
      }
    }
  }, [steps, onStepClick]);

  const focusNextStep = useCallback((currentIndex: number) => {
    if (!stepperRef.current) return;
    
    for (let i = currentIndex + 1; i < steps.length; i++) {
      const step = steps[i];
      const isClickable = onStepClick && (step.status === 'finished' || step.status === 'current');
      if (isClickable) {
        const stepElement = stepperRef.current.querySelector(`[data-step-index="${i}"]`) as HTMLElement;
        if (stepElement) {
          stepElement.focus();
          return;
        }
      }
    }
  }, [steps, onStepClick]);

  const focusFirstClickableStep = useCallback(() => {
    if (!stepperRef.current) return;
    
    for (let i = 0; i < steps.length; i++) {
      const step = steps[i];
      const isClickable = onStepClick && (step.status === 'finished' || step.status === 'current');
      if (isClickable) {
        const stepElement = stepperRef.current.querySelector(`[data-step-index="${i}"]`) as HTMLElement;
        if (stepElement) {
          stepElement.focus();
          return;
        }
      }
    }
  }, [steps, onStepClick]);

  const focusLastClickableStep = useCallback(() => {
    if (!stepperRef.current) return;
    
    for (let i = steps.length - 1; i >= 0; i--) {
      const step = steps[i];
      const isClickable = onStepClick && (step.status === 'finished' || step.status === 'current');
      if (isClickable) {
        const stepElement = stepperRef.current.querySelector(`[data-step-index="${i}"]`) as HTMLElement;
        if (stepElement) {
          stepElement.focus();
          return;
        }
      }
    }
  }, [steps, onStepClick]);

  const getStepIcon = (step: Step, index: number) => {
    const iconSize = compact || size === 'small' ? 14 : size === 'large' ? 24 : 20;
    
    if (step.icon) {
      return <Icon name={step.icon} size={iconSize} />;
    }
    
    switch (step.status) {
      case 'finished':
        return <Icon name="checkmark" size={iconSize} />;
      case 'current':
        return <span className="stepper__number">{index + 1}</span>;
      case 'error':
        return <Icon name="warning" size={iconSize} />;
      case 'waiting':
      default:
        return <span className="stepper__number">{index + 1}</span>;
    }
  };

  // Build CSS classes using BEM methodology
  const stepperClasses = [
    'stepper',
    `stepper--${orientation}`,
    size && `stepper--${size}`,
    compact && 'stepper--compact',
    fillSpace && 'stepper--fill-space',
    disabled && 'stepper--disabled',
    error && 'stepper--error',
    className
  ].filter(Boolean).join(' ');

  const containerStyle: React.CSSProperties = {
    ...(width && { width }),
    ...(height && { height })
  };

  return (
    <div 
      ref={stepperRef}
      className={stepperClasses}
      style={containerStyle}
      role="tablist"
      aria-label={ariaLabel || 'Step progress'}
      aria-describedby={[ariaDescribedBy, typeof error === 'string' && errorId].filter(Boolean).join(' ')}
      aria-orientation={orientation}
    >
      {/* Error message */}
      {typeof error === 'string' && (
        <div 
          id={errorId}
          role="alert" 
          aria-live="polite"
          className="stepper__error"
        >
          {error}
        </div>
      )}

      {/* Background line for horizontal stepper */}
      {orientation === 'horizontal' && steps.length > 1 && (
        <div className="stepper__background-line" />
      )}
      
      {/* Progress lines for finished steps in horizontal layout */}
      {orientation === 'horizontal' && steps.map((step, index) => {
        if (index === steps.length - 1 || step.status !== 'finished') return null;
        
        const stepWidth = 100 / steps.length;
        const lineStart = (stepWidth * index) + (stepWidth / 2);
        const lineEnd = (stepWidth * (index + 1)) + (stepWidth / 2);
        
        return (
          <div
            key={`progress-line-${index}`}
            className="stepper__progress-line"
            style={{
              left: `${lineStart}%`,
              width: `${lineEnd - lineStart}%`
            }}
          />
        );
      })}
      
      {steps.map((step, index) => {
        const isClickable = onStepClick && (step.status === 'finished' || step.status === 'current') && !disabled;
        const isCurrent = step.status === 'current';
        
        const stepClasses = [
          'stepper__step',
          `stepper__step--${step.status}`,
          isClickable && 'stepper__step--clickable',
          isCurrent && 'stepper__step--current'
        ].filter(Boolean).join(' ');

        const circleClasses = [
          'stepper__circle',
          `stepper__circle--${step.status}`
        ].filter(Boolean).join(' ');

        const titleClasses = [
          'stepper__title',
          `stepper__title--${step.status}`,
          isCurrent && 'stepper__title--current'
        ].filter(Boolean).join(' ');

        return (
          <div
            key={step.id}
            className={stepClasses}
            data-step-index={index}
            role="tab"
            aria-selected={isCurrent}
            aria-current={isCurrent ? 'step' : undefined}
            tabIndex={isClickable ? 0 : -1}
            onClick={() => {
              if (isClickable) {
                onStepClick(index, step);
              }
            }}
            onKeyDown={(e) => handleKeyDown(e, index, step)}
          >
            {/* Step circle container */}
            <div className="stepper__circle-container">
              <div className={circleClasses}>
                {getStepIcon(step, index)}
              </div>
              
              {/* Vertical connector line */}
              {orientation === 'vertical' && index < steps.length - 1 && (
                <div 
                  className={[
                    'stepper__vertical-line',
                    step.status === 'finished' && 'stepper__vertical-line--finished'
                  ].filter(Boolean).join(' ')} 
                />
              )}
            </div>

            {/* Step content */}
            <div className="stepper__content">
              <h3 className={titleClasses}>{step.title}</h3>
              {showDescription && step.description && (
                <p className="stepper__description">{step.description}</p>
              )}
              
              {/* Expanded content for current step */}
              {expandedContent && step.status === 'current' && step.content && (
                <div className="stepper__expanded-content">
                  {step.content}
                  
                  {/* Action buttons */}
                  {step.actions && (
                    <div className="stepper__actions">
                      {step.actions}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Stepper;