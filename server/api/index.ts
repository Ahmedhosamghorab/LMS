import express from 'express';
import type { Express, Request, Response } from 'express';
import authRoutes from '../api/routes/auth.routes';
import categoriesRoutes from '../api/routes/categories.routes';
import coursesRoutes from '../api/routes/courses.routes';
import cookieParser from 'cookie-parser';
import { authenticated } from './middlewares/auth.middleware';
const app: Express = express();
const port = process.env.PORT || 3000;
app.use(express.json())
app.use(cookieParser())
app.use("/api/auth", authRoutes);
app.use("/api/categories", authenticated, categoriesRoutes);
app.use("/api/courses", authenticated, coursesRoutes);
app.get('/', (req: Request, res: Response) => {
  res.send('Hello from Express(dev branch) + TypeScript Server! ');
});

app.listen(port, () => {
  console.log(`\x1b[32m[server]: Server is running at http://localhost:${port}\x1b[0m`);
});