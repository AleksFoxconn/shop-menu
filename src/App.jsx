import { useCallback, useEffect, useState } from 'react';
import { CartProvider } from './context/CartContext';
import { ThemeProvider } from './context/ThemeContext';
import ShopModal from './components/ShopModal';

export default function App() {
  const [isOpen, setIsOpen] = useState(true);

  const close = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [close]);

  return (
    <ThemeProvider>
      <CartProvider>
        {isOpen ? (
          <ShopModal onClose={close} />
        ) : (
          <div className="shop-closed">
            <button onClick={() => setIsOpen(true)}>Відкрити магазин знову</button>
          </div>
        )}
      </CartProvider>
    </ThemeProvider>
  );
}
