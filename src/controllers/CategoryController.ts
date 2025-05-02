// src/controllers/CategoryController.ts
import { Request, Response } from "express";
import { categoryService } from "../DI-container.js";
import { CategoryDto } from "../DTO/CategoryDto.js";

export class CategoryController {
  async createCategory(req: Request, res: Response) {
    try {
      const category = new CategoryDto(req.body);
      const result = await categoryService.createCategory(category);
      res.status(201).json(result);
    } catch (error) {
      res.status(400).json({ error: "Internal Error" });
    }
  }

  async getAllCategories(req: Request, res: Response) {
    try {
      const categories = await categoryService.getAllCategories();
      res.status(200).json(categories);
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar categorias" });
    }
  }

  async getCategoryById(req: Request, res: Response) {
    try {
      const category = await categoryService.getCategoryById(req.params.id);
      if (!category) {
        return res.status(404).json({ error: "Categoria não encontrada" });
      }
      res.status(200).json(category);
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar categoria" });
    }
  }
}

// Exporte uma instância do controller
export const categoryController = new CategoryController();
