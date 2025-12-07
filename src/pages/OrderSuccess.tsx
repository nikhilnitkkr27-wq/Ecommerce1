import { useParams, useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import Button from '../components/Button';

export default function OrderSuccess() {
  const { orderId } = useParams();
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8 text-center">
        <CheckCircle className="mx-auto text-green-500 mb-4" size={64} />
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Order Successful!</h1>
        <p className="text-gray-600 mb-6">Your order has been placed successfully.</p>
        <div className="bg-gray-100 rounded-lg p-4 mb-6">
          <p className="text-sm text-gray-600 mb-1">Order ID</p>
          <p className="text-2xl font-mono font-bold text-orange-600">{orderId}</p>
        </div>
        <p className="text-sm text-gray-600 mb-8">
          We'll start preparing your order right away. Thank you for choosing us!
        </p>
        <Button onClick={() => navigate('/')} className="w-full">
          Back to Menu
        </Button>
      </div>
    </div>
  );
}
