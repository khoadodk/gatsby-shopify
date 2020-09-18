import React from 'react';
import styled from 'styled-components';
import { Layout, Filter, ProductsGrid } from 'components';
import ProductContext from 'context/ProductContext';
import queryString from 'query-string';
import { useLocation } from '@reach/router';

const AllProducts = () => {
  const { products, collections } = React.useContext(ProductContext);
  const collectionProductMap = {};
  const { search } = useLocation();
  const qs = queryString.parse(search);
  const selectedCollectionIds = qs.c?.split(',').filter(c => !!c) || [];
  const selectedCollectionIdsMap = {};

  selectedCollectionIds.forEach(cId => {
    selectedCollectionIdsMap[cId] = true;
  });

  if (collections) {
    collections.forEach(collection => {
      collectionProductMap[collection.shopifyId] = {};
      collection.products.forEach(product => {
        collectionProductMap[collection.shopifyId][product.shopifyId] = true;
      });
    });
  }

  const filterByCategory = product => {
    // Check selected id map exist
    if (Object.keys(selectedCollectionIdsMap).length) {
      // loop over the key of selected id map
      for (let key in selectedCollectionIdsMap) {
        // pass the key to collection product and check that product id exist, return the products belongs to that category
        if (collectionProductMap[key]?.[product.shopifyId]) {
          return true;
        }
      }
      return false;
    }
    // return all products
    return true;
  };

  const filteredProducts = products.filter(filterByCategory);

  return (
    <Layout>
      <h4>{filteredProducts?.length} products</h4>
      <Content>
        <Filter />
        <div>
          <ProductsGrid products={filteredProducts} />
        </div>
      </Content>
    </Layout>
  );
};

const Content = styled.div`
  display: grid;
  grid-gap: 20px;
  margin-top: 20px;
  grid-template-columns: 1fr 3fr;
`;

export default AllProducts;
