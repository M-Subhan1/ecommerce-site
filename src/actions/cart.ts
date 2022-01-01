import { ActionTypes } from ".";
import axios from "axios";
import { Dispatch } from "redux";

export interface CartItem {
  product_id: number;
  product_name: string;
  product_description: string;
  stock: number;
  image_url: string;
  product_type: string;
  price: number;
  discount: number;
  quantity: number;
}

export interface AddToCartAction {
  type: ActionTypes.ADD_TO_CART;
  payload: {
    item: CartItem;
    quantity: number;
  };
}

export interface RemoveFromCartAction {
  type: ActionTypes.REMOVE_FROM_CART;
  payload: CartItem;
}

// export const addToCart: (a: CartItem, b?: number) => AddToCartAction = (
//   item,
//   qty = 1
// ) => {
//   return {
//     type: ActionTypes.ADD_TO_CART,
//     payload: { item: item, quantity: qty },
//   };
// };

export const addToCart: (a: CartItem, b?: number) => void =
  (item, qty = 1) =>
  async (dispatch: Dispatch) => {
    await axios.post(
      `/api/cart`,
      { product_id: item.product_id, quantity: qty },
      { headers: { authorization: localStorage.getItem("token") } }
    );

    dispatch<AddToCartAction>({
      type: ActionTypes.ADD_TO_CART,
      payload: { item: item, quantity: qty },
    });
  };

export const removeFromCart: (
  item: CartItem,
  qty?: number
) => RemoveFromCartAction = (item, qty = 1) => {
  const quantity = item.quantity - qty > 0 ? item.quantity - qty : 0;

  return {
    type: ActionTypes.REMOVE_FROM_CART,
    payload: { ...item, quantity },
  };
};
