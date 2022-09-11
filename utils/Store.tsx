import { createContext, useReducer } from "react";
import { Product } from "./data";

export const Store = createContext(undefined);

export interface CartState {
  cart: {
    items: Product[];
  };
}

const initialState: CartState = {
  cart: { items: [] },
};

const reducer = (state, action) => {
  switch (action.type) {
    case "CART_ADD_ITEM": {
      const newItem: Product = action.payload;
      const existingItem: Product = state.cart.items.find(
        (item: Product) => item.slug === newItem.slug
      );

      const items = existingItem
        ? state.cart.items.map((item: Product) =>
            item.name === existingItem.name ? newItem : item
          )
        : [...state.cart.items, newItem];

      return { ...state, cart: { ...state.cart, items } };
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
