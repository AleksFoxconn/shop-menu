import { createContext, useContext, useMemo, useState, useCallback } from 'react';

const CartContext = createContext(null);

const INITIAL_CASH = 122855;
const INITIAL_BANK = 14222855;

export function CartProvider({ children }) {
  const [items, setItems] = useState({});
  const [cash] = useState(INITIAL_CASH);
  const [bank] = useState(INITIAL_BANK);
  const [paymentMethod, setPaymentMethod] = useState('cash');

  const addToCart = useCallback((product) => {
    setItems((prev) => ({
      ...prev,
      [product.id]: (prev[product.id] || 0) + 1,
    }));
  }, []);

  const increment = useCallback((productId) => {
    setItems((prev) => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1,
    }));
  }, []);

  const decrement = useCallback((productId) => {
    setItems((prev) => {
      const nextQty = (prev[productId] || 0) - 1;
      if (nextQty <= 0) {
        const { [productId]: _removed, ...rest } = prev;
        return rest;
      }
      return { ...prev, [productId]: nextQty };
    });
  }, []);

  const removeFromCart = useCallback((productId) => {
    setItems((prev) => {
      const { [productId]: _removed, ...rest } = prev;
      return rest;
    });
  }, []);

  const clearCart = useCallback(() => setItems({}), []);

  const value = useMemo(
    () => ({
      items,
      addToCart,
      increment,
      decrement,
      removeFromCart,
      clearCart,
      cash,
      bank,
      paymentMethod,
      setPaymentMethod,
    }),
    [items, addToCart, increment, decrement, removeFromCart, clearCart, cash, bank, paymentMethod]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart має використовуватись всередині <CartProvider>');
  return ctx;
}
