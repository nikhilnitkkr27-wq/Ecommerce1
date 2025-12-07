import express from 'express';
import { supabase } from '../config/supabase.js';

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('category', { ascending: true })
      .order('name', { ascending: true });

    if (error) throw error;

    const formattedProducts = data.map(product => ({
      id: product.id,
      name: product.name,
      category: product.category,
      description: product.description,
      price: parseFloat(product.price),
      inventory: product.inventory
    }));

    res.json(formattedProducts);
  } catch (error) {
    next(error);
  }
});

export default router;
