import React from 'react';
import styles from './SignInUpLayout.module.css';
import logo from '../../assets/icons/logo.svg';
import { Link, Outlet } from 'react-router-dom';
import { CaretDownOutlined } from '@ant-design/icons';
import { Layout, Menu, Dropdown, Button } from 'antd';
const { Header, Footer, Content } = Layout;

export const SignInUpLayout = () => {
  const menu = (
    <Menu>
      <Menu.Item>中文</Menu.Item>
      <Menu.Item>English</Menu.Item>
    </Menu>
  );

  return (
    <Layout className={styles['user-layout-container']}>
      <Header className={styles['header']}>
        <div className={styles['lang']}>
          <Dropdown overlay={menu}>
            <Button>
              {' '}
              Language <CaretDownOutlined />
            </Button>
          </Dropdown>
        </div>
      </Header>
      <Content className={styles['content']}>
        <div className={styles['top']}>
          <div className={styles['content-header']}>
            <Link to="/">
              <img alt="logo" className={styles['logo']} src={logo} />
              <span className={styles['title']}>React travel</span>
            </Link>
          </div>
          <div className={styles['desc']}>
            React travel for best travel service in the world.
          </div>
          <Outlet />
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Contact us for better experience
      </Footer>
    </Layout>
  );
};
