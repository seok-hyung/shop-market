import { configureStore, createSlice } from "@reduxjs/toolkit";
import user from "./store/userSlice.js";

let stock = createSlice({
  name: "stock",
  initialState: [],
});

let cart = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addCount(state, action) {
      // array에서 원하는거 몇번쨰에 있나 찾아주기
      let 번호 = state.findIndex((a) => {
        //action.payload는 cart.js보면 cart의 개수만큼 0에서 증가하는 수임
        return a.id == state[action.payload].id;
      }); // payload와 같은 id가진 상품을 찾아서 +1
      state[번호].count++;
    },
    subtractCount(state, action) {
      // array에서 원하는거 몇번쨰에 있나 찾아주기
      let 번호 = state.findIndex((a) => {
        return a.id == state[action.payload].id;
      }); // payload와 같은 id가진 상품을 찾아서 +1
      state[번호].count--;
    },
    addItem(state, action) {
      let 번호 = state.findIndex((a) => {
        return a.id == action.payload;
      });
      state.push(action.payload);
    },
    deleteItem(state, action) {
      // array에서 원하는거 몇번쨰에 있나 찾아주기
      let 번호 = state.findIndex((a) => {
        return a.id == action.payload;
      }); // payload와 같은 id가진 상품을 찾아서 +1
      state.splice(번호, 1);
    },
  },
});

export let { addCount, addItem, subtractCount, deleteItem } = cart.actions;

export default configureStore({
  reducer: {
    user: user.reducer,
    stock: stock.reducer,
    cart: cart.reducer,
  },
});
