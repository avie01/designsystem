import React, { useState } from 'react';
import ODLTheme from '../../styles/ODLTheme';
import Icon from '../Icon/Icon';
import './Accordion.css';

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
  className?: string;
  style?: React.CSSProperties;
}

const Accordion: React.FC<AccordionProps> = ({
  items,
  allowMultiple = true,
  nested = true,
  showIcons = true,
  variant = 'default',
  className = '',
  style
}) => {
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
          marginBottom: level === 0 && variant === 'default' ? `${ODLTheme.spacing[0]}px` : 0,
          marginLeft: level > 0 ? `${ODLTheme.spacing[5]}px` : 0,
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
            padding: `${ODLTheme.spacing[4]} ${ODLTheme.spacing[5]}`,
            background: variant === 'filled'
              ? isOpen
                ? ODLTheme.colors.primary
                : isHovered
                  ? ODLTheme.colors.grey100
                  : ODLTheme.colors.grey50
              : isHovered
                ? ODLTheme.colors.surfaceHover
                : 'white',
            border: variant === 'bordered'
              ? `${ODLTheme.borders.width.thin} solid ${ODLTheme.colors.grey200}`
              : 'none',
            borderBottom: variant === 'default' && level === 0 && !isLast
              ? `${ODLTheme.borders.width.thin} solid ${ODLTheme.colors.grey200}`
              : 'none',
            borderRadius: variant === 'bordered' ? ODLTheme.borders.radius.sm : 0,
            cursor: hasContent ? 'pointer' : 'default',
            transition: ODLTheme.transitions.slow,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            textAlign: 'left',
            font: 'inherit',
            color: 'inherit'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: ODLTheme.spacing[3] }}>
            {showIcons && item.icon && (
              <Icon
                name={item.icon}
                size={parseInt(ODLTheme.spacing[4])}
                color={variant === 'filled' && isOpen ? 'white' : ODLTheme.colors.grey500}
              />
            )}
            <span
              style={{
                fontSize: level === 0 ? ODLTheme.typography.fontSize.base : ODLTheme.typography.fontSize.sm,
                fontWeight: level === 0 ? ODLTheme.typography.fontWeight.medium : ODLTheme.typography.fontWeight.normal,
                color: variant === 'filled' && isOpen ? 'white' : ODLTheme.colors.text.primary
              }}
            >
              {item.title}
            </span>
          </div>

          {hasContent && (
            <Icon
              name="chevron-right"
              size={parseInt(ODLTheme.spacing[3])}
              color={variant === 'filled' && isOpen ? 'white' : ODLTheme.colors.grey700}
              style={{
                transition: ODLTheme.transitions.slow,
                transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)'
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
              padding: variant === 'bordered'
                ? `${ODLTheme.spacing[4]} ${ODLTheme.spacing[5]}`
                : `${ODLTheme.spacing[4]} ${ODLTheme.spacing[4]} ${ODLTheme.spacing[4]} ${ODLTheme.spacing[8]}`,
              background: variant === 'bordered'
                ? ODLTheme.colors.grey50
                : level > 0
                  ? ODLTheme.colors.grey50
                  : 'white',
              borderTop: variant === 'bordered' ? `${ODLTheme.borders.width.thin} solid ${ODLTheme.colors.grey200}` : 'none',
              color: ODLTheme.colors.textLight,
              fontSize: ODLTheme.typography.fontSize.sm,
              lineHeight: 1.6,
              animation: 'slideDown 0.4s ease-in-out'
            }}
          >
            {item.content && (
              <div style={{ marginBottom: hasChildren ? ODLTheme.spacing[3] : 0 }}>
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
        background: 'white',
        borderRadius: ODLTheme.borders.radius.md,
        border: variant !== 'bordered' ? `${ODLTheme.borders.width.thin} solid ${ODLTheme.colors.grey200}` : 'none',
        overflow: 'hidden',
        ...style
      }}
    >
      {items.map((item, index) => renderAccordionItem(item, 0, index === items.length - 1))}
    </div>
  );
};

export default Accordion;