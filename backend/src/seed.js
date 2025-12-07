import { supabase } from './config/supabase.js';

const products = [
  {
    name: 'Margherita Pizza',
    category: 'pizza',
    description: 'Classic pizza with tomato sauce, mozzarella, and fresh basil',
    price: 299,
    inventory: 50
  },
  {
    name: 'Pepperoni Pizza',
    category: 'pizza',
    description: 'Loaded with pepperoni and extra cheese',
    price: 399,
    inventory: 50
  },
  {
    name: 'Veggie Supreme Pizza',
    category: 'pizza',
    description: 'Topped with bell peppers, onions, olives, and mushrooms',
    price: 349,
    inventory: 50
  },
  {
    name: 'Coca Cola',
    category: 'drink',
    description: 'Chilled 500ml Coca Cola',
    price: 40,
    inventory: 100
  },
  {
    name: 'Sprite',
    category: 'drink',
    description: 'Refreshing 500ml Sprite',
    price: 40,
    inventory: 100
  },
  {
    name: 'Garlic Bread',
    category: 'bread',
    description: 'Warm garlic bread with herb butter',
    price: 99,
    inventory: 75
  },
  {
    name: 'Cheese Garlic Bread',
    category: 'bread',
    description: 'Garlic bread topped with melted cheese',
    price: 129,
    inventory: 75
  }
];

async function seed() {
  try {
    console.log('Checking existing products...');

    const { data: existing } = await supabase
      .from('products')
      .select('id');

    if (existing && existing.length > 0) {
      console.log('Products already exist. Skipping seed.');
      return;
    }

    console.log('Seeding products...');

    const { data, error } = await supabase
      .from('products')
      .insert(products)
      .select();

    if (error) throw error;

    console.log(`Successfully seeded ${data.length} products`);
  } catch (error) {
    console.error('Error seeding database:', error.message);
    process.exit(1);
  }
}

seed();
