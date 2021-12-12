import { ActionTypes } from ".";

export interface CartItem {
  id: number;
  title: string;
  medium: string;
  class: number;
  stock: number;
  image: {
    url: string;
  };
  category: {
    type: string;
    description: string;
  };
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

export const addToCart: (a: CartItem, b?: number) => AddToCartAction = (
  item,
  qty = 1
) => {
  return {
    type: ActionTypes.ADD_TO_CART,
    payload: { item: item, quantity: qty },
  };
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
