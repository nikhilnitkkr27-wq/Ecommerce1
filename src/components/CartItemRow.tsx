import { Plus, Minus, Trash2 } from 'lucide-react';
import type { CartItem } from '../types';
import { useCart } from '../context/CartContext';

interface CartItemRowProps {
  item: CartItem;
}

export default function CartItemRow({ item }: CartItemRowProps) {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div className="flex items-center gap-4 py-4 border-b">
      <div className="flex-grow">
        <h3 className="font-semibold text-gray-800">{item.name}</h3>
        <p className="text-sm text-gray-600">₹{item.price} each</p>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => updateQuantity(item.id, item.quantity - 1)}
          className="p-1 rounded bg-gray-200 hover:bg-gray-300"
        >
          <Minus size={16} />
        </button>
        <span className="w-8 text-center font-medium">{item.quantity}</span>
        <button
          onClick={() => updateQuantity(item.id, item.quantity + 1)}
          className="p-1 rounded bg-gray-200 hover:bg-gray-300"
        >
          <Plus size={16} />
        </button>
      </div>
      <div className="w-24 text-right font-semibold">₹{item.price * item.quantity}</div>
      <button
        onClick={() => removeFromCart(item.id)}
        className="p-2 rounded text-red-600 hover:bg-red-50"
      >
        <Trash2 size={20} />
      </button>
    </div>
  );
}
