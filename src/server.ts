import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  return res.json({ message: 'hello world' });
});

app.use((req: Request, res: Response) => {
  return res.status(404).json({ error: 'endpoint not found' });
});

app.listen(process.env.PORT, () => {
  console.log('server is running on port 3333');
});
