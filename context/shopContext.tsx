import { createContext, ReactNode, useContext, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

interface ProviderProps {
  children: ReactNode;
}

interface CartItem {
  id: string;
  quantity: number;
  name: string;
  price: number;
  image: string;
}

interface ShopContextProps {
  increaseItemQuantity: (id: string) => void;
  decreaseItemQuantity: (id: string) => void;
  changeItemQuantity: (id: string, amount: number) => void;
  getItemQuantity: (id: string) => number;
  removeItem: (id: string) => void;
  addProduct: (product: any, amount: number) => void;
  openCart: () => void;
  closeCart: () => void;
  isOpen: boolean;
  totalCartQuantity: number;
  totalPrice: number;
  cartItems: CartItem[] | undefined;
}

const ShopContext = createContext({} as ShopContextProps);

export const useShopContext = () => {
  return useContext(ShopContext);
};

export const CartProvider = ({ children }: ProviderProps) => {
  const [cartItems, setCartItems] = useLocalStorage<CartItem>();
  const [isOpen, setIsOpen] = useState(false);

  const increaseItemQuantity = (id: string) => {
    if (!cartItems.find((item) => item.id === id)) {
      return;
    }

    setCartItems((preCart) => {
      return preCart.map((item) => {
        if (item.id === id) {
          return { ...item, quantity: item.quantity + 1 };
        } else {
          return item;
        }
      });
    });
  };

  const decreaseItemQuantity = (id: string) => {
    setCartItems((prevCart) => {
      if (prevCart.find((item) => item.id === id)?.quantity === 1) {
        return prevCart.filter((item) => item.id !== id);
      } else {
        return prevCart.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  };

  const addProduct = (product: any, amount: number) => {
    setCartItems((preCart) => {
      if (preCart.find((item) => item.id === product.id)) {
        return preCart.map((item) => {
          if (item.id === product.id) {
            return { ...item, quantity: item.quantity + amount };
          } else {
            return item;
          }
        });
      } else {
        return [
          ...preCart,
          {
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: amount,
            image: product.image,
          },
        ];
      }
    });
  };

  const changeItemQuantity = (id: string, amount: number) => {
    if (!cartItems.find((item) => item.id === id)) {
      return;
    }

    setCartItems((preCart) => {
      return preCart.map((item) => {
        if (item.id === id) {
          return { ...item, quantity: amount };
        } else {
          return item;
        }
      });
    });
  };

  const getItemQuantity = (id: string) => {
    return cartItems.find((item) => item.id === id)?.quantity || 0;
  };

  const removeItem = (id: string) => {
    setCartItems((prevCart) => {
      return prevCart.filter((item) => item.id !== id);
    });
  };

  const openCart = () => {
    setIsOpen(true);
  };

  const closeCart = () => {
    setIsOpen(false);
  };

  const totalCartQuantity = cartItems
    ? cartItems.reduce((quantity, item) => item.quantity + quantity, 0)
    : 0;

  const totalPrice = cartItems
    ? cartItems.reduce((total, item) => item.quantity * item.price + total, 0)
    : 0;

  return (
    <ShopContext.Provider
      value={{
        increaseItemQuantity,
        decreaseItemQuantity,
        getItemQuantity,
        removeItem,
        openCart,
        closeCart,
        addProduct,
        changeItemQuantity,
        isOpen,
        totalCartQuantity,
        totalPrice,
        cartItems,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};
