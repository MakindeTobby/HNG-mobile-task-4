import { createSlice } from "@reduxjs/toolkit";

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    wishArr: [],
  },
  reducers: {
    addToWishlist: (state, action) => {
      state.wishArr.push(action.payload);
    },

    removeFromWishlist: (state, action) => {
      state.wishArr = state.wishArr.filter(
        (item) => item.id !== action.payload
      );
    },
  },
});

export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer;
