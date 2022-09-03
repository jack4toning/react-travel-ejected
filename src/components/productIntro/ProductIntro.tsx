import React from 'react';
import styles from './ProductIntro.module.css';
import { Typography, Carousel, Image, Rate, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';

interface PropsType {
  title: string;
  description: string;
  price: string | number;
  discount: string | number;
  rating: string | number;
  pictures: any[];
}

const columns: ColumnsType<RowType> = [
  {
    title: 'title',
    dataIndex: 'title',
    key: 'title',
    align: 'left',
    width: 120,
  },
  {
    title: 'description',
    dataIndex: 'description',
    key: 'description',
    align: 'left',
  },
];

interface RowType {
  title: string;
  description: string | number | JSX.Element;
  key: number;
}

export const ProductIntro = ({
  title,
  description,
  price,
  discount,
  rating,
  pictures = [],
}: PropsType) => {
  const tableDataSource: RowType[] = [
    {
      key: 0,
      title: 'Route name',
      description: title,
    },
    {
      key: 1,
      title: 'Price',
      description: (
        <>
          <Typography.Text type="danger" strong>
            ${price}
          </Typography.Text>
        </>
      ),
    },
    {
      key: 2,
      title: 'Flash sale',
      description: discount ? (
        <>
          <Typography.Text delete>${price}</Typography.Text>{' '}
          <Typography.Text type="danger" strong>
            ${Math.floor(Number(price) * Number(discount) * 1000) / 1000}
          </Typography.Text>
        </>
      ) : (
        'No discount'
      ),
    },
    {
      key: 3,
      title: 'Discount',
      description: discount ? discount : 'No discount',
    },
    {
      key: 4,
      title: 'comments',
      description: (
        <>
          <Rate allowHalf defaultValue={+rating} />
          <Typography.Text style={{ marginLeft: 10 }}>
            {rating} points
          </Typography.Text>
        </>
      ),
    },
  ];

  return (
    <div className={styles['intro-container']}>
      <Typography.Title level={4}>{title}</Typography.Title>
      <Typography.Text>{description}</Typography.Text>
      <div className={styles['intro-detail-content']}>
        <Typography.Text style={{ marginLeft: 20 }}>
          <span className={styles['intro-detail-strong-text']}>${price}</span>{' '}
          each person
        </Typography.Text>
        <Typography.Text style={{ marginLeft: 50 }}>
          <span className={styles['intro-detail-strong-text']}>{rating}</span>{' '}
          points
        </Typography.Text>
      </div>
      <Carousel autoplay slidesToShow={3}>
        {pictures.map((p) => (
          <Image height={150} src={p.url} key={p.id} />
        ))}
      </Carousel>
      <Table
        columns={columns}
        dataSource={tableDataSource}
        size={'small'}
        bordered={false}
        pagination={false}
      />
    </div>
  );
};
