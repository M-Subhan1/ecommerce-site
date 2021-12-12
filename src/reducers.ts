import { ActionTypes, Action, SnackBarState, SnackBarType } from "./actions";
import { combineReducers } from "redux";
import { CartItem } from "./actions/cart";

interface ResponseUser {}

export interface IState {
  user: null | ResponseUser;
  books: CartItem[];
  selectedBook: null | CartItem;
  cart: CartItem[];
  snackbar: SnackBarState;
}

const user = (state: ResponseUser | null = null, action: Action) => {
  switch (action.type) {
    case ActionTypes.SIGN_IN:
      sessionStorage.setItem("user", JSON.stringify(action.payload));
      return action.payload;
    case ActionTypes.SIGN_OUT:
      sessionStorage.removeItem("user");
      return null;
    default:
      return state;
  }
};

const books = (state: CartItem[] = [], action: Action) => {
  switch (action.type) {
    case ActionTypes.FETCH_ITEMS:
      return action.payload;
    case ActionTypes.ADD_TO_CART:
      return state.map(book =>
        book.id === action.payload.item.id
          ? { ...book, stock: book.stock - action.payload.quantity }
          : book
      );
    default:
      return state;
  }
};

const selectedBook = (state: CartItem | null = null, action: Action) => {
  switch (action.type) {
    case ActionTypes.FETCH_ITEM:
      return action.payload;
    default:
      return state;
  }
};

const cart = (state: CartItem[] = [], action: Action) => {
  switch (action.type) {
    case ActionTypes.PLACE_ORDER:
    case ActionTypes.CANCEL_ORDER:
      return [];

    case ActionTypes.ADD_TO_CART: {
      const { item, quantity } = action.payload;
      const index = state.findIndex(el => el.id === item.id);
      const newState = [...state];

      if (index !== -1) newState[index].quantity += quantity;
      else newState.push({ ...item, quantity });

      return newState;
    }

    case ActionTypes.REMOVE_FROM_CART:
      return state
        .map(item => (item.id === action.payload.id ? action.payload : item))
        .filter(item => (item.quantity > 0 ? true : false));

    default:
      return state;
  }
};

const snackbar = (
  state: SnackBarState = {
    isOpen: false,
    type: SnackBarType.success,
    message: "",
  },
  action: Action
) => {
  switch (action.type) {
    case ActionTypes.SET_SNACKBAR:
      return action.payload;

    case ActionTypes.ADD_TO_CART:
      return {
        isOpen: true,
        message: "Successfully Added to Cart",
        type: SnackBarType.success,
      };

    case ActionTypes.REMOVE_FROM_CART:
      return {
        isOpen: true,
        message: "Removed One Item from Cart",
        type: SnackBarType.success,
      };

    case ActionTypes.SIGN_IN: {
      console.log(action.payload);
      return action.payload
        ? { isOpen: true, message: `Welcome`, type: SnackBarType.success }
        : {
            isOpen: true,
            message: "Incorrect Email or Password",
            type: SnackBarType.error,
          };
    }

    case ActionTypes.SIGN_OUT:
      return {
        isOpen: true,
        message: "Successfully Signed Out",
        type: SnackBarType.success,
      };

    default:
      return state;
  }
};

export default combineReducers({ user, books, cart, snackbar, selectedBook });
