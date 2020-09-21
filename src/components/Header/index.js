import React from 'react';
import { HeaderWrapper, LogoWrapper } from './styles';
import { Cart, Search, Logo } from 'components';

export const Header = () => {
  return (
    <>
      <LogoWrapper>
        <Logo />
      </LogoWrapper>
      <HeaderWrapper>
        <Search />
        <Cart />
      </HeaderWrapper>
    </>
  );
};
