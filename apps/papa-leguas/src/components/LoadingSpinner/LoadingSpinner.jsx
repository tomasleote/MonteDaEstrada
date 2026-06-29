import styles from './LoadingSpinner.module.scss';

const LoadingSpinner = () => (
  <div className={styles.spinnerContainer}>
    <div className={styles.spinner} role="status" aria-label="Loading">
      <div className={styles.spinnerCircle}></div>
    </div>
    <p className={styles.loadingText}>A carregar...</p>
  </div>
);

export default LoadingSpinner;
