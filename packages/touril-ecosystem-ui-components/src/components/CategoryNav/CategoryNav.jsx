import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'motion/react';
import { ease } from '../../constants/motion';
import styles from './CategoryNav.module.scss';

/**
 * CategoryNav — Sticky category navigation for the Descobrir page.
 * Appears with a slide-down animation once the hero section exits the viewport.
 * Active category is tracked via IntersectionObserver on each section.
 * Active underline uses Framer Motion layoutId for a smooth sliding transition.
 * Mobile: horizontal scroll with CSS fade-edge masks; active item auto-centers.
 *
 * @param {Object} props
 * @param {Array<{id: string, label: string}>} props.items - Navigation items
 * @param {string} props.targetId - ID of the hero element to observe (nav shows when hero exits)
 * @param {number} props.headerHeight - Pixel height of the fixed site header (default: 72)
 * @param {string} props.className - Additional CSS classes
 * @returns {React.ReactElement}
 */
function CategoryNav({ items, targetId, headerHeight = 72, className = '' }) {
  // Show nav once hero has exited the viewport; start visible if no targetId
  const [isVisible, setIsVisible] = useState(!targetId);
  const [activeId, setActiveId] = useState(null);
  const itemRefs = useRef({});

  // Trigger visibility when the hero section leaves the viewport
  useEffect(() => {
    if (!targetId) return;
    const target = document.getElementById(targetId);
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(!entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, [targetId]);

  // Track which section is currently in view
  useEffect(() => {
    if (!items.length) return;
    const observers = [];

    items.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveId(id);
        },
        {
          // Reason: rootMargin accounts for header + CategoryNav height so the
          // active state updates when the section title reaches below both bars
          rootMargin: `-${headerHeight + 48}px 0px -40% 0px`,
          threshold: 0,
        }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [items, headerHeight]);

  // Auto-center active item on mobile when active section changes
  useEffect(() => {
    if (activeId && itemRefs.current[activeId]) {
      itemRefs.current[activeId].scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }
  }, [activeId]);

  /**
   * Smooth scroll to section with offset for header + nav bar height.
   */
  const handleClick = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    const navBarHeight = 48;
    const offset = headerHeight + navBarHeight + 16;
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  return (
    <motion.nav
      className={`${styles.nav} ${className}`}
      aria-label="Descobrir — secções"
      style={{ top: `${headerHeight}px` }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: '-100%', pointerEvents: 'none' }}
      initial={{ opacity: 0, y: '-100%' }}
      transition={{ 
        duration: isVisible ? 0.4 : 0.3, 
        ease: isVisible ? [0.22, 1, 0.36, 1] : "easeIn",
        opacity: { duration: isVisible ? 0.3 : 0.2, delay: isVisible ? 0 : 0.1 }
      }}
    >
      {/* Wrapper provides horizontal scroll on mobile with fade-edge masks */}
      <div className={styles.wrapper}>
        <div className={styles.inner}>
          {items.map(({ id, label }) => {
            const isActive = activeId === id;
            return (
              <a
                key={id}
                href={`#${id}`}
                ref={(el) => { itemRefs.current[id] = el; }}
                className={`${styles.item} ${isActive ? styles.itemActive : ''}`}
                onClick={(e) => handleClick(e, id)}
                aria-current={isActive ? 'true' : undefined}
              >
                <span className={styles.label}>{label}</span>

                {/* Framer Motion layoutId — underline slides smoothly between items */}
                {isActive && (
                  <motion.span
                    className={styles.underline}
                    layoutId="categoryNavUnderline"
                    transition={{ duration: 0.25, ease: ease.entrance }}
                  />
                )}
              </a>
            );
          })}
        </div>
      </div>
    </motion.nav>
  );
}

CategoryNav.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  targetId: PropTypes.string,
  headerHeight: PropTypes.number,
  className: PropTypes.string,
};

export default CategoryNav;
