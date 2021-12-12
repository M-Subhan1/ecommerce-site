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

export const fetchItem = (productId: number) => async (dispatch: Dispatch) => {
  console.log(productId);
  const {
    data: { item },
  } = await axios.get(`/api/items/${productId}`);

  dispatch<FetchItemAction>({
    type: ActionTypes.FETCH_ITEM,
    payload: item,
  });
};

export const fetchItems = () => async (dispatch: Dispatch) => {
  const {
    data: { books },
  } = await axios.get("/api/items/");

  dispatch<FetchItemsAction>({
    type: ActionTypes.FETCH_ITEMS,
    payload: books,
  });
};
