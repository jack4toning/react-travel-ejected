import React from 'react';
import { PaymentForm, CheckoutCard } from '..';
import { Col, Row, Typography } from 'antd';
import { useDispatch } from 'react-redux';
import { useSelector } from '../../state/hooks';
import { placeOrder } from '../../state/slices';

export const PlaceOrder = () => {
  const dispatch = useDispatch();
  const { isLoading, error, currentOrder } = useSelector(state => state.order);
  const jwt = useSelector(state => state.user.token) as string;
  const orderId = currentOrder?.id;

  const onCheckout = () => {
    dispatch<any>(placeOrder({ jwt, orderId }));
  };

  return (
    <>
      <Row>
        <Col span={12}>
          <PaymentForm />
        </Col>
        <Col span={12}>
          <CheckoutCard
            loading={isLoading}
            order={currentOrder}
            onCheckout={onCheckout}
          />
        </Col>
      </Row>
      {error && (
        <Row style={{ marginTop: 20 }}>
          <Col span={24} style={{ textAlign: 'center' }}>
            <Typography.Text type={'danger'}>Error: {error}</Typography.Text>
          </Col>
        </Row>
      )}
    </>
  );
};
