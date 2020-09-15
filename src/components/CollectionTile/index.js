import React from 'react';
import {
  CollectionTileWrapper,
  CollectionTileContent,
  Title,
  Description,
} from './styles.js';
import BackgroundImage from 'gatsby-image';

export const CollectionTile = ({
  title,
  description,
  backgroundImage,
  sale,
}) => {
  return (
    <CollectionTileWrapper>
      <BackgroundImage fluid={backgroundImage} />
      <CollectionTileContent>
        <div>
          <Title sale={sale}>{title}</Title>
          <Description sale={sale}>{description}</Description>
        </div>
      </CollectionTileContent>
    </CollectionTileWrapper>
  );
};
