import { configureStore } from "@reduxjs/toolkit";
import CartSlice from "./Slices/CartSlice";
import WishlistSlice from "./Slices/WishlistSlice";

export const store = configureStore({
  reducer: {
    cart: CartSlice,
    wishlist: WishlistSlice,
  },
});
