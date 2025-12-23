import React, { useCallback, KeyboardEvent, useRef, useEffect } from 'react';
import Icon from '../Icon/Icon';
import { ODLTheme } from '../../styles/ODLTheme';
import { useTheme } from '../../../.storybook/theme-decorator';

const ODLSpacing = ODLTheme.spacing;
const ODLTypography = ODLTheme.typography;

export interface SubStep {
  id: string;
  title: string;
  status: 'finished' | 'current' | 'waiting' | 'error';
}

export interface Step {
  id: string;
  title: string;
  description?: string;
  status: 'finished' | 'current' | 'waiting' | 'error';
  icon?: string;
  content?: React.ReactNode;
  actions?: React.ReactNode;
  substeps?: SubStep[];
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
  const { colors } = useTheme();
  const stepperRef = useRef<HTMLDivElement>(null);
  const errorId = useRef(`stepper-error-${Math.random().toString(36).substr(2, 9)}`).current;
  const styleRef = useRef<HTMLStyleElement | null>(null);

  // Inject dynamic styles for theme-aware colors
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .stepper__step--clickable:hover {
        background-color: ${colors.grey400} !important;
      }
      .stepper__step--clickable:focus-visible {
        outline: 2px solid ${colors.primaryMain} !important;
        outline-offset: 2px !important;
        border-radius: 4px !important;
      }
      .stepper__step--clickable:active {
        opacity: 0.9;
      }
    `;
    document.head.appendChild(style);
    styleRef.current = style;
    
    return () => {
      if (styleRef.current) {
        document.head.removeChild(styleRef.current);
        styleRef.current = null;
      }
    };
  }, [colors]);

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
    if (step.icon) {
      return <Icon name={step.icon} size={currentSize.iconSize} />;
    }
    
    switch (step.status) {
      case 'finished':
        return <Icon name="checkmark" size={currentSize.iconSize} />;
      case 'current':
        return <Icon name="edit" size={currentSize.iconSize} />;
      case 'error':
        return <Icon name="warning" size={currentSize.iconSize} />;
      case 'waiting':
      default:
        return (
          <span style={{
            fontSize: currentSize.fontSize,
            fontWeight: ODLTypography.fontWeight.semibold,
            lineHeight: 1,
          }}>
            {index + 1}
          </span>
        );
    }
  };

  // Size configurations
  const sizeConfig = {
    small: { circleSize: 32, iconSize: 14, fontSize: ODLTypography.fontSize.xs, gap: ODLSpacing[2] },
    medium: { circleSize: 44, iconSize: 20, fontSize: ODLTypography.fontSize.base, gap: ODLSpacing[3] },
    large: { circleSize: 52, iconSize: 24, fontSize: ODLTypography.fontSize.md, gap: ODLSpacing[4] }
  };

  const currentSize = compact ? sizeConfig.small : sizeConfig[size];

  const containerStyle: React.CSSProperties = {
    position: 'relative',
    fontFamily: ODLTypography.fontFamily.sans,
    display: 'flex',
    flexDirection: orientation === 'horizontal' ? 'row' : 'column',
    alignItems: orientation === 'horizontal' ? 'flex-start' : 'stretch',
    gap: orientation === 'vertical' ? (compact ? ODLSpacing[4] : ODLSpacing[6]) : '0',
    width: fillSpace ? '100%' : width,
    height: fillSpace ? '100%' : height,
    justifyContent: orientation === 'horizontal' && fillSpace ? 'space-between' : 'initial',
    opacity: disabled ? 0.6 : 1,
    pointerEvents: disabled ? 'none' : 'auto',
  };

  return (
    <div 
      ref={stepperRef}
      className={className}
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
          style={{
            padding: ODLSpacing[2],
            backgroundColor: colors.errorLight,
            color: colors.errorMain,
            borderRadius: ODLTheme.borders.radius.base,
            marginBottom: ODLSpacing[3],
            fontSize: currentSize.fontSize,
          }}
        >
          {error}
        </div>
      )}

      {/* Background line for horizontal stepper */}
      {orientation === 'horizontal' && steps.length > 1 && (
        <div 
          style={{
            position: 'absolute',
            height: '2px',
            backgroundColor: disabled ? colors.grey600 : colors.grey500,
            zIndex: 0,
            top: `${currentSize.circleSize / 2 - 1}px`,
            left: `${currentSize.circleSize / 2}px`,
            right: `${currentSize.circleSize / 2}px`,
          }}
        />
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
            style={{
              position: 'absolute',
              height: '2px',
              backgroundColor: disabled ? colors.grey600 : colors.successMain,
              zIndex: 1,
              transition: 'width 0.7s ease',
              top: `${currentSize.circleSize / 2 - 1}px`,
              left: `${lineStart}%`,
              width: `${lineEnd - lineStart}%`
            }}
          />
        );
      })}
      
      {steps.map((step, index) => {
        const isClickable = onStepClick && (step.status === 'finished' || step.status === 'current') && !disabled;
        const isCurrent = step.status === 'current';
        
        // Step container styles
        const stepStyles: React.CSSProperties = {
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          transition: 'all 0.2s ease',
          cursor: isClickable ? 'pointer' : 'default',
          flexDirection: orientation === 'horizontal' ? 'column' : 'row',
          flex: orientation === 'horizontal' ? 1 : 'none',
          textAlign: orientation === 'horizontal' ? 'center' : 'left',
          gap: orientation === 'vertical' ? currentSize.gap : 0,
          minHeight: orientation === 'vertical' ? `${currentSize.circleSize}px` : 'auto',
          paddingBottom: orientation === 'vertical' ? currentSize.gap : 0,
        };

        // Circle styles based on status
        const getCircleStyles = (): React.CSSProperties => {
          const baseStyles: React.CSSProperties = {
            width: `${currentSize.circleSize}px`,
            height: `${currentSize.circleSize}px`,
            minWidth: `${currentSize.circleSize}px`,
            minHeight: `${currentSize.circleSize}px`,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: currentSize.fontSize,
            fontWeight: ODLTypography.fontWeight.medium,
            transition: 'all 0.7s ease',
            border: '2px solid',
          };

          if (disabled) {
            return {
              ...baseStyles,
              backgroundColor: colors.grey600,
              borderColor: colors.grey600,
              color: colors.paper,
            };
          }

          switch (step.status) {
            case 'finished':
              return {
                ...baseStyles,
                backgroundColor: colors.successMain,
                borderColor: colors.successMain,
                color: colors.textInverse,
              };
            case 'current':
              return {
                ...baseStyles,
                backgroundColor: error ? colors.errorMain : colors.primaryMain,
                borderColor: error ? colors.errorMain : colors.primaryMain,
                color: colors.textInverse,
                fontWeight: ODLTypography.fontWeight.semibold,
              };
            case 'error':
              return {
                ...baseStyles,
                backgroundColor: colors.errorMain,
                borderColor: colors.errorMain,
                color: colors.textInverse,
              };
            case 'waiting':
            default:
              return {
                ...baseStyles,
                backgroundColor: colors.paper,
                borderColor: colors.grey500,
                color: colors.textSecondary,
              };
          }
        };

        // Title styles based on status
        const getTitleStyles = (): React.CSSProperties => {
          return {
            fontSize: ODLTypography.fontSize.base,
            fontWeight: '600',
            color: disabled ? colors.grey600 : (step.status === 'waiting' ? colors.textSecondary : colors.textPrimary),
            margin: 0,
            lineHeight: 1.2,
          };
        };

        return (
          <div
            key={step.id}
            className={isClickable ? 'stepper__step--clickable' : ''}
            data-step-index={index}
            role="tab"
            aria-selected={isCurrent}
            aria-current={isCurrent ? 'step' : undefined}
            aria-disabled={!isClickable}
            tabIndex={isClickable ? 0 : -1}
            onClick={() => {
              if (isClickable) {
                onStepClick(index, step);
              }
            }}
            onKeyDown={(e) => handleKeyDown(e, index, step)}
            style={stepStyles}
          >
            {/* Step circle container */}
            <div style={{ position: 'relative', zIndex: 2 }}>
              <div style={getCircleStyles()}>
                {getStepIcon(step, index)}
              </div>
              
              {/* Vertical connector line */}
              {orientation === 'vertical' && index < steps.length - 1 && (
                <div 
                  style={{
                    position: 'absolute',
                    left: `${currentSize.circleSize / 2 - 1}px`,
                    top: `${currentSize.circleSize}px`,
                    height: '100vh',
                    width: '2px',
                    backgroundColor: disabled ? colors.grey600 : (step.status === 'finished' ? colors.successMain : colors.grey500),
                    zIndex: 0,
                    transition: 'background-color 0.7s ease',
                  }}
                />
              )}
            </div>

            {/* Step content */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: ODLSpacing[1],
              width: '100%',
              alignItems: orientation === 'horizontal' ? 'center' : 'flex-start',
              textAlign: orientation === 'horizontal' ? 'center' : 'left',
              marginTop: orientation === 'horizontal' ? ODLSpacing[3] : 0,
            }}>
              <h3 style={getTitleStyles()}>{step.title}</h3>
              {showDescription && step.description && (
                <p style={{
                  fontSize: '14px',
                  color: disabled ? colors.grey600 : colors.textSecondary,
                  margin: 0,
                  lineHeight: 1.4,
                }}>{step.description}</p>
              )}
              
              {/* Substeps for vertical orientation only */}
              {orientation === 'vertical' && step.substeps && step.substeps.length > 0 && (
                <div style={{
                  marginTop: ODLSpacing[3],
                  marginLeft: `${currentSize.circleSize + ODLSpacing[3]}px`, // Position after the step circle
                  paddingLeft: ODLSpacing[3],
                  borderLeft: `2px solid ${disabled ? colors.grey600 : colors.grey400}`,
                }}>
                  {step.substeps.map((substep, subIndex) => {
                    const isSubstepClickable = onStepClick && (substep.status === 'finished' || substep.status === 'current') && !disabled;
                    
                    return (
                      <div
                        key={substep.id}
                        onClick={() => {
                          if (isSubstepClickable) {
                            onStepClick(index + 0.1 + (subIndex * 0.1), substep as any);
                          }
                        }}
                        onKeyDown={(e) => {
                          if (disabled) return;
                          if (!isSubstepClickable) return;
                          
                          switch (e.key) {
                            case 'Enter':
                            case ' ':
                              e.preventDefault();
                              onStepClick(index + 0.1 + (subIndex * 0.1), substep as any);
                              break;
                          }
                        }}
                        tabIndex={isSubstepClickable ? 0 : -1}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: ODLSpacing[2],
                          padding: `${ODLSpacing[1]} ${ODLSpacing[2]}`,
                          marginBottom: ODLSpacing[2],
                          cursor: isSubstepClickable ? 'pointer' : 'default',
                          borderRadius: ODLTheme.borders.radius.sm,
                          backgroundColor: substep.status === 'current' ? colors.selectedLight : 'transparent',
                          border: substep.status === 'current' ? `1px solid ${colors.primaryMain}` : '1px solid transparent',
                          position: 'relative',
                          transition: 'all 0.2s ease',
                          fontSize: ODLTypography.fontSize.sm,
                          color: disabled ? colors.grey600 : (substep.status === 'waiting' ? colors.textSecondary : colors.textPrimary),
                          fontWeight: substep.status === 'current' ? '600' : ODLTypography.fontWeight.medium,
                        }}
                        className={isSubstepClickable ? 'stepper__substep--clickable' : ''}
                      >
                        {/* Status dot */}
                        <div style={{
                          position: 'absolute',
                          left: '-7px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          width: '8px',
                          height: '8px',
                          borderRadius: '50%',
                          backgroundColor: disabled ? colors.grey600 : (
                            substep.status === 'finished' ? colors.successMain :
                            substep.status === 'current' ? colors.primaryMain :
                            substep.status === 'error' ? colors.errorMain :
                            colors.grey500
                          ),
                          border: `2px solid ${colors.paper}`,
                          zIndex: 1,
                        }} />
                        {substep.title}
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Expanded content for current step */}
              {expandedContent && step.status === 'current' && step.content && (
                <div style={{
                  marginTop: ODLSpacing[4],
                  padding: ODLSpacing[4],
                  backgroundColor: colors.grey100,
                  borderRadius: ODLTheme.borders.radius.base,
                  border: `1px solid ${colors.grey400}`,
                }}>
                  {step.content}
                  
                  {/* Action buttons */}
                  {step.actions && (
                    <div style={{
                      marginTop: ODLSpacing[4],
                      display: 'flex',
                      gap: ODLSpacing[2],
                      justifyContent: 'flex-end',
                    }}>
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