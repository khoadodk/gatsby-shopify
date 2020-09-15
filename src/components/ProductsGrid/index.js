import React from 'react';
import { ProductsGridWrapper } from './styles';
import { ProductTile } from 'components';

export const ProductsGrid = ({ products }) => {
  return (
    <ProductsGridWrapper>
      {products.map(product => (
        <ProductTile
          imageFluid={product.images[0].localFile.childImageSharp.fluid}
          key={product.shopifyId}
          title={product.title}
          description={product.description}
          minPrice={product.priceRange.minVariantPrice.amount}
          handle={product.handle}
        />
      ))}
    </ProductsGridWrapper>
  );
};
