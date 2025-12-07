export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'Pizza' | 'Cold Drinks' | 'Breads';
}

export interface CartItem extends Product {
  quantity: number;
}

export interface OrderPayload {
  items: Array<{
    productId: string;
    quantity: number;
  }>;
  customerName: string;
  customerPhone: string;
}

export interface OrderResponse {
  orderId: string;
}
