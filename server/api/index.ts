import express from 'express';
import type { Express, Request, Response } from 'express';
import authRoutes from '../api/routes/auth.routes';
import cookieParser from 'cookie-parser';
const app: Express = express();
const port = process.env.PORT || 3000;
app.use(express.json())
app.use(cookieParser())
app.use("/api/auth",authRoutes)
app.get('/', (req: Request, res: Response) => {
  res.send('Hello from Express + TypeScript Server!');
});

app.listen(port, () => {
  console.log(`\x1b[32m[server]: Server is running at http://localhost:${port}\x1b[0m`);
});