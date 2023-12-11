import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.cartItems.find(
        (product) => product.id === newItem.id
      );

      if (existingItem) {
        existingItem.quantity += 1;
        existingItem.totalPrice = existingItem.quantity * newItem.price;
      } else {
        state.cartItems.push({
          ...newItem,
          quantity: 1,
          totalPrice: newItem.price,
        });
      }
    },
    removeItemFromCart: (state, action) => {
      const itemIdToRemove = action.payload.id;
      const itemIndexToRemove = state.cartItems.findIndex(
        (product) => product.id === itemIdToRemove
      );

      if (itemIndexToRemove !== -1) {
        const removedItem = state.cartItems[itemIndexToRemove];

        if (removedItem.quantity > 1) {
          removedItem.quantity -= 1;
          removedItem.totalPrice = removedItem.quantity * removedItem.price;
        } else {
          // If quantity is 1, remove the item from the cart
          state.cartItems.splice(itemIndexToRemove, 1);
        }
      }
    },
  },
});

export const { addItemToCart, removeItemFromCart } = cartSlice.actions;

export default cartSlice;

// selector
export const selectCartItems = (state) => state.cart.cartItems;
export const selectCartTotalItems = (state) =>
  state.cart.cartItems.reduce((total, item) => total + item.quantity, 0);
export const selectCartTotalPrice = (state) =>
  state.cart.cartItems.reduce((total, item) => total + item.totalPrice, 0);
