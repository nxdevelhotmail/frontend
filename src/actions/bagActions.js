import axios from "axios";
import {
  BAG_ADD_ITEM,
  BAG_REMOVE_ITEM,
  BAG_SAVE_SHIPPING_INFO,
  BAG_SAVE_PAYMENT_METHOD,
} from "../constants/bagConstants";

export const addToBag = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}`);
  console.log(id, qty);
  dispatch({
    type: BAG_ADD_ITEM,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty,
    },
  });

  // Save bag items to local storage
  localStorage.setItem("bagItems", JSON.stringify(getState().bag.bagItems));
};
export const removeFromBag = (id) => async (dispatch, getState) => {
  dispatch({
    type: BAG_REMOVE_ITEM,
    payload: id,
  });

  // Save bag items to local storage
  localStorage.setItem("bagItems", JSON.stringify(getState().bag.bagItems));
};

export const saveShippingInfo = (data) => (dispatch) => {
  dispatch({
    type: BAG_SAVE_SHIPPING_INFO,
    payload: data,
  });

  // Save shipping info to local storage
  localStorage.setItem("shippingInfo", JSON.stringify(data));
};

export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({
    type: BAG_SAVE_PAYMENT_METHOD,
    payload: data,
  });

  // Save payment method to local storage
  localStorage.setItem("paymentMethod", JSON.stringify(data));
};
