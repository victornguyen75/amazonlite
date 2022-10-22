import { createContext, useReducer, ReactNode } from "react";
import Cookies from "js-cookie";

import { Product } from "./data";

export const Store = createContext(undefined);

export interface State {
  cart: CartInterface;
}
export interface CartInterface {
  items: Product[];
  shippingAddress: { location: {} };
  paymentMethod: string;
}

const defaultCart: CartInterface = {
  items: [],
  shippingAddress: { location: {} },
  paymentMethod: "",
};

const initalState: State = {
  cart: Cookies.get("cart") ? JSON.parse(Cookies.get("cart")) : defaultCart,
};

export interface ActionInterface {
  type: string;
  payload: Product;
}

const reducer = (state: State, action: ActionInterface) => {
  switch (action.type) {
    case "CART_ADD_ITEM": {
      const newItem: Product = action.payload;
      const existingItem: Product = state.cart.items.find(
        (item: Product) => item.slug === newItem.slug
      );

      const updatedItems: Product[] = existingItem
        ? state.cart.items.map((item: Product) =>
            item.name === existingItem.name ? newItem : item
          )
        : [...state.cart.items, newItem];

      Cookies.set(
        "cart",
        JSON.stringify({ ...state.cart, items: updatedItems })
      );
      return { ...state, cart: { ...state.cart, items: updatedItems } };
    }
    case "CART_REMOVE_ITEM": {
      const updatedItems = state.cart.items.filter(
        (item) => item.slug !== action.payload.slug
      );

      Cookies.set(
        "cart",
        JSON.stringify({ ...state.cart, items: updatedItems })
      );
      return { ...state, cart: { ...state.cart, items: updatedItems } };
    }
    case "CART_RESET": {
      return {
        ...state,
        cart: defaultCart,
      };
    }
    default:
      return state;
  }
};

interface StoreProps {
  children: ReactNode;
}

export const StoreProvider = ({ children }: StoreProps): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, initalState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{children}</Store.Provider>;
};
