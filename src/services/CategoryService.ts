// src/services/CategoryService.ts
import { ICategoryService } from "../Interfaces/ICategoryService.js";
import { ICategoryRepository } from "../Interfaces/ICategoryRepository.js";
import { CategoryDto, CategoryResponseDto } from "../DTO/CategoryDto.js";
import { inject, injectable } from "tsyringe";

@injectable()
export class CategoryService implements ICategoryService {
  private readonly _categoryRepository: ICategoryRepository;

  constructor(
    @inject("ICategoryRepository") categoryRepository: ICategoryRepository
  ) {
    this._categoryRepository = categoryRepository;
  }

  async createCategory(category: CategoryDto): Promise<CategoryResponseDto> {
    const categoryDto = await this._categoryRepository.create(category);
    console.log("sai do create");
    return categoryDto;
  }

  async getAllCategories(): Promise<CategoryResponseDto[]> {
    return this._categoryRepository.findAll();
  }

  async getCategoryById(id: string): Promise<CategoryResponseDto | null> {
    return this._categoryRepository.findById(id);
  }
}
