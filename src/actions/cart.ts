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

export interface EmptyCartAction {
  type: ActionTypes.EMPTY_CART;
  payload: null;
}

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

export const removeFromCart: (a: CartItem, b?: number) => void =
  (item, qty = 1) =>
  async (dispatch: Dispatch) => {
    await axios.post(
      `/api/cart`,
      { product_id: item.product_id, quantity: -1 * qty },
      { headers: { authorization: localStorage.getItem("token") } }
    );

    const quantity = item.quantity - qty > 0 ? item.quantity - qty : 0;

    dispatch<RemoveFromCartAction>({
      type: ActionTypes.REMOVE_FROM_CART,
      payload: { ...item, quantity },
    });
  };

export const emptyCart = () => {
  return {
    type: ActionTypes.EMPTY_CART,
    payload: null,
  };
};
