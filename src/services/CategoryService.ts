// src/services/CategoryService.ts
import { ICategoryService } from "../Interfaces/ICategoryService.js";
import { ICategoryRepository } from "../Interfaces/ICategoryRepository.js";
import { CategoryDto, CategoryResponseDto } from "../DTO/CategoryDto.js";

export class CategoryService implements ICategoryService {
  private repository: ICategoryRepository;

  constructor(repository: ICategoryRepository) {
    this.repository = repository;
  }

  async createCategory(category: CategoryDto): Promise<CategoryResponseDto> {
    return this.repository.create(category);
  }

  async getAllCategories(): Promise<CategoryResponseDto[]> {
    return this.repository.findAll();
  }

  async getCategoryById(id: string): Promise<CategoryResponseDto | null> {
    return this.repository.findById(id);
  }

}
