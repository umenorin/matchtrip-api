// src/controllers/CategoryController.ts
import { Request, Response } from "express";
import { CategoryDto } from "../DTO/CategoryDto.js";
import { ICategoryService } from "../Interfaces/ICategoryService.js";
import { inject, injectable } from "tsyringe";
import { CustomError } from "../errors/CustomError.js";

@injectable()
export default class CategoryController {
  private readonly _categoryService: ICategoryService;
  public constructor(
    @inject("ICategoryService")
    categoryService: ICategoryService
  ) {
    this._categoryService = categoryService;
  }

  async createCategory(req: Request, res: Response) {
    try {
      const { category } = req.body;
      const categoryDto = new CategoryDto({ name: category.name });
      const result = await this._categoryService.createCategory(categoryDto);
      res.status(201).json({
        message: "Category created with success",
        token: result,
      });
    } catch (error) {
      if (error instanceof CustomError) {
        console.error("Message create failed:", error.message);
        res.status(error.statusHttp).json({ error: error.message });
        return;
      }
    }
  }

  async getAllCategories(req: Request, res: Response) {
    try {
      const categories = await this._categoryService.getAllCategories();
      res.status(200).json(categories);
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar categorias" });
    }
  }

  async getCategoryById(req: Request, res: Response): Promise<void> {
    try {
      const category = await this._categoryService.getCategoryById(
        req.params.id
      );
      if (!category) {
        res.status(404).json({ error: "Categoria não encontrada" });
        return;
      }
      res.status(200).json({
        message: "Category retrieved successfully",
        data: category, // Mudei de 'token' para 'data' pois parece mais semântico
      });
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar categoria" });
    }
  }
}
