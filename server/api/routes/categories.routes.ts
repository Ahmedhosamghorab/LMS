import { Router } from 'express';
import {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} from '../controllers/categories.controller';
import { adminMiddleware } from '../middlewares/admin.middleware';

const router = Router();

router.get('/', getAllCategories);
router.get('/:id', getCategoryById);
router.post('/', adminMiddleware ,createCategory);
router.put('/:id',adminMiddleware, updateCategory);
router.delete('/:id',adminMiddleware, deleteCategory);

export default router;
