import { Link } from 'react-router-dom';
import { ShoppingCart, Pizza } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { totalItems } = useCart();

  return (
    <nav className="bg-orange-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold">
          <Pizza size={28} />
          <span>Pizza Shop</span>
        </Link>
        <Link
          to="/cart"
          className="flex items-center gap-2 bg-orange-700 hover:bg-orange-800 px-4 py-2 rounded-lg transition-colors relative"
        >
          <ShoppingCart size={20} />
          <span>Cart</span>
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
}
