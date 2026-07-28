import ProductCard from './ProductCard';
import './ProductGrid.scss';

export default function ProductGrid({ products }) {
  if (products.length === 0) {
    return <p className="product-grid__empty">Нічого не знайдено за вашим запитом.</p>;
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
