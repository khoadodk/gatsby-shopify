import React from 'react';
import CartContext from 'context/CartContext';
import { FaTrashAlt } from 'react-icons/fa';
import { RemoveIconWrapper } from './styles';

export const RemoveLineItem = ({ lineItemId }) => {
  const { removeLineItem } = React.useContext(CartContext);
  const handleRemove = () => {
    removeLineItem(lineItemId);
  };
  return (
    <RemoveIconWrapper onClick={handleRemove}>
      <FaTrashAlt />
    </RemoveIconWrapper>
  );
};
