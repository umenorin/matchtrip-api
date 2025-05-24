// src/services/CategoryService.ts
import { ICategoryService } from "../Interfaces/ICategoryService.js";
import { ICategoryRepository } from "../Interfaces/ICategoryRepository.js";
import  CategoryDto from "../DTO/CategoryDto.js";
import { inject, injectable } from "tsyringe";
import TravelDtoResponse from "../DTO/TravelDtoResponse.js";
import UserDtoResponse from "../DTO/UserDtoResponse.js";

@injectable()
export class CategoryService implements ICategoryService {
  private readonly _categoryRepository: ICategoryRepository;

  constructor(
    @inject("ICategoryRepository") categoryRepository: ICategoryRepository,
  ) {
    this._categoryRepository = categoryRepository;
  }
  async sendCategoryForUser(
    categoryId: string,
    userId: string,
  ): Promise<UserDtoResponse | null> {
    const userDto = await this._categoryRepository.sendCategoryForUser(
      categoryId,
      userId,
    );
    return userDto;
  }
  async sendCategoryForTravel(
    categoryId: string,
    travelId: string,
  ): Promise<TravelDtoResponse | null> {
    const travelDto = await this._categoryRepository.sendCategoryForTravel(
      categoryId,
      travelId,
    );
    return travelDto;
  }

  async createCategory(category: CategoryDto): Promise<CategoryDto> {
    const categoryDto = await this._categoryRepository.create(category);
    return categoryDto;
  }

  async getAllCategories(): Promise<CategoryDto[]> {
    return this._categoryRepository.findAll();
  }

  async getCategoryById(id: string): Promise<CategoryDto | null> {
    return this._categoryRepository.findById(id);
  }
}
