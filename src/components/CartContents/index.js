import React from 'react';
import CartContext from 'context/CartContext';
import { navigate } from '@reach/router';
import { CartItem, CartHeader, CartFooter, Footer } from './styles';

import { QuantityAdjuster } from '../QuantityAdjuster';
import { RemoveLineItem, Button } from 'components';

export const CartContents = () => {
  const { checkout, updateLineItem } = React.useContext(CartContext);
  console.log(checkout);

  const handleAdjustQuantity = ({ quantity, variantId }) => {
    updateLineItem({ variantId, quantity });
  };

  return (
    <section>
      <h1>Your Cart</h1>

      {!!checkout?.lineItems.length > 0 && (
        <CartHeader>
          <div>Product</div>
          <div>Unit Price</div>
          <div>Quantity</div>
          <div>Amount</div>
        </CartHeader>
      )}

      {checkout?.lineItems?.map(lineItem => (
        <CartItem key={lineItem.variant.id}>
          <div>
            <div>{lineItem.title}</div>
            <div>
              {lineItem.variant.title === 'Default Title'
                ? ''
                : lineItem.variant.title}
            </div>
          </div>
          <div>${lineItem.variant.price}</div>
          <div>
            <QuantityAdjuster item={lineItem} onAdjust={handleAdjustQuantity} />
          </div>
          <div>${(lineItem.quantity * lineItem.variant.price).toFixed(2)}</div>
          <div>
            <RemoveLineItem lineItemId={lineItem.id} />
          </div>
        </CartItem>
      ))}

      {!!checkout?.lineItems.length > 0 && (
        <CartFooter>
          <div>
            <strong>Total:</strong>
          </div>
          <div>
            <span>${checkout?.totalPrice}</span>
          </div>
        </CartFooter>
      )}
      {checkout?.lineItems.length === 0 && <h4>Your cart is empty</h4>}
      <Footer>
        <div>
          <Button onClick={() => navigate(-1)}>Continue Shopping</Button>
        </div>
        <div>
          {!!checkout?.webUrl && !!checkout?.lineItems.length > 0 && (
            <Button
              onClick={() => {
                window.location.href = checkout.webUrl;
              }}
            >
              Checkout
            </Button>
          )}
        </div>
      </Footer>
    </section>
  );
};
