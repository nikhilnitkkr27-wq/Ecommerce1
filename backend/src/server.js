import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { logger } from './middleware/logger.js';
import { apiKeyAuth } from './middleware/apiKeyAuth.js';
import { errorHandler } from './middleware/errorHandler.js';
import menuRoutes from './routes/menuRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use(logger);

app.use('/api/menu', apiKeyAuth, menuRoutes);
app.use('/api/order', apiKeyAuth, orderRoutes);
app.use('/api/orders', apiKeyAuth, orderRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
