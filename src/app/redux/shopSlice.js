import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  productData: [],
  orderData: [],
  wishList: [],
 
}

export const shopSlice = createSlice({
  name: 'shop',
  initialState,
  reducers: {
   

    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.productData.find(item => item.id === newItem.id);
      if (existingItem) {
        existingItem.quantity += newItem.quantity;
      } else {
        state.productData.push(newItem);
      }
    },
    

  
    increaseQty: (state, action) => {
      const item = state.productData.find((item) => item.id === action.payload.id);
      if(item) {
        item.quantity ++;
      }
    },

    decreaseQty: (state, action) => {
      const item = state.productData.find((item) => item.id === action.payload.id);
      if(item.quantity === 1){
          item.quantity === 1
      } else {
        item.quantity --;
      }
    },

    deleteItem: (state, action) => {
      state.productData = state.productData.filter((item) => item.id !== action.payload);
       
    },
    resetCart: (state) => {
      state.productData = []
     },


    //  wishList
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
      state.wishList = []
     },

   
    saveOrder: (state, action) => {
      state.orderData = action.payload;
    },

    resetOrder: (state) => {
      state.orderData = [];
    },
  },
});

export const { addToCart,
              increaseQty,
              decreaseQty,
              resetCart,
              deleteItem, 
              addToWish,
              deleteWish,
              resetWish,
              saveOrder,
              resetOrder,
            addUser,
            removeUser } = shopSlice.actions;

export default shopSlice.reducer;
