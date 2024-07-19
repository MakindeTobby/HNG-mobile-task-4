// selectors/cartSelectors.js
import { createSelector } from "@reduxjs/toolkit";

// Assuming your cart state is structured as an array of items
const cartItemsSelector = (state) => state.cart.cart;

export const totalCartPriceSelector = createSelector(
  [cartItemsSelector],
  (cartItems) => {
    return cartItems.reduce((total, item) => {
      const itemPrice = item.current_price?.[0]?.NGN[0] ?? 0;
      return total + itemPrice * item.quantity;
    }, 0);
  }
);
