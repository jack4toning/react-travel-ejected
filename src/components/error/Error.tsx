import React from 'react';
import styles from './Error.module.css';

export function Error({ error }: { error: string }) {
  return <div className={styles['error']}>Error: {error}</div>;
}
