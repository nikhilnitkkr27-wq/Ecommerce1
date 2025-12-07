# Pizza Ordering Backend

Express.js backend API for pizza ordering with Supabase PostgreSQL database.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file from `.env.example`:
```bash
cp .env.example .env
```

3. Update `.env` with your values:
- `PORT` - Server port (default: 4000)
- `API_KEY` - Your custom API key for authentication
- `SUPABASE_URL` - Your Supabase project URL
- `SUPABASE_SERVICE_ROLE_KEY` - Your Supabase service role key

4. Seed initial products:
```bash
npm run seed
```

5. Start the server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

## API Endpoints

All endpoints require `x-api-key` header with your API key.

### GET /api/menu
Returns all products.

### POST /api/order
Place a new order with inventory validation.

Request body:
```json
{
  "items": [
    { "productId": "uuid", "quantity": 2 }
  ],
  "customer": {
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

Response:
```json
{
  "status": "success",
  "orderId": "ORD-ABC123"
}
```

### GET /api/orders?email=customer@email.com
Get order history for a customer email.

## Features

- API key authentication
- Automatic inventory management
- Order validation
- Error handling
- Request logging
