import React from 'react';
import styles from './LoadingSpinner.module.scss';

/**
 * Loading spinner component for Suspense fallback
 * Used when lazy-loading page components
 */
const LoadingSpinner = () => {
  return (
    <div className={styles.spinnerContainer}>
      <div className={styles.spinner} role="status" aria-label="Loading">
        <div className={styles.spinnerCircle}></div>
      </div>
      <p className={styles.loadingText}>A carregar...</p>
    </div>
  );
};

export default LoadingSpinner;
