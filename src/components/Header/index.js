import React from 'react';
import { HeaderWrapper } from './styles';
import { Cart, Search } from 'components';

export const Header = () => {
  return (
    <HeaderWrapper>
      <Search />
      <Cart />
    </HeaderWrapper>
  );
};
