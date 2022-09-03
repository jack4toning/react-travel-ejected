import React, { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { fetchProduct } from '../../state/slices/product';
import { useSelector } from '../../state/hooks';
import { useDispatch } from 'react-redux';
import styles from './Product.module.css';
import { Error, ProductIntro, Spinner, ProductComments } from '..';
import {
  Row,
  Col,
  DatePicker,
  Divider,
  Typography,
  Anchor,
  Menu,
  Button,
} from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { addShoppingCartItem } from '../../state/slices';
import { commentMockData } from './mockup';

export const Product = () => {
  const { productId } = useParams();
  const { product, isLoading, error } = useSelector((state) => state.product);
  const { token: jwt } = useSelector((state) => state.user);
  const { isLoading: shoppingCartLoading } = useSelector(
    (state) => state.shoppingCart
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    dispatch<any>(fetchProduct(productId));
  }, [dispatch, productId]);

  if (!productId)
    return <div className={styles['error']}>Error: product not found</div>;

  if (isLoading) return <Spinner />;

  if (error) return <Error error={error} />;

  const {
    title,
    description,
    price,
    discountPresent: discount,
    rating,
    touristRoutePictures: pictures,
    features,
    fees,
    notes,
  } = product;

  const introProps = {
    title,
    description,
    price,
    discount,
    rating,
    pictures,
  };

  const addToCart = () => {
    if (jwt !== null)
      dispatch<any>(addShoppingCartItem({ jwt, touristRouteId: productId }));
    else navigate('/sign/signIn', { state: { from: location }, replace: true });
  };

  const menuItems = [
    {
      label: (
        <Anchor.Link
          href="#feature"
          title="product feature"
          className={styles['anchor-link']}
        ></Anchor.Link>
      ),
      key: 'feature',
    },
    {
      label: (
        <Anchor.Link
          href="#fee"
          title="product Fee"
          className={styles['anchor-link']}
        ></Anchor.Link>
      ),
      key: 'fee',
    },
    {
      label: (
        <Anchor.Link
          href="#booking"
          title="booking instructions"
          className={styles['anchor-link']}
        ></Anchor.Link>
      ),
      key: 'booking',
    },
    {
      label: (
        <Anchor.Link
          href="#comments"
          title="comments"
          className={styles['anchor-link']}
        ></Anchor.Link>
      ),
      key: 'comments',
    },
  ];

  return (
    <>
      {/* product intro and date picker */}
      <div className={styles['product-intro-contaitner']}>
        <Row>
          <Col span={13}>
            <ProductIntro {...introProps} />
          </Col>
          <Col span={11}>
            <Button
              style={{ marginTop: 50, marginBottom: 30, display: 'block' }}
              type={'primary'}
              danger
              loading={shoppingCartLoading}
              onClick={addToCart}
            >
              <ShoppingCartOutlined />
              Add to cart
            </Button>
            <DatePicker.RangePicker open style={{ marginTop: 20 }} />
          </Col>
        </Row>
      </div>
      {/* anchor menu */}
      <Anchor className={styles['product-anchor-menu']} targetOffset={60}>
        <Menu mode="horizontal" items={menuItems} />
      </Anchor>
      {/* product feature */}
      <div id="feature" className={styles['product-detail-container']}>
        <Divider>
          <Typography.Title level={3}>Feature</Typography.Title>
        </Divider>
        <div
          dangerouslySetInnerHTML={{ __html: features }}
          style={{ margin: 40 }}
        ></div>
      </div>
      {/* product fee */}
      <div id="fee" className={styles['product-detail-container']}>
        <Divider>
          <Typography.Title level={3}>Fee</Typography.Title>
        </Divider>
        <div
          dangerouslySetInnerHTML={{ __html: fees }}
          style={{ margin: 40 }}
        ></div>
      </div>
      {/* booking insructions */}
      <div id="booking" className={styles['product-detail-container']}>
        <Divider>
          <Typography.Title level={3}>Booking instructions</Typography.Title>
        </Divider>
        <div
          dangerouslySetInnerHTML={{ __html: notes }}
          style={{ margin: 40 }}
        ></div>
      </div>
      {/* comments */}
      <div id="comments" className={styles['product-detail-container']}>
        <Divider>
          <Typography.Title level={3}>Comments</Typography.Title>
        </Divider>
        <div style={{ margin: 40 }}>
          <ProductComments data={commentMockData} />
        </div>
      </div>
    </>
  );
};
