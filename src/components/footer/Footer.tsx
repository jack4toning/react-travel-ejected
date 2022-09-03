import React from 'react';
// import styles from './Footer.module.css';
import { Layout, Typography } from 'antd';

export function Footer() {
  return (
    <Layout.Footer style={{ textAlign: 'center' }}>
      <Typography.Text>Copyright reserve@Travel website</Typography.Text>
    </Layout.Footer>
  );
}
