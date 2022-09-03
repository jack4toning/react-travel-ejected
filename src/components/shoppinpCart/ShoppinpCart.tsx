import React from 'react';
import { Row, Col, Affix } from 'antd';
import { ProductList, PaymentCard } from '..';
import styles from './ShoppinpCart.module.css';
import { useDispatch } from 'react-redux';
import { useSelector } from '../../state/hooks';
import { checkout, emptyShoppingCartItem } from '../../state/slices';
import { useNavigate } from 'react-router-dom';

export const ShoppinpCart = () => {
  const { items, isLoading } = useSelector(state => state.shoppingCart);
  const jwt = useSelector(state => state.user.token) as string;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onShoppingCartClear = () => {
    dispatch<any>(
      emptyShoppingCartItem({ jwt, itemIds: items.map(item => item.id) })
    );
  };
  const onCheckout = () => {
    dispatch<any>(checkout(jwt));
    navigate('/placeOrder');
  };

  return (
    <>
      <Row>
        {/* shopping cart product list */}
        <Col span={16}>
          <div className={styles['product-list-container']}>
            <ProductList
              data={items.map(item => item.touristRoute)}
              loading={isLoading}
            />
          </div>
        </Col>
        {/* payment card*/}
        <Col span={8}>
          <Affix>
            <div className={styles['payment-card-container']}>
              <PaymentCard
                isCartEmpty={items.length === 0 ? true : false}
                loading={isLoading}
                originalPrice={items
                  .map(item => item.originalPrice)
                  .reduce((prev, cur) => prev + cur, 0)}
                price={
                  Math.floor(
                    items
                      .map(
                        item => item.originalPrice * (item.discountPresent || 1)
                      )
                      .reduce((prev, cur) => prev + cur, 0) * 1000
                  ) / 1000
                }
                onShoppingCartClear={onShoppingCartClear}
                onCheckout={onCheckout}
              />
            </div>
          </Affix>
        </Col>
      </Row>
    </>
  );
};
