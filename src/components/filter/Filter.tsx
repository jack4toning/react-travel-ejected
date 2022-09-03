import React from 'react';
import { FilterTag } from './FilterTag';
import { Typography, Divider } from 'antd';
const { Text } = Typography;

interface PropsType {
  title: string;
  tagType: string;
  subTags: any[];
  handleSubFilter: (
    checked: boolean,
    tagType: string,
    value: number | string
  ) => void;
}

export const Filter: React.FC<PropsType> = ({
  title,
  tagType,
  subTags,
  handleSubFilter,
}) => {
  return (
    <div>
      <Text style={{ marginRight: 40, fontSize: 15, fontWeight: 500 }}>
        {title} :{' '}
      </Text>
      {subTags.map((tag, index) => {
        if (index === subTags.length - 1)
          return (
            <FilterTag
              tagType={tagType}
              tag={tag}
              key={`filter${index}`}
              handleSubFilter={handleSubFilter}
            ></FilterTag>
          );
        return (
          <span key={`filter${index}`}>
            <FilterTag
              tagType={tagType}
              tag={tag}
              handleSubFilter={handleSubFilter}
            ></FilterTag>
            <Divider type="vertical" />
          </span>
        );
      })}
    </div>
  );
};
