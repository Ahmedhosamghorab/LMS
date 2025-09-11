
import { Request, Response } from 'express';
import prisma from '../config/prisma';

type CategoryParams = { id: string };
type CategoryBody = { name: string };

export const getAllCategories = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const categories = await prisma.category.findMany();
    return res.status(200).json(categories);
  } catch (error) {
    console.error('getAllCategories error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const getCategoryById = async (
  req: Request<CategoryParams>,
  res: Response
): Promise<Response> => {
  const { id } = req.params;
  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ error: 'Invalid category ID' });
  }
  try {
    const category = await prisma.category.findUnique({ where: { id: Number(id) } });
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }
    return res.status(200).json(category);
  } catch (error) {
    console.error('getCategoryById error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const createCategory = async (
  req: Request<{}, {}, CategoryBody>,
  res: Response
): Promise<Response> => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ error: 'Request body is required.' });
  }
  const { name } = req.body;
  if (!name || typeof name !== 'string' || name.trim() === '') {
    return res.status(400).json({ error: 'Category name is required and must be a non-empty string.' });
  }
  try {
    const newCategory = await prisma.category.create({ data: { name: name.trim() } });
    return res.status(201).json(newCategory);
  } catch (error) {
    console.error('createCategory error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateCategory = async (
  req: Request<CategoryParams, {}, CategoryBody>,
  res: Response
): Promise<Response> => {
  const { id } = req.params;
  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ error: 'Invalid category ID' });
  }
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ error: 'Request body is required.' });
  }
  const { name } = req.body;
  if (!name || typeof name !== 'string' || name.trim() === '') {
    return res.status(400).json({ error: 'Category name is required and must be a non-empty string.' });
  }
  try {
    const updatedCategory = await prisma.category.update({
      where: { id: Number(id) },
      data: { name: name.trim() },
    });
    return res.status(200).json(updatedCategory);
  } catch (error) {
    console.error('updateCategory error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteCategory = async (
  req: Request<CategoryParams>,
  res: Response
): Promise<Response> => {
  const { id } = req.params;
  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ error: 'Invalid category ID' });
  }
  try {
    await prisma.category.delete({ where: { id: Number(id) } });
    return res.status(204).send();
  } catch (error) {
    console.error('deleteCategory error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
