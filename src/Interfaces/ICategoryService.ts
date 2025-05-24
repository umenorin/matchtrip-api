// src/interfaces/ICategoryService.ts
import  CategoryDto from "../DTO/CategoryDto.js";
import TravelDtoResponse from "../DTO/TravelDtoResponse.js";
import UserDtoResponse from "../DTO/UserDtoResponse.js";

export interface ICategoryService {
  createCategory(category: CategoryDto): Promise<CategoryDto>;
  getAllCategories(): Promise<CategoryDto[]>;
  getCategoryById(id: string): Promise<CategoryDto | null>;

  sendCategoryForUser(
    categoryId: string,
    userId: string,
  ): Promise<UserDtoResponse | null>;
  sendCategoryForTravel(categoryId: string, travelId: string): Promise<TravelDtoResponse | null>;
}
