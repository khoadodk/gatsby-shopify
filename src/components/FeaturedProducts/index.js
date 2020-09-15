import React from 'react';
import ProductContext from 'context/ProductContext';
import { ProductsGrid } from 'components';

export const FeaturedProducts = () => {
  const { collections } = React.useContext(ProductContext);
  const featuredCollection = collections.find(
    collection => collection.title === 'Featured hats'
  );
  return (
    <section>
      <h1>Featured Hats</h1>
      <ProductsGrid products={featuredCollection.products} />
    </section>
  );
};
