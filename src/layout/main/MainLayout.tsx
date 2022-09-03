import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header, Footer } from '../../components';
import styles from './MainLayout.module.css';

export const MainLayout = () => {
  return (
    <>
      <Header />
      <div className={styles['page-content']}>
        <Outlet />
      </div>
      <Footer />
    </>
  );
};
