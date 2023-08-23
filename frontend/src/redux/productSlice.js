import { createSlice } from "@reduxjs/toolkit";
import {toast} from "react-hot-toast";

const initialState = {
  productList: [],
  cartItem: [],
};
export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setDataProduct: (state, action) => {
      // check whether data is coming
      console.log(action);
      state.productList = [...action.payload];
    },
    addCartItem: (state, action) => {
      // after add to cart is clicked
      // console.log(action)
      // check if item available
      const check = state.cartItem.some(
        (el) => el._id === action.payload._id
      );
      // console.log(check)
      if(check) {
        toast("Item available in Cart");
      } else {
        toast("Item added successfully");
        const total = action.payload.price;

        state.cartItem = [
          ...state.cartItem,
          { ...action.payload, qty: 1, total: total },
        ];
      }
    },
    deleteCartItem: (state, action) => {
      // when want to remove from cart
      // console.log(action.payload)
      // so when we click the delete button in cart page it will give the id of the product

      toast("Item deleted successfully");

      // first get the index of product
      const index = state.cartItem.findIndex((el) => el._id === action.payload);

      state.cartItem.splice(index, 1);
      // so as we get the index it will be deleted
      console.log(index);
    },
    increaseQty: (state, action) => {
      // first get the index of product
      const index = state.cartItem.findIndex((el) => el._id === action.payload);
      // get qty
      let qty = state.cartItem[index].qty;
      const qtyInc = ++qty;
      state.cartItem[index].qty = qtyInc;
      

      const price = state.cartItem[index].price
      const total = price*qtyInc
      state.cartItem[index].total = total
    },
    decreaseQty: (state, action) => {
      // first get the index of product
      const index = state.cartItem.findIndex((el) => el._id === action.payload);
      // get qty
      let qty = state.cartItem[index].qty;
      if (qty > 1) {
        const qtyDec = --qty;
        state.cartItem[index].qty = qtyDec;
     
      const price = state.cartItem[index].price
      const total = price*qtyDec
      state.cartItem[index].total = total}
    },
  },
});

export const {
  setDataProduct,
  addCartItem,
  deleteCartItem,
  decreaseQty,
  increaseQty,
} = productSlice.actions;
export default productSlice.reducer;
