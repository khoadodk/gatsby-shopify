import React from 'react';
import styled from 'styled-components';
import ProductContext from 'context/ProductContext';
import { CategoryFilterItem } from './CategoryFilterItem';

export const FilterWrapper = styled.div`
  padding: 10px;
  border: 1px solid #ddd;
`;

export const Filter = () => {
  const { collections } = React.useContext(ProductContext);
  return (
    <FilterWrapper>
      <strong>Categories</strong>
      <div>
        {collections.map(collection => (
          <CategoryFilterItem
            key={collection.shopifyId}
            title={collection.title}
            id={collection.shopifyId}
          />
        ))}
      </div>
    </FilterWrapper>
  );
};
