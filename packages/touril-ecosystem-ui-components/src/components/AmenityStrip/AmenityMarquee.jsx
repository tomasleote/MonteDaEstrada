import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { motion, useMotionValue, useAnimationFrame } from 'motion/react';
import styles from './AmenityStrip.module.scss';

// Gentle drift speed in px/s — a whisper, matching the strip's tone
const DRIFT_SPEED = 26;

/**
 * AmenityMarquee — infinite left-to-right drifting row for mobile.
 * Content is rendered twice so the loop is seamless; the track is
 * draggable on the x axis and the drift pauses while the user is
 * touching or dragging it.
 */
const AmenityMarquee = ({ children }) => {
  const x = useMotionValue(0);
  const trackRef = useRef(null);
  const loopWidth = useRef(0);
  const pausedRef = useRef(false);

  useEffect(() => {
    const measure = () => {
      if (trackRef.current) {
        loopWidth.current = trackRef.current.scrollWidth / 2;
      }
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [children]);

  // Keep x within (-loopWidth, 0] — both halves are identical, so
  // re-anchoring by one loop width is visually seamless.
  const wrap = (value) => {
    const width = loopWidth.current;
    if (!width) return value;
    let next = value % width;
    if (next > 0) next -= width;
    return next;
  };

  useAnimationFrame((_, delta) => {
    if (pausedRef.current || !loopWidth.current) return;
    // Reason: after a background-tab pause the first delta can be huge —
    // clamping prevents a visible jump when the drift resumes.
    const clamped = Math.min(delta, 64);
    x.set(wrap(x.get() + (DRIFT_SPEED * clamped) / 1000));
  });

  const pause = () => {
    pausedRef.current = true;
  };

  const resume = () => {
    pausedRef.current = false;
    x.set(wrap(x.get()));
  };

  return (
    <div className={styles.marquee}>
      <motion.div
        ref={trackRef}
        className={styles.marqueeTrack}
        style={{ x }}
        drag="x"
        dragMomentum={false}
        onPointerDown={pause}
        onPointerUp={resume}
        onPointerCancel={resume}
        onDragEnd={resume}
      >
        <div className={styles.marqueeGroup}>{children}</div>
        <div className={styles.marqueeGroup} aria-hidden="true">
          {children}
        </div>
      </motion.div>
    </div>
  );
};

AmenityMarquee.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AmenityMarquee;
