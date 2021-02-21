import { useState, createContext, useContext, useEffect } from "react";
import products from "../products.json";
import { initiateCheckout } from "../lib/payments";

const defaultCart = {
  products: {}
};

export const CartContext = createContext();

export function useCartState() {
  const [cart, updateCart] = useState(defaultCart);

  useEffect(() => {
    const persistCarts = window.localStorage.getItem('persistCarts');
    const parsedPersistCarts = persistCarts ? JSON.parse(persistCarts) : [];

    if(parsedPersistCarts) {
      updateCart(parsedPersistCarts);
    }
  }, []);

  useEffect(() => {
    const persistCarts = JSON.stringify(cart);
    window.localStorage.setItem('persistCarts', persistCarts);
  }, [cart]);

  const cartItems = cart.products && Object.keys(cart.products).map(productKey => {
    const product = products.find(({ id }) => id === productKey);
    return {
      ...cart.products[productKey],
      pricePerItem: product.price
    };
  });

  const subTotal = cartItems.reduce((accumulator, { pricePerItem, quantity }) => {
    return accumulator + pricePerItem * quantity;
  }, 0);

  const numberOfItems = cartItems.reduce((accumulator, {quantity}) => {
    return accumulator + quantity;
  }, 0);

  function addToCart({ id } = {}) {
    updateCart(prevState => {
      let cartState = {...prevState};

      if (cartState.products[id]) {
        cartState.products[id].quantity = cartState.products[id].quantity + 1;
      } else {
        cartState.products[id] = {
          id,
          quantity: 1
        };
      }

      return cartState;
    });
  };

  function checkout() {
    initiateCheckout({
      lineItems: cartItems.map(item => {
        return {
          price: item.id,
          quantity: item.quantity
        }
      })
    });
  };

  return {
    cartItems,
    subTotal,
    numberOfItems,
    addToCart,
    checkout,
  };
};

export function useCart() {
  const cart = useContext(CartContext);
  return cart;
};
