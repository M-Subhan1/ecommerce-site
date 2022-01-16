import { ActionTypes } from ".";
import axios from "axios";
import { Dispatch } from "redux";

export interface IOrder {}

export interface PlaceOrderAction {
  type: ActionTypes.PLACE_ORDER;
  payload: null;
}

export interface CancelOrderAction {
  type: ActionTypes.CANCEL_ORDER;
  payload: null;
}

export const placeOrder = (data: IOrder[]) => async (dispatch: Dispatch) => {
  const response = await axios.post(
    "/api/orders",
    { data },
    { headers: { authorization: localStorage.getItem("token") } }
  );
  if (response.data.success)
    dispatch<PlaceOrderAction>({
      type: ActionTypes.PLACE_ORDER,
      payload: null,
    });
};

export const cancelOrder = () => async (dispatch: Dispatch) => {
  dispatch<CancelOrderAction>({
    type: ActionTypes.CANCEL_ORDER,
    payload: null,
  });
};
