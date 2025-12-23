import React, { useState } from 'react';
import { useTheme } from '../../../.storybook/theme-decorator';
import ODLTheme from '../../styles/ODLTheme';
import Icon from '../Icon/Icon';

export interface AccordionItem {
  id: string;
  title: string;
  content?: React.ReactNode;
  icon?: string;
  children?: AccordionItem[];
  defaultOpen?: boolean;
}

export interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
  nested?: boolean;
  showIcons?: boolean;
  variant?: 'default' | 'bordered' | 'filled';
  size?: 'small' | 'medium' | 'large';
  color?: 'primary' | 'secondary';
  expandPosition?: 'left' | 'right';
  className?: string;
  style?: React.CSSProperties;
}

const Accordion: React.FC<AccordionProps> = ({
  items,
  allowMultiple = true,
  nested = true,
  showIcons = true,
  variant = 'default',
  size = 'large',
  color = 'primary',
  expandPosition = 'right',
  className = '',
  style
}) => {
  const { colors } = useTheme();
  const [openItems, setOpenItems] = useState<Set<string>>(
    new Set(items.filter(item => item.defaultOpen).map(item => item.id))
  );
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const toggleItem = (itemId: string) => {
    const newOpenItems = new Set(openItems);

    if (!allowMultiple && !openItems.has(itemId)) {
      newOpenItems.clear();
    }

    if (newOpenItems.has(itemId)) {
      newOpenItems.delete(itemId);
    } else {
      newOpenItems.add(itemId);
    }

    setOpenItems(newOpenItems);
  };

  const handleAccordionKeyDown = (e: React.KeyboardEvent, itemId: string, hasContent: boolean) => {
    if (!hasContent) return;

    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleItem(itemId);
    }
  };

  const renderAccordionItem = (item: AccordionItem, level: number = 0, isLast: boolean = false): JSX.Element => {
    const isOpen = openItems.has(item.id);
    const isHovered = hoveredItem === item.id;
    const hasChildren = item.children && item.children.length > 0;
    const hasContent = item.content || hasChildren;

    return (
      <div
        key={item.id}
        style={{
          marginBottom: level === 0 && variant === 'default' ? '2px' : 0,
          marginLeft: level > 0 ? '20px' : 0,
        }}
      >
        <button
          type="button"
          onClick={() => hasContent && toggleItem(item.id)}
          onKeyDown={(e) => handleAccordionKeyDown(e, item.id, hasContent)}
          onMouseEnter={() => setHoveredItem(item.id)}
          onMouseLeave={() => setHoveredItem(null)}
          aria-expanded={hasContent ? isOpen : undefined}
          aria-controls={hasContent ? `accordion-content-${item.id}` : undefined}
          id={`accordion-header-${item.id}`}
          disabled={!hasContent}
          style={{
            padding: variant === 'filled' ? '16px 20px' : '14px 16px',
            background: variant === 'filled'
              ? isOpen
                ? colors.primaryMain
                : isHovered
                  ? colors.surfaceHover
                  : colors.grey100
              : isHovered
                ? colors.surfaceHover
                : colors.paper,
            border: variant === 'bordered'
              ? `1px solid ${colors.border}`
              : 'none',
            borderBottom: variant === 'default' && level === 0 && !isLast && !isOpen
              ? `1px solid ${colors.border}`
              : 'none',
            borderRadius: variant === 'bordered' ? '6px' : 0,
            cursor: hasContent ? 'pointer' : 'default',
            transition: 'all 0.2s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: expandPosition === 'left' ? 'flex-start' : 'space-between',
            gap: expandPosition === 'left' ? '12px' : '0',
            width: '100%',
            textAlign: 'left',
            font: 'inherit',
            color: 'inherit'
          }}
        >
          {/* Left expand icon */}
          {hasContent && expandPosition === 'left' && (
            <Icon
              name={isOpen ? 'chevron-up' : 'chevron-down'}
              size={20}
              color={variant === 'filled' && isOpen ? colors.textInverse : colors.textSecondary}
              style={{
                transition: 'transform 0.5s ease',
                transform: isOpen ? 'rotate(0deg)' : 'rotate(0deg)'
              }}
            />
          )}

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {showIcons && item.icon && (
              <Icon
                name={item.icon}
                size={18}
                color={variant === 'filled' && isOpen ? colors.textInverse : (
                  color === 'primary' ? colors.textPrimary : colors.textSecondary
                )}
              />
            )}
            <span
              style={{
                fontSize: level === 0 ? (
                  size === 'large' ? ODLTheme.typography.fontSize.lg :
                  size === 'medium' ? ODLTheme.typography.fontSize.md :
                  ODLTheme.typography.fontSize.base
                ) : ODLTheme.typography.fontSize.sm,
                fontWeight: level === 0 ? (
                  size === 'large' ? ODLTheme.typography.fontWeight.semibold :
                  size === 'medium' ? ODLTheme.typography.fontWeight.semibold :
                  ODLTheme.typography.fontWeight.bold
                ) : 400,
                color: variant === 'filled' && isOpen ? colors.textInverse : (
                  color === 'primary' ? colors.textPrimary : colors.textSecondary
                )
              }}
            >
              {item.title}
            </span>
          </div>
          
          {/* Right expand icon (default) */}
          {hasContent && expandPosition === 'right' && (
            <Icon
              name={isOpen ? 'chevron-up' : 'chevron-down'}
              size={20}
              color={variant === 'filled' && isOpen ? colors.textInverse : colors.textSecondary}
              style={{
                transition: 'transform 0.5s ease',
                transform: isOpen ? 'rotate(0deg)' : 'rotate(0deg)'
              }}
            />
          )}
        </button>

        {/* Content */}
        {isOpen && hasContent && (
          <div
            id={`accordion-content-${item.id}`}
            role="region"
            aria-labelledby={`accordion-header-${item.id}`}
            style={{
              padding: '16px',
              background: variant === 'bordered'
                ? colors.grey100
                : level > 0
                  ? colors.grey100
                  : colors.paper,
              borderTop: variant === 'bordered' ? `1px solid ${colors.border}` : 'none',
              borderBottom: `1px solid ${colors.border}`,
              color: colors.textSecondary,
              fontSize: ODLTheme.typography.fontSize.sm,
              lineHeight: 1.6
            }}
          >
            {item.content && (
              <div style={{ marginBottom: hasChildren ? '12px' : 0 }}>
                {item.content}
              </div>
            )}
            
            {/* Nested Children */}
            {nested && hasChildren && (
              <div>
                {item.children!.map(child => renderAccordionItem(child, level + 1))}
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      className={className}
      style={{
        background: colors.paper,
        borderRadius: variant === 'bordered' ? '8px' : '8px',
        border: variant !== 'bordered' ? `1px solid ${colors.border}` : 'none',
        overflow: 'hidden',
        ...style
      }}
    >
      {items.map((item, index) => renderAccordionItem(item, 0, index === items.length - 1))}
    </div>
  );
};

export default Accordion;