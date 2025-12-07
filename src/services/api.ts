import type { Product, OrderPayload, OrderResponse } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

const headers = {
  'Content-Type': 'application/json',
  'x-api-key': API_KEY,
};

export async function fetchMenu(): Promise<Product[]> {
  const response = await fetch(`${API_BASE_URL}/menu`, { headers });
  if (!response.ok) throw new Error('Failed to fetch menu');
  return response.json();
}

export async function placeOrder(payload: OrderPayload): Promise<OrderResponse> {
  const response = await fetch(`${API_BASE_URL}/order`, {
    method: 'POST',
    headers,
    body: JSON.stringify(payload),
  });
  if (!response.ok) throw new Error('Failed to place order');
  return response.json();
}
