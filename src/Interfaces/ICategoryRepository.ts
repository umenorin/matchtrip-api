import { CategoryDto, CategoryResponseDto } from "../DTO/CategoryDto.js";

export interface ICategoryRepository {
  create(categorie: CategoryDto): Promise<CategoryResponseDto>;
  findAll(): Promise<CategoryResponseDto[]>;
  findById(id: string): Promise<CategoryResponseDto | null>;
  update(id: string, categorie: Partial<CategoryDto>): Promise<CategoryResponseDto | null>;
  delete(id: string): Promise<void>;
}
