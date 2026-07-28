import { Fragment, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { useCart } from '../context/CartContext';
import ProductIcon from './ProductIcon';
import { MinusIcon, PlusIcon, TrashIcon } from './UiIcons';
import moneyIconUrl from '../assets/money.svg';
import cardIconUrl from '../assets/card.svg';
import dollarIconUrl from '../assets/dollar.svg';
import './CartPanel.scss';

export default function CartPanel({ productsById }) {
  const { items, increment, decrement, removeFromCart, cash, bank, paymentMethod, setPaymentMethod } = useCart();

  const cashRef = useRef(null);
  const bankRef = useRef(null);
  const [thumb, setThumb] = useState({ left: 0, width: 0 });

  useLayoutEffect(() => {
    const activeEl = paymentMethod === 'cash' ? cashRef.current : bankRef.current;
    if (!activeEl) return;
    setThumb({ left: activeEl.offsetLeft, width: activeEl.offsetWidth });
  }, [paymentMethod]);

  const cartRows = useMemo(
    () =>
      Object.entries(items)
        .map(([id, qty]) => ({ product: productsById[id], qty }))
        .filter((row) => row.product),
    [items, productsById]
  );

  const totalCount = cartRows.reduce((sum, row) => sum + row.qty, 0);
  const totalPrice = cartRows.reduce((sum, row) => sum + row.qty * row.product.price, 0);

  const formatMoney = (value) => `$${value.toLocaleString('uk-UA')}`;

  return (
    <aside className="cart-panel">
      <div className="cart-panel__header">
        <h2>Кошик товарів</h2>
        <span className="cart-panel__count">{totalCount}</span>
      </div>

      <div className="cart-panel__list">
        {cartRows.length === 0 && <p className="cart-panel__empty">Кошик порожній</p>}

        {cartRows.map(({ product, qty }, index) => (
          <Fragment key={product.id}>
            {index > 0 && <div className="cart-row__divider" />}
            <div className="cart-row">
            <div className="cart-row__icon">
              <ProductIcon name={product.icon} size={40} />
            </div>

            <div className="cart-row__info">
              <span className="cart-row__name">{product.name}</span>
              <span className="cart-row__price">${product.price.toLocaleString('uk-UA')}</span>
            </div>

            <div className="cart-row__controls">
              <div className="cart-row__stepper">
                <button
                  className="cart-row__step cart-row__step--minus"
                  onClick={() => decrement(product.id)}
                  aria-label="Зменшити"
                >
                  <MinusIcon size={11} />
                </button>
                <span className="cart-row__qty-value">{qty}</span>
                <button
                  className="cart-row__step cart-row__step--plus"
                  onClick={() => increment(product.id)}
                  aria-label="Збільшити"
                >
                  <PlusIcon size={11} />
                </button>
              </div>
              <button className="cart-row__remove" onClick={() => removeFromCart(product.id)} aria-label="Видалити">
                <TrashIcon size={17} />
              </button>
            </div>
            </div>
          </Fragment>
        ))}
      </div>

      <div className="cart-panel__footer">
        <button className="cart-panel__pay" disabled={totalCount === 0}>
          <span className="cart-panel__pay-icon">
            <img src={dollarIconUrl} alt="" width={16} height={22} />
          </span>
          <span className="cart-panel__pay-label">До сплати: {formatMoney(totalPrice)}</span>
        </button>

        <div className="cart-panel__balances">
          <div
            className="cart-panel__balances-thumb"
            style={{ transform: `translateX(${thumb.left}px)`, width: `${thumb.width}px` }}
          />
          <button
            type="button"
            ref={cashRef}
            className={`balance-chip balance-chip--cash ${paymentMethod === 'cash' ? 'is-selected' : ''}`}
            onClick={() => setPaymentMethod('cash')}
          >
            <img src={moneyIconUrl} alt="" width={18} height={18} />
            {formatMoney(cash)}
          </button>
          <button
            type="button"
            ref={bankRef}
            className={`balance-chip balance-chip--bank ${paymentMethod === 'bank' ? 'is-selected' : ''}`}
            onClick={() => setPaymentMethod('bank')}
          >
            <img src={cardIconUrl} alt="" width={18} height={18} />
            {formatMoney(bank)}
          </button>
        </div>
      </div>
    </aside>
  );
}
