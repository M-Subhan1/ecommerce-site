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
  SelectItemAction,
  DeleteItemAction,
} from ".";

export enum ActionTypes {
  // ITEMS
  FETCH_ITEM,
  FETCH_ITEMS,
  DELETE_ITEM,
  // USERS
  SIGN_IN,
  SIGN_OUT,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  SELECT_ITEM,
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
  | SetSnackBarAction
  | SelectItemAction
  | DeleteItemAction;
