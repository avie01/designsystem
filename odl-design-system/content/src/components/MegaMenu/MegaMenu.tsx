import React, { useState, useRef, useEffect } from 'react';
import Icon from '../Icon/Icon';
import Chip from '../Chip/Chip';
import './MegaMenu.css';

export interface MegaMenuColumn {
  title: string;
  items: Array<{
    label: string;
    href?: string;
    icon?: string;
    description?: string;
    featured?: boolean;
    badge?: {
      label: string;
      variant?: 'premium' | 'new' | 'status' | 'default';
    };
  }>;
}

export interface MegaMenuSection {
  label: string;
  columns: MegaMenuColumn[];
  featured?: Array<{
    label: string;
    href?: string;
    icon?: string;
    image?: string;
  }>;
}

export interface MegaMenuProps {
  trigger: React.ReactNode;
  sections: MegaMenuSection[];
  onItemClick?: (item: string) => void;
  className?: string;
  position?: 'left' | 'center' | 'right';
  width?: 'wide' | 'extra-wide' | 'full';
  showSearch?: boolean;
  searchPlaceholder?: string;
  onSearch?: (term: string) => void;
}

const MegaMenu: React.FC<MegaMenuProps> = ({
  trigger,
  sections,
  onItemClick,
  className = '',
  position = 'left',
  width = 'wide',
  showSearch = false,
  searchPlaceholder = 'Search...',
  onSearch
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        menuRef.current &&
        triggerRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        !triggerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
      triggerRef.current?.focus();
    } else if (e.key === 'ArrowRight' && activeSection < sections.length - 1) {
      setActiveSection(activeSection + 1);
    } else if (e.key === 'ArrowLeft' && activeSection > 0) {
      setActiveSection(activeSection - 1);
    }
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    onSearch?.(value);
  };

  const handleItemClick = (label: string) => {
    onItemClick?.(label);
    setIsOpen(false);
  };

  const currentSection = sections[activeSection];
  const positionClass = `megamenu--${position}`;
  const widthClass = `megamenu--${width}`;

  return (
    <div className={`megamenu ${className}`}>
      {/* Trigger Button */}
      <button
        ref={triggerRef}
        className={`megamenu__trigger ${isOpen ? 'megamenu__trigger--active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
      >
        {trigger}
        <Icon name="chevron-down" size={16} />
      </button>

      {/* Menu Panel */}
      {isOpen && (
        <div
          ref={menuRef}
          className={`megamenu__panel ${positionClass} ${widthClass}`}
          role="dialog"
          aria-modal="true"
          onKeyDown={handleKeyDown}
        >
          {/* Search Bar */}
          {showSearch && (
            <div className="megamenu__search">
              <Icon name="search" size={16} />
              <input
                type="text"
                placeholder={searchPlaceholder}
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="megamenu__search-input"
              />
              {searchTerm && (
                <button
                  className="megamenu__search-clear"
                  onClick={() => handleSearch('')}
                  aria-label="Clear search"
                >
                  <Icon name="close" size={16} />
                </button>
              )}
            </div>
          )}

          <div className="megamenu__content">
            {/* Section Tabs */}
            <nav className="megamenu__tabs" role="tablist">
              {sections.map((section, idx) => (
                <button
                  key={idx}
                  className={`megamenu__tab ${
                    activeSection === idx ? 'megamenu__tab--active' : ''
                  }`}
                  onClick={() => setActiveSection(idx)}
                  onMouseEnter={() => setActiveSection(idx)}
                  role="tab"
                  aria-selected={activeSection === idx}
                  aria-controls={`megamenu-panel-${idx}`}
                >
                  {section.label}
                </button>
              ))}
            </nav>

            {/* Main Content Area */}
            <div className="megamenu__main">
              {/* Featured Items */}
              {currentSection.featured && currentSection.featured.length > 0 && (
                <div className="megamenu__featured">
                  <div className="megamenu__featured-title">Featured</div>
                  <div className="megamenu__featured-grid">
                    {currentSection.featured.map((item, idx) => (
                      <a
                        key={idx}
                        href={item.href || '#'}
                        className="megamenu__featured-item"
                        onClick={() => handleItemClick(item.label)}
                        onMouseEnter={() => setHoveredItem(`featured-${idx}`)}
                        onMouseLeave={() => setHoveredItem(null)}
                      >
                        {item.image && (
                          <div
                            className="megamenu__featured-image"
                            style={{ backgroundImage: `url(${item.image})` }}
                          />
                        )}
                        {item.icon && (
                          <div className="megamenu__featured-icon">
                            <Icon name={item.icon} size={32} />
                          </div>
                        )}
                        <div className="megamenu__featured-label">{item.label}</div>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Columns */}
              <div className="megamenu__columns">
                {currentSection.columns.map((column, colIdx) => (
                  <div key={colIdx} className="megamenu__column">
                    <h3 className="megamenu__column-title">{column.title}</h3>
                    <ul className="megamenu__list">
                      {column.items.map((item, itemIdx) => (
                        <li key={itemIdx}>
                          <a
                            href={item.href || '#'}
                            className={`megamenu__item ${
                              item.featured ? 'megamenu__item--featured' : ''
                            } ${
                              hoveredItem === `${colIdx}-${itemIdx}`
                                ? 'megamenu__item--hovered'
                                : ''
                            }`}
                            onClick={() => handleItemClick(item.label)}
                            onMouseEnter={() => setHoveredItem(`${colIdx}-${itemIdx}`)}
                            onMouseLeave={() => setHoveredItem(null)}
                          >
                            {item.icon && (
                              <span className="megamenu__item-icon">
                                <Icon name={item.icon} size={16} />
                              </span>
                            )}
                            <div className="megamenu__item-content">
                              <div className="megamenu__item-header">
                                <span className="megamenu__item-label">{item.label}</span>
                                {item.badge && (
                                  <Chip
                                    label={item.badge.label}
                                    variant={item.badge.variant === 'premium' ? 'success' : item.badge.variant === 'new' ? 'info' : item.badge.variant === 'status' ? 'warning' : 'grey'}
                                    size="xs"
                                  />
                                )}
                              </div>
                              {item.description && (
                                <span className="megamenu__item-description">
                                  {item.description}
                                </span>
                              )}
                            </div>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="megamenu__footer">
            <p className="megamenu__footer-text">
              Need help? <a href="#help">Contact support</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MegaMenu;
