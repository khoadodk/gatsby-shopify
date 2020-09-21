import React from 'react';
import { Link as GatsbyLink } from 'gatsby';
import styled from 'styled-components';

const Link = ({ to, className, children }) => {
  return (
    <GatsbyLink to={to} className={className}>
      {children}
    </GatsbyLink>
  );
};

export const StyledLink = styled(Link)`
  padding: 10px;
  border: 1px solid black;
  font-weight: bold;
  font-size: 16px;
  text-transform: uppercase;
  text-align: center;
  display: inline-block;
  background: white;
  color: black;
  text-decoration: none;
  cursor: pointer;
  transition: 1s all ease;
  &:hover {
    color: white;
    background: black;
  }
`;
