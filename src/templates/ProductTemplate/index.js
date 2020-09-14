/* eslint-disable jsx-a11y/no-onchange */
import React from 'react';
import { graphql } from 'gatsby';
import { navigate, useLocation } from '@reach/router';
import queryString from 'query-string';

import { Layout, ImageGallery, ProductQuantityAdder } from 'components';
import { Grid, SelectWrapper } from './styles';
import CartContext from '../../context/CartContext';

export const query = graphql`
  query ProductQuery($shopifyId: String) {
    shopifyProduct(shopifyId: { eq: $shopifyId }) {
      shopifyId
      title
      description
      images {
        id
        localFile {
          childImageSharp {
            fluid(maxWidth: 400) {
              ...GatsbyImageSharpFluid_tracedSVG
            }
          }
        }
      }
    }
  }
`;

const ProductTemplate = ({ data }) => {
  const { getProductById } = React.useContext(CartContext);
  const [product, setProduct] = React.useState(null);
  const [selectedVariant, setSelectedVariant] = React.useState(null);
  // Navigate to different url on selected variant
  const { search, origin, pathname } = useLocation();
  // Get the variant id from query string and pass it to useeffect hook
  const variantId = queryString.parse(search).variant;

  React.useEffect(() => {
    getProductById(data.shopifyProduct.shopifyId).then(result => {
      setProduct(result);
      setSelectedVariant(
        result.variants.find(({ id }) => id === variantId) || result.variants[0]
      );
    });
  }, [getProductById, setProduct, data.shopifyProduct.shopifyId, variantId]);

  const handleChange = e => {
    const newVariant = product?.variants.find(v => v.id === e.target.value);
    setSelectedVariant(newVariant);
    navigate(
      `${origin}${pathname}?variant=${encodeURIComponent(newVariant.id)}`,
      {
        replace: true,
      }
    );
  };
  return (
    <Layout>
      <Grid>
        <div>
          <h1>{data.shopifyProduct.title}</h1>
          <p>{data.shopifyProduct.description}</p>
          {product?.availableForSale && !!selectedVariant && (
            <>
              {product?.variants.length > 1 && (
                <SelectWrapper>
                  <strong>Variant</strong>
                  <select onChange={handleChange} value={selectedVariant.id}>
                    {product?.variants.map(v => (
                      <option key={v.id} value={v.id}>
                        {v.title}
                      </option>
                    ))}
                  </select>
                  <div>${selectedVariant?.price}</div>
                  <ProductQuantityAdder
                    available={selectedVariant.available}
                    variantId={selectedVariant.id}
                  />
                </SelectWrapper>
              )}
            </>
          )}
        </div>
        <div>
          <ImageGallery
            images={data.shopifyProduct.images}
            selectedVariantImageId={selectedVariant?.image.id}
          />
        </div>
      </Grid>
    </Layout>
  );
};

export default ProductTemplate;
