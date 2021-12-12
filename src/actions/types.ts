import {
  FetchItemAction,
  FetchItemsAction,
  SignInAction,
  SignOutAction,
  AddToCartAction,
  RemoveFromCartAction,
  PlaceOrderAction,
  CancelOrderAction,
  SetSnackBarAction,
} from ".";

export enum ActionTypes {
  // ITEMS
  FETCH_ITEM,
  FETCH_ITEMS,
  // USERS
  SIGN_IN,
  SIGN_OUT,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  // ORDER
  PLACE_ORDER,
  CANCEL_ORDER,
  // SNACK BAR
  SET_SNACKBAR,
}

export type Action =
  | SignInAction
  | SignOutAction
  | FetchItemAction
  | FetchItemsAction
  | AddToCartAction
  | RemoveFromCartAction
  | PlaceOrderAction
  | CancelOrderAction
  | SetSnackBarAction;
