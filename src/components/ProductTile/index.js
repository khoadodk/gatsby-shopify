import React from 'react';
import Img from 'gatsby-image';
import { ProductTileWrapper, Title, Description, Price } from './styles';
import { StyledLink } from '../StyledLink';

export const ProductTile = ({
  title,
  description,
  minPrice,
  imageFluid,
  handle,
}) => {
  return (
    <ProductTileWrapper>
      <Img fluid={imageFluid} />
      <Title>{title}</Title>
      <Description>{description}</Description>
      <Price>from ${Number.parseFloat(minPrice).toFixed(2)}</Price>
      <StyledLink to={`/products/${handle}`}>View product</StyledLink>
    </ProductTileWrapper>
  );
};
