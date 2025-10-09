import { Request, Response } from 'express';
import prisma from '../config/prisma';
import { Course, Prisma } from '@prisma/client';

// Types for params and body
interface CourseParams {
  id?: string ;
}
interface CourseBody {
  title: string;
  desc: string;
  price: number;
  duration: number;
  teacher_id: number;
  category_id: number;
}

export const getAllCourses = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    // Filtering
  const { category_id, min_price, max_price, limit = 10 } = req.query;
    const where: any = {};
    if (category_id && !isNaN(Number(category_id))) {
      where.category_id = Number(category_id);
    }
    if (!isNaN(Number(min_price)) || !isNaN(Number(max_price))) {
      where.price = {};
      if (!isNaN(Number(min_price))) {
        where.price.gte = Number(min_price);
      }
      if (!isNaN(Number(max_price))) {
        where.price.lte = Number(max_price);
      }
    }
    const take = Math.max(1, Math.min(Number(limit), 100));
    const courses = await prisma.course.findMany({
      where,
      take,
    });
    return res.status(200).json(courses);
  } catch (error) {
    console.error('getAllCourses error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const getCourseById = async (
  req: Request<CourseParams>,
  res: Response
): Promise<Response> => {
  const { id } = req.params;
  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ error: 'Invalid course ID' });
  }
  try {
    const course = await prisma.course.findUnique({ where: { id: Number(id) } });
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }
    return res.status(200).json(course);
  } catch (error) {
    console.error('getCourseById error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const createCourse = async (
  req: Request<{}, {}, CourseBody>,
  res: Response
): Promise<Response> => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ error: 'Request body is required.' });
  }
  const { title, desc, price, duration, teacher_id, category_id } = req.body;
  if (
    !title || typeof title !== 'string' || title.trim() === '' ||
    !desc || typeof desc !== 'string' || desc.trim() === '' ||
    typeof price !== 'number' || isNaN(price) ||
    typeof duration !== 'number' || isNaN(duration) ||
    typeof teacher_id !== 'number' || isNaN(teacher_id) ||
    typeof category_id !== 'number' || isNaN(category_id)
  ) {
    return res.status(400).json({ error: 'All fields are required and must be valid.' });
  }
  try {
    const newCourse = await prisma.course.create({
      data: {
        title: title.trim(),
        desc: desc.trim(),
        price,
        duration,
        teacher_id,
        category_id,
      },
    });
    return res.status(201).json(newCourse);
  } catch (error) {
    console.error('createCourse error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateCourse = async (
  req: Request<CourseParams, {}, CourseBody >,
  res: Response
): Promise<Response> => {
  const { id } = req.params;
  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ error: 'Invalid course ID' });
  }
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ error: 'Request body is required.' });
  }
  const { title, desc, price, duration, teacher_id, category_id } = req.body;
  if (
    !title || typeof title !== 'string' || title.trim() === '' ||
    !desc || typeof desc !== 'string' || desc.trim() === '' ||
    typeof price !== 'number' || isNaN(price) ||
    typeof duration !== 'number' || isNaN(duration) ||
    typeof teacher_id !== 'number' || isNaN(teacher_id) ||
    typeof category_id !== 'number' || isNaN(category_id)
  ) {
    return res.status(400).json({ error: 'All fields are required and must be valid.' });
  }
  try {
    const updatedCourse = await prisma.course.update({
      where: { id: Number(id) },
      data: {
        title: title.trim(),
        desc: desc.trim(),
        price,
        duration,
        teacher_id,
        category_id,
      },
    });
    return res.status(200).json(updatedCourse);
  } catch (error) {
    console.error('updateCourse error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteCourse = async (
  req: Request<CourseParams>,
  res: Response
): Promise<Response> => {
  const { id } = req.params;
  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ error: 'Invalid course ID' });
  }
  try {
    await prisma.course.delete({ where: { id: Number(id) } });
    return res.status(204).send();
  } catch (error) {
    console.error('deleteCourse error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
