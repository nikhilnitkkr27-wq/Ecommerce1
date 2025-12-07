import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import type { Product } from '../types';
import { useCart } from '../context/CartContext';
import Button from './Button';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setQuantity(1);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex flex-col">
      <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
      <p className="text-sm text-gray-600 mt-1 flex-grow">{product.description}</p>
      <div className="mt-4 flex items-center justify-between">
        <span className="text-xl font-bold text-orange-600">₹{product.price}</span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="p-1 rounded bg-gray-200 hover:bg-gray-300"
          >
            <Minus size={16} />
          </button>
          <span className="w-8 text-center font-medium">{quantity}</span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="p-1 rounded bg-gray-200 hover:bg-gray-300"
          >
            <Plus size={16} />
          </button>
        </div>
      </div>
      <Button onClick={handleAddToCart} className="mt-3 w-full">
        Add to Cart
      </Button>
    </div>
  );
}
