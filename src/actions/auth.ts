import axios, { AxiosResponse } from "axios";
import { ActionTypes } from "./index";
import { Action, Dispatch } from "redux";
import { IState } from "../reducers";

export interface SignInAction {
  type: ActionTypes.SIGN_IN;
  payload: { user: any };
}

export interface SignOutAction {
  type: ActionTypes.SIGN_OUT;
  payload: null;
}

export const sign_in =
  (auth: { [key: string]: string }) =>
  async (dispatch: Dispatch<SignInAction>) => {
    const { data }: any = await axios.post(`/api/auth`, auth);

    if (!data.token) return;

    console.log(data);

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", data.user);

    dispatch<SignInAction>({
      type: ActionTypes.SIGN_IN,
      payload: data.user,
    });
  };

export const sign_out: () => SignOutAction = () => {
  localStorage.removeItem("token");
  return {
    type: ActionTypes.SIGN_OUT,
    payload: null,
  };
};
