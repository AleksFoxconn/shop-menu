import ProductIcon from './ProductIcon';
import cartIconUrl from '../assets/mynaui_cart.svg';
import { useCart } from '../context/CartContext';
import './ProductCard.scss';

export default function ProductCard({ product }) {
  const { items, addToCart, removeFromCart } = useCart();

  const inCart = (items[product.id] || 0) > 0;
  const buttonLabel = inCart ? 'Вилучити з кошика' : 'Додати в кошик';

  const handleClick = () => {
    if (inCart) {
      removeFromCart(product.id);
    } else {
      addToCart(product);
    }
  };

  return (
    <article className={`product-card ${inCart ? 'is-in-cart' : ''}`}>
      <div className="product-card__icon">
        <ProductIcon name={product.icon} size={44} />
      </div>

      <h3 className="product-card__name">{product.name}</h3>
      <p className="product-card__desc">{product.description}</p>

      <div className="product-card__footer">
        <span className="product-card__price">${product.price.toLocaleString('uk-UA')}</span>
        <button
          className={`product-card__btn ${inCart ? 'is-primary' : ''}`}
          onClick={handleClick}
        >
          {inCart ? (
            <>
              <img src={cartIconUrl} alt="" width={14} height={14} />
              {buttonLabel}
            </>
          ) : (
            <>
              {buttonLabel}
              <img src={cartIconUrl} alt="" width={14} height={14} />
            </>
          )}
        </button>
      </div>
    </article>
  );
}
