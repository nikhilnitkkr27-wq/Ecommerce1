import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CartItemRow from '../components/CartItemRow';
import Button from '../components/Button';
import { placeOrder } from '../services/api';

export default function Cart() {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');

  const handlePlaceOrder = async () => {
    if (!customerName || !customerPhone) {
      setError('Please provide name and phone number');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const { orderId } = await placeOrder({
        items: items.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
        })),
        customerName,
        customerPhone,
      });
      clearCart();
      navigate(`/order-success/${orderId}`);
    } catch {
      setError('Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Your Cart is Empty</h1>
        <p className="text-gray-600 mb-8">Add some delicious items to get started!</p>
        <Button onClick={() => navigate('/')}>Browse Menu</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Your Cart</h1>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        {items.map((item) => (
          <CartItemRow key={item.id} item={item} />
        ))}
        <div className="mt-6 pt-4 border-t flex justify-between items-center">
          <span className="text-xl font-bold">Grand Total:</span>
          <span className="text-2xl font-bold text-orange-600">₹{totalPrice}</span>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Customer Details</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="Enter your name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <input
              type="tel"
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="Enter your phone number"
            />
          </div>
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <Button
            onClick={handlePlaceOrder}
            disabled={loading}
            className="w-full text-lg"
          >
            {loading ? 'Placing Order...' : 'Place Order'}
          </Button>
        </div>
      </div>
    </div>
  );
}
