import { ActionTypes } from ".";
import axios from "axios";
import { Dispatch } from "redux";

export interface IItem {}

export interface FetchItemAction {
  type: ActionTypes.FETCH_ITEM;
  payload: IItem;
}

export interface FetchItemsAction {
  type: ActionTypes.FETCH_ITEMS;
  payload: IItem[];
}

export interface DeleteItemAction {
  type: ActionTypes.DELETE_ITEM;
  payload: string;
}

export interface SelectItemAction {
  type: ActionTypes.SELECT_ITEM;
  payload: IItem;
}

export const fetchItem = (productId: number) => async (dispatch: Dispatch) => {
  const {
    data: { item },
  } = await axios.get(`/api/products/${productId}`);

  console.log(item);

  dispatch<FetchItemAction>({
    type: ActionTypes.FETCH_ITEM,
    payload: item,
  });
};

export const fetchItems = () => async (dispatch: Dispatch) => {
  const {
    data: { items },
  } = await axios.get("/api/products/");

  dispatch<FetchItemsAction>({
    type: ActionTypes.FETCH_ITEMS,
    payload: items,
  });
};

export const selectItem: (item: IItem) => SelectItemAction = (item: IItem) => {
  return {
    type: ActionTypes.SELECT_ITEM,
    payload: item,
  };
};

export const deleteItem =
  (product_id: string) => async (dispatch: Dispatch) => {
    const token = localStorage.getItem("token");
    const res = await axios.delete(`/api/products/${product_id}`, {
      headers: {
        Authorization: token,
      },
    });

    dispatch<DeleteItemAction>({
      type: ActionTypes.DELETE_ITEM,
      payload: product_id,
    });
  };
