import React from 'react';
import styles from './Cooperative.module.css';
import { Divider, Row, Col } from 'antd';

interface PropsType {
  title: JSX.Element;
  coopImages: string[];
}

export const Cooperative: React.FC<PropsType> = ({ title, coopImages }) => {
  return (
    <div className={styles.content}>
      <Divider orientation='left'>{title}</Divider>
      <Row>
        <Col span={6}>
          <img src={coopImages[0]} className={styles.img} alt={''} />
        </Col>
        <Col span={6}>
          <img src={coopImages[1]} className={styles.img} alt={''} />
        </Col>
        <Col span={6}>
          <img src={coopImages[2]} className={styles.img} alt={''} />
        </Col>
        <Col span={6}>
          <img src={coopImages[3]} className={styles.img} alt={''} />
        </Col>
      </Row>
    </div>
  );
};
