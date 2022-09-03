import React, { useEffect, useState } from 'react';
import logo from '../../assets/icons/logo.svg';
import styles from './Header.module.css';
import { Layout, Typography, Input, Menu, Button, Dropdown } from 'antd';
import { GlobalOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import languageData from '../../i18n/en.json';
import { changeLanguage } from '../../state/slices/language';
import i18n from 'i18next';
import { useSelector } from '../../state/hooks';
import { signOut } from '../../state/slices';
import jwtDecode, { JwtPayload as DefaultJwtPayload } from 'jwt-decode';

interface JwtPayload extends DefaultJwtPayload {
  username: string;
}

export function Header() {
  const navigate = useNavigate();
  const languageState = useSelector(state => state.language);
  const { items: shoppingCartItems, isLoading } = useSelector(
    state => state.shoppingCart
  );
  const { token: jwt } = useSelector(state => state.user);
  const myOrder = useSelector(state => state.order.currentOrder);
  const dispatch = useDispatch();

  // parse JWT to get username
  const [username, setUsername] = useState('');
  useEffect(() => {
    if (jwt) {
      const { username } = jwtDecode<JwtPayload>(jwt);
      setUsername(username);
    }
  }, [jwt]);

  const langMenuItems = languageState.languageList.map(
    (item: any, index: number) => ({
      label: item.name,
      key: item.code,
    })
  );

  const mainMenuItems: any = [];

  const [t] = useTranslation();
  Object.keys(languageData.mainMenu).forEach((key, index) => {
    mainMenuItems.push({ label: t(`mainMenu.${key}`), key: index });
  });

  const switchLanguage = (e: any) => {
    dispatch(changeLanguage(e.key));
    i18n.changeLanguage(e.key);
  };

  const onSignOut = () => {
    dispatch(signOut());
    navigate('/');
  };

  return (
    <div className={styles['app-header']}>
      <div className={styles['top-header']}>
        <div className={styles['inner']}>
          <Typography.Text>{t(`header.slogan`)}</Typography.Text>
          <Dropdown.Button
            style={{ marginLeft: 15 }}
            overlay={<Menu items={langMenuItems} onClick={switchLanguage} />}
            icon={<GlobalOutlined />}>
            {t(`header.language`)}
          </Dropdown.Button>
          <Button.Group className={styles['button-group']}>
            {jwt ? (
              <>
                <Typography.Text
                  strong
                  style={{ marginRight: 10, lineHeight: 2.4 }}>
                  Hi, {username}
                </Typography.Text>
                <Button loading={isLoading}>
                  <Link to={'/shoppingCart'}>
                    {t(`header.shoppingCart`)}({shoppingCartItems.length})
                  </Link>
                </Button>
                <Button>
                  <Link to={'/placeOrder'}>
                    {t(`header.myOrder`)}(
                    {myOrder ? (myOrder.state === 'Completed' ? 0 : 1) : 0})
                  </Link>
                </Button>
                <Button onClick={onSignOut}>{t(`header.signOut`)}</Button>
              </>
            ) : (
              <>
                <Button>
                  <Link to={'/sign/signUp'}>{t(`header.register`)}</Link>
                </Button>
                <Button>
                  <Link to={'/sign/signIn'}>{t(`header.login`)}</Link>
                </Button>
              </>
            )}
          </Button.Group>
        </div>
      </div>
      <Layout.Header className={'main-header'}>
        <img
          className={styles['App-logo']}
          src={logo}
          alt=''
          onClick={() => {
            navigate('/');
          }}
        />
        <Typography.Title className={styles['title']} level={3}>
          {t(`header.title`)}
        </Typography.Title>
        <Input.Search
          className={styles['search-input']}
          placeholder={t(`header.placeholder`)}
          onSearch={keywords => {
            navigate(`/products/filter/${keywords}`);
          }}
        />
      </Layout.Header>
      <Menu
        mode={'horizontal'}
        className={styles['main-menu']}
        items={mainMenuItems}
      />
    </div>
  );
}
