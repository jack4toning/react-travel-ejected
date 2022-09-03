import React, { useEffect } from 'react';
import { FilterArea, ProductList, Spinner, Error } from '..';
import styles from './filteredProducts.module.css';
import { useLocation, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchFilteredProducts } from '../../state/slices/filteredProducts';
import { useSelector } from '../../state/hooks';

export const FilteredProducts = () => {
  const { keywords } = useParams();
  const { subFilteredProducts, pagination, isLoading, error } = useSelector(
    (state) => state.filteredProducts
  );
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch<any>(
      fetchFilteredProducts({ keywords, nextPage: 1, pageSize: 10 })
    );
  }, [dispatch, location, keywords]);

  const onPageChange = (
    nextPage: string | number,
    pageSize: string | number
  ) => {
    dispatch<any>(fetchFilteredProducts({ keywords, nextPage, pageSize }));
  };

  if (isLoading) return <Spinner />;

  if (error) return <Error error={error} />;

  return (
    <>
      {/* sort filter */}
      <div className={styles['product-list-container']}>
        <FilterArea />
      </div>
      {/* product list */}
      <div className={styles['product-list-container']}>
        <ProductList
          data={subFilteredProducts}
          paging={pagination}
          onPageChange={onPageChange}
        />
      </div>
    </>
  );
};
