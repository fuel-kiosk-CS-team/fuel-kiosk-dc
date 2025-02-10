import React from 'react';
import styles from './TotalizerVerification.module.css';

export function TotalizerVerification({ value, onVerify, onBack }) {
  return (
    <div className={styles.container}>
      <h2 className={styles.header}>
        Verify Totalizer Start: {value}
      </h2>

      <div className={styles.buttonRow}>
        <button onClick={() => onVerify(true)} className={styles.button}>
          YES
        </button>
        <button onClick={() => onVerify(false)} className={styles.button}>
          NO
        </button>
      </div>

      <button onClick={onBack} className={styles.backButton}>
        BACK
      </button>
    </div>
  );
}