import { ActionTypes } from "./index";

export enum SnackBarType {
  success = "success",
  error = "error",
}

export interface SnackBarState {
  isOpen: boolean;
  type: SnackBarType;
  message: string;
}

export interface SetSnackBarAction {
  type: ActionTypes.SET_SNACKBAR;
  payload: SnackBarState;
}

export const setSnackBar = (payload: SnackBarState): SetSnackBarAction => {
  return {
    type: ActionTypes.SET_SNACKBAR,
    payload,
  };
};
