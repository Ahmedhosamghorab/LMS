import { Request, Response, NextFunction } from 'express';
import prisma from '../config/prisma';

export const adminMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Assuming user id is attached to req.user or req.userId by previous auth middleware
    const userId = (req as any).user?.id || (req as any).userId;
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    const user = await prisma.user.findUnique({ where: { id: Number(userId) } });
    if (!user || user.type !== 'Teacher') {
      return res.status(403).json({ error: 'Forbidden: Teachers only are allowed.' });
    }
    next();
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};
