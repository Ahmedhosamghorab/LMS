import { Router } from 'express';
import {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
} from '../controllers/courses.controller';
import { adminMiddleware } from '../middlewares/admin.middleware';

const router = Router();

router.get('/', getAllCourses);
router.get('/:id', getCourseById);
router.post('/', adminMiddleware , createCourse);
router.put('/:id', adminMiddleware , updateCourse);
router.delete('/:id', adminMiddleware , deleteCourse);

export default router;
