import React, { useEffect, useState } from 'react';
import { Divider } from 'antd';
import { Filter } from './Filter';
import styles from './FilterArea.module.css';
import { useDispatch } from 'react-redux';
import { changeSubFilteredProducts } from '../../state/slices/filteredProducts';
import { useSelector } from '../../state/hooks';

export const FilterArea: React.FC = () => {
  const [tags, setTags] = useState<any>({
    rating: [],
    departureCity: [],
    travelDays: [],
    tripType: [],
    departureTime: [],
  });

  const { filteredProducts } = useSelector((state) => state.filteredProducts);
  const dispatch = useDispatch();

  const arrayRemove = (arr: any[], value: any) => {
    let tempArr = [...arr];
    let index = tempArr.indexOf(value);
    if (index > -1) tempArr.splice(index, 1);
    return tempArr;
  };

  const handleSubFilter = (
    checked: boolean,
    tagType: string,
    value: number | string
  ) => {
    // change tag combination
    if (checked) setTags({ ...tags, [tagType]: [...tags[tagType], value] });
    else setTags({ ...tags, [tagType]: arrayRemove(tags[tagType], value) });
  };

  const isNumber = (obj: any) => typeof obj === 'number' && isFinite(obj);

  useEffect(() => {
    // loop tags to filter
    let products = [...filteredProducts];

    for (let key in tags) {
      let temp = products;
      // if no products no need to keep going...
      if (!temp.length) break;
      // if no subTags no need to do current loop...
      if (!tags[key].length) continue;
      products = tags[key].reduce((prev: any, curTag: string | number) => {
        return [
          ...prev,
          ...temp.filter(
            (p) => (isNumber(p[key]) ? Math.floor(p[key]) : p[key]) === curTag
          ),
        ];
      }, []);
    }
    dispatch(changeSubFilteredProducts(products));
  }, [tags, filteredProducts, dispatch]);

  return (
    <>
      <Filter
        title="路线评价"
        tagType="rating"
        subTags={[
          { value: 1, displayValue: '1星' },
          { value: 2, displayValue: '2星' },
          { value: 3, displayValue: '3星' },
          { value: 4, displayValue: '4星' },
          { value: 5, displayValue: '5星' },
        ]}
        handleSubFilter={handleSubFilter}
      />
      <Divider dashed className={styles['filter-divider']} />
      <Filter
        title="出发城市"
        tagType="departureCity"
        subTags={[
          { value: 'Beijing', displayValue: '北京' },
          { value: 'Shanghai', displayValue: '上海' },
          { value: 'Guangzhou', displayValue: '广州' },
          { value: 'Shenzhen', displayValue: '深圳' },
        ]}
        handleSubFilter={handleSubFilter}
      />
      <Divider dashed className={styles['filter-divider']} />
      <Filter
        title="行程天数"
        tagType="travelDays"
        subTags={[
          { value: 'Two', displayValue: '2日' },
          { value: 'Three', displayValue: '3日' },
          { value: 'Four', displayValue: '4日' },
          { value: 'Five', displayValue: '5日' },
          { value: 'Six', displayValue: '6日' },
        ]}
        handleSubFilter={handleSubFilter}
      />
      <Divider dashed />
      <Filter
        title="旅程类型"
        tagType="tripType"
        subTags={[
          { value: 'GroupTour', displayValue: '跟团游' },
          { value: 'BackPackTour', displayValue: '自由行' },
          { value: 'RoadTrip', displayValue: '自驾游' },
          { value: 'HighClassCustomization', displayValue: '高端定制' },
        ]}
        handleSubFilter={handleSubFilter}
      />
      <Divider dashed />
      <Filter
        title="出发时间"
        tagType="departureTime"
        subTags={[
          { value: 'SpringFestival', displayValue: '春节' },
          { value: 'Qingming', displayValue: '清明' },
          { value: 'LaborDay', displayValue: '劳动节' },
        ]}
        handleSubFilter={handleSubFilter}
      />
    </>
  );
};
