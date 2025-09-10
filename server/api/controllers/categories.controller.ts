import { Request, Response } from 'express';
import prisma from '../config/prisma';

export const getAllCategories = async (req: Request, res: Response) => {
  try {
    const categories = await prisma.category.findMany();
    return res.status(200).json(categories);
  } catch (error) {
  return res.status(500).json({ error: 'Internal server error' });
  }
};

export const getCategoryById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const category = await prisma.category.findUnique({ where: { id: Number(id) } });
    if (!category) return res.status(404).json({ error: 'Category not found' });
    return res.status(200).json(category);
  } catch (error) {
  return res.status(500).json({ error: 'Internal server error' });
  }
};

export const createCategory = async (req: Request, res: Response) => {
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
  return res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ error: 'Request body is required.' });
  }
  const { id } = req.params;
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
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.category.delete({ where: { id: Number(id) } });
    return res.status(204).send();
  } catch (error) {
  return res.status(500).json({ error: 'Internal server error' });
  }
};
