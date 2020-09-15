import React from 'react';
import { Layout, HomePageCollectionsGrid, FeaturedProducts } from 'components';
import ProductContext from 'context/ProductContext';

const IndexPage = () => {
  const { collections } = React.useContext(ProductContext);
  return (
    <Layout>
      <HomePageCollectionsGrid
        collections={collections.filter(
          collection => collection.title !== 'Featured hats'
        )}
      />
      {collections?.find(
        collection => collection.title === 'Featured hats'
      ) && <FeaturedProducts />}
    </Layout>
  );
};

export default IndexPage;
