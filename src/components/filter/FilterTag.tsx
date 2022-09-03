import React, { PropsWithChildren, useState } from 'react';
import { Tag } from 'antd';

interface PropsType extends PropsWithChildren {
  handleSubFilter: (
    checked: boolean,
    tagType: string,
    value: number | string
  ) => void;
  tagType: string;
  tag: any;
}

export const FilterTag: React.FC<PropsType> = ({
  tagType,
  tag,
  handleSubFilter,
}) => {
  const [checked, setChecked] = useState(false);

  const { value, displayValue } = tag;

  const handleChange = (checked: any) => {
    setChecked(checked);
    handleSubFilter(checked, tagType, value);
  };

  return (
    <Tag.CheckableTag checked={checked} onChange={handleChange}>
      {displayValue}
    </Tag.CheckableTag>
  );
};
