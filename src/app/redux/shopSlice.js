
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  productData: [],
  wishList: [],
};

export const shopSlice = createSlice({
  name: 'shop',
  initialState,
  reducers: {
  
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.productData.find(item => item.id === newItem.id && item.colorCode === newItem.selectedImage.colorCode);
      if (existingItem) {
        existingItem.quantity += newItem.quantity;
      } else {
        state.productData.push(newItem);
      }
    },
    increaseQty: (state, action) => {
      const item = state.productData.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity++;
      }
    },
    decreaseQty: (state, action) => {
      const item = state.productData.find((item) => item.id === action.payload.id);
      if (item.quantity === 1) {
        item.quantity = 1;
      } else {
        item.quantity--;
      }
    },
    deleteItem: (state, action) => {
      state.productData = state.productData.filter((item) => item.id !== action.payload);
    },
    resetCart: (state) => {
      state.productData = [];
    },
    addToWish: (state, action) => {
      if (!Array.isArray(state.wishList)) {
        state.wishList = [];
      }
      const item = state.wishList.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity += action.payload.quantity;
      } else {
        state.wishList.push(action.payload);
      }
    },
    deleteWish: (state, action) => {
      state.wishList = state.wishList.filter((item) => item.id !== action.payload);
    },
    resetWish: (state) => {
      state.wishList = [];
    },
   
  },
});

export const {
  addToCart,
  increaseQty,
  decreaseQty,
  resetCart,
  deleteItem,
  addToWish,
  deleteWish,
  resetWish,
} = shopSlice.actions;

export default shopSlice.reducer;


