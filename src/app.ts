import express, { Application } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import swagger from '../swagger.json';
import swaggerUi from 'swagger-ui-express';
import dotenv from 'dotenv';
import routes from './routes/routes';

const PORT: number = 3333;

export const app: Application = express();

dotenv.config();

app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  }),
);
app.use(routes);
app.use('/api/v1/api-docs', swaggerUi.serve, swaggerUi.setup(swagger));

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
  });
  try {
     mongoose.connect(process.env.MONGO_URI as string);
    console.log('Connected to Database');
  } catch (error) {
    console.log('Erro to connect Database!');
  }
}

