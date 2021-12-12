import axios, { AxiosResponse } from "axios";
import { ActionTypes } from "./index";
import { Action, Dispatch } from "redux";
import { IState } from "../reducers";

declare const process: {
  env: {
    STRAPI_URL: string;
  };
};

export interface SignInAction {
  type: ActionTypes.SIGN_IN;
  payload: IState["user"];
}

export interface SignOutAction {
  type: ActionTypes.SIGN_OUT;
  payload: null;
}

export const sign_in =
  (auth: { [key: string]: string }) =>
  async (dispatch: Dispatch<SignInAction>) => {
    const { data }: any = await axios.post(
      `${process.env.STRAPI_URL}/auth/local`,
      auth
    );

    if (!data.jwt) return;

    localStorage.setItem("token", data.jwt);
    localStorage.setItem("user", JSON.stringify(auth));

    dispatch<SignInAction>({
      type: ActionTypes.SIGN_IN,
      payload: data.user,
    });
  };

export const sign_out: () => SignOutAction = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  return {
    type: ActionTypes.SIGN_OUT,
    payload: null,
  };
};
