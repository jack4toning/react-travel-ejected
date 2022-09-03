import React from 'react';
import styles from './SideMenu.module.css';
import { sideMenuItemList } from './mockup';
import { Menu } from 'antd';
import { GifOutlined } from '@ant-design/icons';

export function SideMenu() {
  return (
    <Menu
      mode={'vertical'}
      className={styles['side-menu']}
      items={sideMenuItemList}
      itemIcon={<GifOutlined />}
    />
  );
}
