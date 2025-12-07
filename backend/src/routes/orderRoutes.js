import express from 'express';
import { supabase } from '../config/supabase.js';

const router = express.Router();

function generateOrderId() {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `ORD-${timestamp}-${random}`;
}

router.post('/', async (req, res, next) => {
  try {
    const { items, customer } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'Invalid items' });
    }

    if (!customer || !customer.name || !customer.email) {
      return res.status(400).json({ error: 'Customer name and email are required' });
    }

    const productIds = items.map(item => item.productId);

    const { data: products, error: fetchError } = await supabase
      .from('products')
      .select('*')
      .in('id', productIds);

    if (fetchError) throw fetchError;

    if (products.length !== productIds.length) {
      return res.status(400).json({ error: 'One or more products not found' });
    }

    const orderItems = [];
    let totalAmount = 0;

    for (const item of items) {
      const product = products.find(p => p.id === item.productId);

      if (!product) {
        return res.status(400).json({ error: `Product ${item.productId} not found` });
      }

      if (product.inventory < item.quantity) {
        return res.status(400).json({
          error: `Insufficient inventory for ${product.name}. Available: ${product.inventory}, Requested: ${item.quantity}`
        });
      }

      const itemTotal = parseFloat(product.price) * item.quantity;
      totalAmount += itemTotal;

      orderItems.push({
        productId: product.id,
        name: product.name,
        price: parseFloat(product.price),
        quantity: item.quantity
      });
    }

    for (const item of items) {
      const product = products.find(p => p.id === item.productId);
      const newInventory = product.inventory - item.quantity;

      const { error: updateError } = await supabase
        .from('products')
        .update({ inventory: newInventory })
        .eq('id', item.productId);

      if (updateError) throw updateError;
    }

    const orderId = generateOrderId();

    const { error: insertError } = await supabase
      .from('orders')
      .insert({
        order_id: orderId,
        customer_name: customer.name,
        customer_email: customer.email,
        items: orderItems,
        total_amount: totalAmount
      });

    if (insertError) throw insertError;

    res.json({ status: 'success', orderId });
  } catch (error) {
    next(error);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({ error: 'Email parameter is required' });
    }

    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('customer_email', email)
      .order('created_at', { ascending: false });

    if (error) throw error;

    const formattedOrders = data.map(order => ({
      orderId: order.order_id,
      customerName: order.customer_name,
      customerEmail: order.customer_email,
      items: order.items,
      totalAmount: parseFloat(order.total_amount),
      createdAt: order.created_at
    }));

    res.json(formattedOrders);
  } catch (error) {
    next(error);
  }
});

export default router;
