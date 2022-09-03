import React from 'react';
import { Link } from 'react-router-dom';
import { List, Rate, Space, Image, Tag, Typography, Spin } from 'antd';
import { LikeOutlined, StarOutlined } from '@ant-design/icons';
import styles from './ProductList.module.css';

const { Text } = Typography;

interface Product {
  departureCity: string;
  description: string;
  discountPresent: number;
  id: string;
  originalPrice: number;
  price: number;
  rating: number;
  title: string;
  touristRoutePictures: any[];
  travelDays: string;
  tripType: string;
}
interface PropsType {
  data: Product[];
  paging?: any;
  onPageChange?: (nextPage: any, pageSize: any) => void;
  loading?: boolean;
}

const listData = (productList: Product[]) =>
  productList.map((p) => ({
    id: p.id,
    title: p.title,
    description: p.description,
    tags: (
      <>
        {p.departureCity && <Tag color="#f50">{p.departureCity}出发</Tag>}
        {p.travelDays && <Tag color="#108ee9">{p.travelDays} 天 </Tag>}
        {p.discountPresent && <Tag color="#87d068">超低折扣</Tag>}
        {p.tripType && <Tag color="#2db7f5">{p.tripType}</Tag>}
      </>
    ),
    imgSrc: p.touristRoutePictures[0].url,
    price: p.price,
    originalPrice: p.originalPrice,
    discountPresent: p.discountPresent,
    rating: p.rating,
  }));

const IconText = ({ icon, text }: any) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

export const ProductList: React.FC<PropsType> = ({
  data,
  paging,
  onPageChange,
  loading,
}) => {
  if (loading)
    return (
      <div className={styles['spinner']}>
        <Spin size="large" />
      </div>
    );

  const products = listData(data);
  return (
    <List
      itemLayout="vertical"
      size="large"
      pagination={
        paging
          ? {
              current: paging.currentPage,
              onChange: (page) =>
                onPageChange && onPageChange(page, paging.pageSize),
              pageSize: paging.pageSize,
              total: paging.totalCount,
            }
          : false
      }
      dataSource={products}
      footer={
        paging && (
          <div>
            当前页搜索线路: <Text strong>{data.length}</Text> 条
          </div>
        )
      }
      renderItem={(item, index) => (
        <List.Item
          key={index}
          actions={[
            <IconText
              icon={StarOutlined}
              text="156"
              key="list-vertical-star-o"
            />,
            <IconText
              icon={LikeOutlined}
              text="156"
              key="list-vertical-like-o"
            />,
            <>
              <Rate defaultValue={3} />
              <Text strong className="ant-rate-text">
                {item.rating}
              </Text>
            </>,
          ]}
          extra={
            <Image width={272} height={172} alt="image" src={item.imgSrc} />
          }
        >
          <List.Item.Meta
            title={
              <>
                {item.discountPresent ? (
                  <>
                    <Text style={{ fontSize: 20, fontWeight: 400 }} delete>
                      ${item.originalPrice}
                    </Text>
                    <Text
                      type="danger"
                      style={{ fontSize: 20, fontWeight: 400 }}
                    >
                      {' '}
                      ${item.price}
                    </Text>
                  </>
                ) : (
                  <Text style={{ fontSize: 20, fontWeight: 400 }}>
                    ${item.price}
                  </Text>
                )}
                <Link to={'/product/' + item.id}> {item.title}</Link>
              </>
            }
            description={item.tags}
          />
          {item.description}
        </List.Item>
      )}
    />
  );
};
