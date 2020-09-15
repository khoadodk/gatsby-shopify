import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';

const query = graphql`
  {
    allShopifyCollection(sort: { fields: title, order: ASC }) {
      edges {
        node {
          title
          description
          shopifyId
          image {
            localFile {
              childImageSharp {
                fluid(maxWidth: 1200) {
                  ...GatsbyImageSharpFluid_tracedSVG
                }
              }
            }
          }
          products {
            ...ShopifyProductFields
            handle
            priceRange {
              minVariantPrice {
                amount
              }
            }
          }
        }
      }
    }
  }
`;

const defaultState = {
  products: [],
};

const ProductContext = React.createContext(defaultState);
export default ProductContext;

export function ProductContextProvider({ children }) {
  const { allShopifyCollection } = useStaticQuery(query);
  return (
    <ProductContext.Provider
      value={{
        products: [],
        collections: allShopifyCollection.edges.map(({ node }) => node),
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}
