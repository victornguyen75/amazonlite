import { createContext, useReducer } from "react";
import Cookies from "js-cookie";

import { Product } from "./data";

export const Store = createContext(undefined);

export interface CartInterface {
  cart: {
    items: Product[];
  };
}

export interface ActionInterface {
  type: string;
  payload: Product;
}

const defaultState = { items: [] };

const initialState: CartInterface = {
  cart: Cookies.get("cart") ? JSON.parse(Cookies.get("cart")) : defaultState,
};

const reducer = (state: CartInterface, action: ActionInterface) => {
  switch (action.type) {
    case "CART_ADD_ITEM": {
      const newItem: Product = action.payload;
      const existingItem: Product = state.cart.items.find(
        (item: Product) => item.slug === newItem.slug
      );

      const items: Product[] = existingItem
        ? state.cart.items.map((item: Product) =>
            item.name === existingItem.name ? newItem : item
          )
        : [...state.cart.items, newItem];

      Cookies.set("cart", JSON.stringify({ ...state.cart, items }));
      return { ...state, cart: { ...state.cart, items } };
    }
    case "CART_REMOVE_ITEM": {
      const updatedItems = state.cart.items.filter(
        (item) => item.slug !== action.payload.slug
      );

      Cookies.set("cart", JSON.stringify({ ...state.cart, updatedItems }));
      return { ...state, cart: { ...state.cart, updatedItems } };
    }
    default:
      return state;
  }
};

export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{children}</Store.Provider>;
};
