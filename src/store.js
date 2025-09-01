import {
  configureStore,
  combineReducers,
  createStore,
  applyMiddleware,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";

import {
  productListReducer,
  productDetailsReducer,
} from "./reducers/productReducers";
import { composeWithDevTools } from "@redux-devtools/extension";
import { bagReducer } from "./reducers/bagReducers";
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
} from "./reducers/userReducers";
import {
  orderCreateReducer,
  orderDetailsReducer,
  orderPayReducer,
} from "./reducers/orderReducers";
import ShoppingBag from "./shops/ShoppingBag";

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  bag: bagReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
});

const bagItemsFromStorage = localStorage.getItem("bagItems")
  ? JSON.parse(localStorage.getItem("bagItems"))
  : [];
const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const shippingInfoFromStorage = localStorage.getItem("shippingInfo")
  ? JSON.parse(localStorage.getItem("shippingInfo"))
  : {};

// Initial state for the store
export const initialState = {
  bag: {
    bagItems: bagItemsFromStorage,
    shippingAdress: shippingInfoFromStorage,
  },
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];
// const store = configureStore({
//   reducer: reducer,
//   preloadedState: initialState,
//   middleware: (getDefaultMiddleware) => {
//     return [middleware]
//   },
// });

const store = configureStore({ reducer: reducer }, initialState, middleware);

export default store;
