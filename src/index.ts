import express from 'express';
import type { Express, Request, Response } from 'express';

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello from Express -12 !');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});