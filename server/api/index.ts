import express from 'express';
import type { Express, Request, Response } from 'express';

const app: Express = express();
const port = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello from Express + TypeScript Server!');
});

app.listen(port, () => {
  console.log(`\x1b[32m[server]: Server is running at http://localhost:${port}\x1b[0m`);
});