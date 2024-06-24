


import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  productData: [],
  orderData: [], // Updated from saveOrder to orderData
  wishList: [],
  allProducts: [],
};

export const shopSlice = createSlice({
  name: 'shop',
  initialState,
  reducers: {
    // addToCart: (state, action) => {
    //   const newItem = action.payload;
    //   const existingItem = state.productData.find(item => item.id === newItem.id);
    //   if (existingItem) {
    //     existingItem.quantity += newItem.quantity;
    //   } else {
    //     state.productData.push(newItem);
    //   }
    // },

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
    saveOrder: (state, action) => {
      state.orderData.push(action.payload);
    },
    resetOrder: (state) => {
      state.orderData = []; // Ensure this matches the new name
    },
    AllProducts: (state, action) => {
      state.allProducts = action.payload;
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
  saveOrder, // Ensure this matches the new name
  resetOrder,
  AllProducts,
} = shopSlice.actions;

export default shopSlice.reducer;


// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   productData: [],
//   orderData: [], 
//   wishList: [],
//   allProducts: [],
// };

// export const shopSlice = createSlice({
//   name: 'shop',
//   initialState,
//   reducers: {
//     addToCart: (state, action) => {
//       const newItem = action.payload;
//       const existingItem = state.productData.find(item => item.id === newItem.id && item.colorCode === newItem.selectedImage.colorCode);
//       if (existingItem) {
//         existingItem.quantity += newItem.quantity;
//       } else {
//         state.productData.push(newItem);
//       }
//     },
//     increaseQty: (state, action) => {
//       const item = state.productData.find((item) => item.id === action.payload.id && item.colorCode === action.payload.colorCode);
//       if (item) {
//         item.quantity++;
//       }
//     },
//     decreaseQty: (state, action) => {
//       const item = state.productData.find((item) => item.id === action.payload.id && item.colorCode === action.payload.colorCode);
//       if (item && item.quantity > 1) {
//         item.quantity--;
//       }
//     },
//     deleteItem: (state, action) => {
//       state.productData = state.productData.filter((item) => item.id !== action.payload.id || item.colorCode !== action.payload.colorCode);
//     },
//     resetCart: (state) => {
//       state.productData = [];
//     },
//     addToWish: (state, action) => {
//       const item = state.wishList.find((item) => item.id === action.payload.id && item.colorCode === action.payload.selectedImage.colorCode);
//       if (item) {
//         item.quantity += action.payload.quantity;
//       } else {
//         state.wishList.push(action.payload);
//       }
//     },
//     deleteWish: (state, action) => {
//       state.wishList = state.wishList.filter((item) => item.id !== action.payload.id || item.colorCode !== action.payload.colorCode);
//     },
//     resetWish: (state) => {
//       state.wishList = [];
//     },
//     saveOrder: (state, action) => {
//       state.orderData.push(action.payload);
//     },
//     resetOrder: (state) => {
//       state.orderData = [];
//     },
//     AllProducts: (state, action) => {
//       state.allProducts = action.payload;
//     },
//   },
// });

// export const {
//   addToCart,
//   increaseQty,
//   decreaseQty,
//   resetCart,
//   deleteItem,
//   addToWish,
//   deleteWish,
//   resetWish,
//   saveOrder,
//   resetOrder,
//   AllProducts,
// } = shopSlice.actions;

// export default shopSlice.reducer;
