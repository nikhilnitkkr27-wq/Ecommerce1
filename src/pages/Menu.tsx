import { useEffect, useState } from 'react';
import type { Product } from '../types';
import { fetchMenu } from '../services/api';
import ProductCard from '../components/ProductCard';

type Category = 'Pizza' | 'Cold Drinks' | 'Breads';

const categories: Category[] = ['Pizza', 'Cold Drinks', 'Breads'];

export default function Menu() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category>('Pizza');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchMenu()
      .then(setProducts)
      .catch(() => setError('Failed to load menu'))
      .finally(() => setLoading(false));
  }, []);

  const filteredProducts = products.filter((p) => p.category === selectedCategory);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Our Menu</h1>

      <div className="flex gap-3 mb-8 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              selectedCategory === cat
                ? 'bg-orange-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {loading && <p className="text-center text-gray-600">Loading menu...</p>}
      {error && <p className="text-center text-red-600">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {!loading && !error && filteredProducts.length === 0 && (
        <p className="text-center text-gray-600">No items in this category</p>
      )}
    </div>
  );
}
