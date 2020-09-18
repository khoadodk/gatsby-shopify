import React from 'react';
import { CategoryFilterWrapper } from './styles';
import { Checkbox } from 'components';
import { navigate, useLocation } from '@reach/router';
import queryString from 'query-string';

export const CategoryFilterItem = ({ title, id }) => {
  const { search } = useLocation();
  const query = queryString.parse(search);
  const collectionIds = query.c?.split(',').filter(c => !!c) || [];
  const checked = collectionIds?.find(cId => cId === id);

  const handleClick = () => {
    let navigateTo = '/all-products';

    let newIds = [];
    if (checked) {
      // if checked, filter out the id to unchecked it
      newIds = collectionIds
        .filter(cId => cId !== id)
        .map(cId => encodeURIComponent(cId));
    } else {
      collectionIds.push(id);
      newIds = collectionIds.map(cId => encodeURIComponent(cId));
    }
    if (newIds.length) {
      navigate(`${navigateTo}?c=${newIds.join(',')}`);
    } else {
      navigate(`${navigateTo}`);
    }
  };

  return (
    <CategoryFilterWrapper onClick={handleClick}>
      <Checkbox checked={checked} />
      <div>{title}</div>
    </CategoryFilterWrapper>
  );
};
