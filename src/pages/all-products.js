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
  const searchTerm = qs.s;

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

  const filterbySearchTerm = product => {
    if (searchTerm) {
      return product.title.toLowerCase().indexOf(searchTerm.toLowerCase()) >= 0;
    }
    return true;
  };

  const filteredProducts = products
    .filter(filterByCategory)
    .filter(filterbySearchTerm);

  return (
    <Layout>
      {!!searchTerm && !!filteredProducts.length && (
        <h3>
          Search Term: <strong>'{searchTerm}'</strong>
        </h3>
      )}
      <h4>
        <strong>{filteredProducts?.length}</strong> products found!
      </h4>
      <Content>
        <Filter />
        {!filteredProducts.length && (
          <div>
            <h3>
              <span>Oh no! Nothing matches</span>
              &nbsp;
              <strong>'{searchTerm}'</strong>
            </h3>

            <div>
              To help with your search why not try:
              <br />
              <br />
              <ul>
                <li>Check your spelling</li>
                <li>Using less words</li>
                <li>Try using different search term</li>
              </ul>
            </div>
          </div>
        )}
        {!!filteredProducts.length && (
          <div>
            <ProductsGrid products={filteredProducts} />
          </div>
        )}
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
