import { CategoryDto, CategoryResponseDto } from "../DTO/CategoryDto.js";
import TravelDtoResponse from "../DTO/TravelDtoResponse.js";
import UserDtoResponse from "../DTO/UserDtoResponse.js";

export interface ICategoryRepository {
  create(categorie: CategoryDto): Promise<CategoryResponseDto>;
  findAll(): Promise<CategoryResponseDto[]>;
  findById(id: string): Promise<CategoryResponseDto | null>;
  update(
    id: string,
    categorie: Partial<CategoryDto>,
  ): Promise<CategoryResponseDto | null>;
  sendCategoryForUser(
    categoryId: string,
    userId: string,
  ): Promise<UserDtoResponse | null>;
  sendCategoryForTravel(
    categoryId: string,
    travelId: string,
  ): Promise<TravelDtoResponse | null>;
  delete(id: string): Promise<void>;
}
