import React from 'react';
import styles from './Spinner.module.css';
import { Spin } from 'antd';

export function Spinner() {
  return (
    <div className={styles['spinner']}>
      <Spin size={'large'} />
    </div>
  );
}
