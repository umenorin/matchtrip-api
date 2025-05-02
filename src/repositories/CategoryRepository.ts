import { ICategoryRepository } from "../Interfaces/ICategoryRepository.js";
import { CategoryDto, CategoryResponseDto } from "../DTO/CategoryDto.js";
import { Category } from "../models/Categorie.js";
import { injectable } from "tsyringe";

@injectable()
export class CategoryRepository implements ICategoryRepository {
  async create(category: CategoryDto): Promise<CategoryResponseDto> {
    const newCategory = await Category.create(category);
    return new CategoryResponseDto(
      newCategory.id.toString(),
      newCategory.name,
    );
  }

  async findAll(): Promise<CategoryResponseDto[]> {
    const categories = await Category.find();
    return categories.map(cat => 
      new CategoryResponseDto(cat.id.toString(), cat.name)
    );
  }

  async findById(id: string): Promise<CategoryResponseDto | null> {
    const category = await Category.findById(id);
    return category 
      ? new CategoryResponseDto(category.id.toString(), category.name)
      : null;
  }

  async update(id: string, category: Partial<CategoryDto>): Promise<CategoryResponseDto | null> {
    const updated = await Category.findByIdAndUpdate(
      id,
      category,
      { new: true }
    );
    return updated 
      ? new CategoryResponseDto(updated.id.toString(), updated.name)
      : null;
  }

  async delete(id: string): Promise<void> {
    await Category.findByIdAndDelete(id);
  }
}
