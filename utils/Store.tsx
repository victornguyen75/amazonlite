import { createContext, useReducer } from "react";
import { Product } from "./data";

export const Store = createContext({});

export interface CartState {
  cart: {
    cartItems: Product[];
  };
}

const initialState: CartState = {
  cart: { cartItems: [] },
};

const reducer = (state, action) => {
  switch (action.type) {
    case "CART_ADD_ITEM": {
      const newItem: Product = action.payload;
      const existingItem: Product = state.cart.items.find(
        (item: Product) => item.slug === newItem.slug
      );

      const updatedCart = existingItem
        ? state.cart.items.map((item: Product) =>
            item.name === existingItem.name ? newItem : item
          )
        : [...state.cart.cartItems, newItem];

      return { ...state, cart: { ...state.cart, updatedCart } };
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
