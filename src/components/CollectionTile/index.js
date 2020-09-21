import React from 'react';
import {
  CollectionTileWrapper,
  CollectionTileContent,
  Title,
  Description,
} from './styles.js';
import BackgroundImage from 'gatsby-image';
import { StyledLink } from 'components';

export const CollectionTile = ({
  title,
  description,
  backgroundImage,
  sale,
  destination,
}) => {
  return (
    <CollectionTileWrapper>
      <BackgroundImage fluid={backgroundImage} />
      <CollectionTileContent>
        <div>
          <Title sale={sale}>{title}</Title>
          <Description sale={sale}>{description}</Description>
          <StyledLink to={destination}>Shop Now</StyledLink>
        </div>
      </CollectionTileContent>
    </CollectionTileWrapper>
  );
};
