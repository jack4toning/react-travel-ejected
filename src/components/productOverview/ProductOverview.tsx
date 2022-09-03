import React from 'react';
// import styles from './ProductOverview.module.css';
import { Image, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';

interface PropsType {
  size: 'large' | 'small';
  id: number;
  title: string;
  imageSrc: string;
  price: string;
}

export const ProductOverview: React.FC<PropsType> = ({
  size,
  id,
  title,
  imageSrc,
  price,
}) => {
  const measurement = { height: 285, width: 490 };
  if (size === 'small') {
    measurement.height = 120;
    measurement.width = 240;
  }

  const navigate = useNavigate();

  return (
    <div>
      <Image
        src={imageSrc}
        {...measurement}
        onClick={() => {
          navigate(`/products/${id}`);
          window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        }}
      />
      <div>
        <Typography.Text type={'secondary'}>
          {title.slice(0, 25)}
        </Typography.Text>
        <Typography.Text strong type={'danger'}>
          {' '}
          ${price} minimum
        </Typography.Text>
      </div>
    </div>
  );
};
