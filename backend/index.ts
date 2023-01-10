import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();
mongoose.connect(process.env.DATABASE_URL!)


const app: Express = express();
const port = process.env.PORT;

app.use(express.json())

const nazwaRouter = require('./routes/nazwa')

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});