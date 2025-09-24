import {
  BAG_ADD_ITEM,
  BAG_REMOVE_ITEM,
  BAG_SAVE_SHIPPING_INFO,
  BAG_SAVE_PAYMENT_METHOD,
  BAG_CLEAR_ITEMS,
} from "../constants/bagConstants";

export const bagReducer = (
  state = { bagItems: [], saveShippingInfo: {} },
  action
) => {
  switch (action.type) {
    case BAG_ADD_ITEM:
      const item = action.payload;
      const existItem = state.bagItems.find((x) => x.product === item.product);
      if (existItem) {
        return {
          ...state,
          bagItems: state.bagItems.map((x) =>
            x.product === existItem.product ? item : x
          ),
        };
      } else {
        return { ...state, bagItems: [...state.bagItems, item] };
      }

    case BAG_REMOVE_ITEM:
      return {
        ...state,
        bagItems: state.bagItems.filter((x) => x.product !== action.payload),
      };

    case BAG_SAVE_SHIPPING_INFO:
      return {
        ...state,
        shippingInfo: action.payload,
      };
    case BAG_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload,
      };
    case BAG_CLEAR_ITEMS:
      return {
        ...state,
        bagItems: [],
      };

    default:
      return state;
  }
};
