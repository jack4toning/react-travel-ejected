import React from 'react';
import styles from './ProductCollection.module.css';
import { Row, Col, Divider } from 'antd';
import { ProductOverview } from '../../components';

interface PropsType {
  title: JSX.Element;
  sideImage: string;
  products: any[];
}

export const ProductCollection: React.FC<PropsType> = ({
  title,
  sideImage,
  products = [],
}) => {
  const derivedProducts = [];
  for (let i = 0; i < 8; i++) {
    derivedProducts.push(
      <ProductOverview
        key={products[i].id}
        size={i < 4 ? 'large' : 'small'}
        id={products[i].id}
        title={products[i].title}
        imageSrc={products[i].touristRoutePictures[0].url}
        price={products[i].price}
      />
    );
  }

  return (
    <div className={styles.content}>
      <Divider orientation="left">{title}</Divider>
      <Row>
        <Col span={4}>
          <img src={sideImage} className={styles['side-image']} alt="" />
        </Col>
        <Col span={20}>
          <Row>
            <Col span={12}>{derivedProducts.slice(0, 2)}</Col>
            <Col span={12}>{derivedProducts.slice(2, 4)}</Col>
          </Row>
          <Row>
            <Col span={6}>{derivedProducts[4]}</Col>
            <Col span={6}>{derivedProducts[5]}</Col>
            <Col span={6}>{derivedProducts[6]}</Col>
            <Col span={6}>{derivedProducts[7]}</Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};
