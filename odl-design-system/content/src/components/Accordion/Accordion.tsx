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
                ? ODLTheme.colors.primary
                : isHovered
                  ? ODLTheme.colors.grey100
                  : ODLTheme.colors.grey50
              : isHovered
                ? ODLTheme.colors.grey400
                : 'white',
            border: variant === 'bordered'
              ? `1px solid ${ODLTheme.colors.grey200}`
              : 'none',
            borderBottom: variant === 'default' && level === 0 && !isLast
              ? `1px solid ${ODLTheme.colors.grey200}`
              : 'none',
            borderRadius: variant === 'bordered' ? '6px' : 0,
            cursor: hasContent ? 'pointer' : 'default',
            transition: 'all 0.4s ease-in-out',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            textAlign: 'left',
            font: 'inherit',
            color: 'inherit'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {showIcons && item.icon && (
              <Icon
                name={item.icon}
                size={18}
                color={variant === 'filled' && isOpen ? 'white' : ODLTheme.colors.grey500}
              />
            )}
            <span
              style={{
                fontSize: level === 0 ? ODLTheme.typography.fontSize.base : ODLTheme.typography.fontSize.sm,
                fontWeight: level === 0 ? 500 : 400,
                color: variant === 'filled' && isOpen ? 'white' : ODLTheme.colors.text.primary
              }}
            >
              {item.title}
            </span>
          </div>
          
          {hasContent && (
            <Icon
              name="chevron-right"
              size={16}
              color={variant === 'filled' && isOpen ? 'white' : ODLTheme.colors.grey700}
              style={{
                transition: 'transform 0.4s ease-in-out',
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
                ? '16px 20px'
                : level > 0
                  ? '12px 16px 12px 32px'
                  : '16px 16px 16px 32px',
              background: variant === 'bordered'
                ? ODLTheme.colors.grey50
                : level > 0
                  ? ODLTheme.colors.grey50
                  : 'white',
              borderTop: variant === 'bordered' ? `1px solid ${ODLTheme.colors.grey200}` : 'none',
              color: ODLTheme.colors.textLight,
              fontSize: ODLTheme.typography.fontSize.sm,
              lineHeight: 1.6,
              animation: 'slideDown 0.4s ease-in-out'
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
        background: 'white',
        borderRadius: variant === 'bordered' ? '8px' : '8px',
        border: variant !== 'bordered' ? `1px solid ${ODLTheme.colors.grey200}` : 'none',
        overflow: 'hidden',
        ...style
      }}
    >
      {items.map((item, index) => renderAccordionItem(item, 0, index === items.length - 1))}
    </div>
  );
};

export default Accordion;