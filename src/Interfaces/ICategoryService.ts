// src/interfaces/ICategoryService.ts
import { CategoryDto, CategoryResponseDto } from "../DTO/CategoryDto.js";

export interface ICategoryService {
  createCategory(category: CategoryDto): Promise<CategoryResponseDto>;
  getAllCategories(): Promise<CategoryResponseDto[]>;
  getCategoryById(id: string): Promise<CategoryResponseDto | null>;
}
