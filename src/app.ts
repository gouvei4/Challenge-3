import express, { Application } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './routes/routes';

const PORT: number = 3333;

const app: Application = express();

dotenv.config();

app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  }),
);
app.use(routes);

app.listen(PORT, async () => {
  console.log(`Server Fire on http://localhost:${PORT}`);

  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log('Connected to Database');
  } catch (error) {
    console.log('Erro to connect Database!');
  }
});
