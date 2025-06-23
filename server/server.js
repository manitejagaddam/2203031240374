import express from 'express';
import cors from 'cors';
import { nanoid } from 'nanoid';
import logger from './middleware/logger.js';
import urlRoutes from './routes/urlRoutes.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use(logger);
app.use('/', urlRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
