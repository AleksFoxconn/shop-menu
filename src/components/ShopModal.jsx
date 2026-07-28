import { useEffect, useMemo, useRef, useState } from 'react';
import { PRODUCTS } from '../data/products';
import { CATEGORIES } from '../data/categories';
import { useTheme } from '../context/ThemeContext';
import { SunIcon, MoonIcon } from './UiIcons';
import Sidebar from './Sidebar';
import SearchBar from './SearchBar';
import ProductGrid from './ProductGrid';
import CartPanel from './CartPanel';
import './ShopModal.scss';

const REFERENCE_WIDTH = 1920;
const REFERENCE_HEIGHT = 1080;

export default function ShopModal({ onClose }) {
  const { theme, toggleTheme } = useTheme();
  const [activeCategory, setActiveCategory] = useState('all');
  const [query, setQuery] = useState('');
  const layoutRef = useRef(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const updateScale = () => {
      const scaleX = window.innerWidth / REFERENCE_WIDTH;
      const scaleY = window.innerHeight / REFERENCE_HEIGHT;
      setScale(Math.max(0.1, Math.min(scaleX, scaleY)));
    };

    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  const productsById = useMemo(
    () => Object.fromEntries(PRODUCTS.map((p) => [p.id, p])),
    []
  );

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchesCategory = activeCategory === 'all' || product.category === activeCategory;
      const matchesQuery = product.name.toLowerCase().includes(query.trim().toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, query]);

  const activeCategoryLabel =
    CATEGORIES.find((c) => c.id === activeCategory)?.label ?? 'Усі товари';

  return (
    <div className="shop-overlay">
      <div className="shop-layout" ref={layoutRef} style={{ transform: `scale(${scale})` }}>
        <div className="shop-layout__top">
          <button className="shop-layout__esc" onClick={onClose}>
            <kbd>ESC</kbd>
            <span className="shop-layout__esc-label">ЗАКРИТИ</span>
          </button>

          <button
            className="shop-layout__theme-toggle"
            onClick={toggleTheme}
            aria-label="Перемкнути тему"
          >
            {theme === 'dark' ? <SunIcon size={16} /> : <MoonIcon size={16} />}
          </button>
        </div>

        <div className="shop-layout__row">
          <div className="shop-modal">
            <Sidebar
              activeCategory={activeCategory}
              onSelectCategory={setActiveCategory}
              shopName="Магазин 24/7"
              shopAddress="м. Лос-Сантос, вул. 6й шосе"
              shopNumber="26"
            />

            <main className="shop-modal__main">
              <SearchBar value={query} onChange={setQuery} />

              <div className="shop-modal__toolbar">
                <span className="shop-modal__category">{activeCategoryLabel}</span>
                <span className="shop-modal__total-count">{filteredProducts.length}</span>
              </div>

              <ProductGrid products={filteredProducts} />
            </main>
          </div>

          <CartPanel productsById={productsById} />
        </div>
      </div>
    </div>
  );
}
