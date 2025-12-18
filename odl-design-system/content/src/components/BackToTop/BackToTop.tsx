import React, { useState, useEffect } from 'react';
import Icon from '../Icon/Icon';
import { ODLTheme } from '../../styles/ODLTheme';

const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    const checkReducedMotion = () => {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mediaQuery.matches);
    };

    checkReducedMotion();
    window.addEventListener('scroll', toggleVisibility);
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    mediaQuery.addEventListener('change', checkReducedMotion);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
      mediaQuery.removeEventListener('change', checkReducedMotion);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? 'auto' : 'smooth'
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          aria-label="Back to top"
          style={{
            position: 'fixed',
            bottom: `${ODLTheme.spacing[8]}px`,
            right: `${ODLTheme.spacing[8]}px`,
            width: `${ODLTheme.spacing[12]}px`,
            height: `${ODLTheme.spacing[12]}px`,
            borderRadius: '50%',
            background: `linear-gradient(135deg, ${ODLTheme.colors.primary}, ${ODLTheme.colors.primaryHover})`,
            color: 'white',
            border: 'none',
            boxShadow: ODLTheme.shadows.md,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: ODLTheme.zIndex.dropdown,
            transition: prefersReducedMotion ? 'none' : ODLTheme.transitions.base,
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'scale(1)' : 'scale(0.8)',
            outline: 'none'
          }}
          onMouseEnter={(e) => {
            if (!prefersReducedMotion) {
              e.currentTarget.style.transform = 'scale(1.1)';
              e.currentTarget.style.boxShadow = ODLTheme.shadows.lg;
            }
          }}
          onMouseLeave={(e) => {
            if (!prefersReducedMotion) {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = ODLTheme.shadows.md;
            }
          }}
          onFocus={(e) => {
            e.currentTarget.style.outline = `${ODLTheme.borders.width.focus} solid ${ODLTheme.colors.primary}`;
            e.currentTarget.style.outlineOffset = `${ODLTheme.spacing[1]}px`;
          }}
          onBlur={(e) => {
            e.currentTarget.style.outline = 'none';
          }}
        >
          <Icon name="arrow-up" size={20} />
        </button>
      )}
    </>
  );
};

export default BackToTop;