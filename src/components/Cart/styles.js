import styled from 'styled-components';
import { StyledLink } from '../StyledLink';

export const CartWrapper = styled(StyledLink).attrs(() => ({
  to: '/cart',
}))`
  margin-left: auto;
  display: flex;
  color: black;
  text-decoration: none;
  > svg {
    margin: auto 0;
  }
  > div:last-child {
    padding-left: 10px;
    margin: auto 0;
  }
  &:hover {
    text-decoration: underline;
  }
`;
