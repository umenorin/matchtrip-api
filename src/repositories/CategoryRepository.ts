import { ICategoryRepository } from "../Interfaces/ICategoryRepository.js";
import { CategoryDto, CategoryResponseDto } from "../DTO/CategoryDto.js";
import { Category } from "../models/Categorie.js";
import { injectable } from "tsyringe";
import { CustomError } from "../errors/CustomError.js";

@injectable()
export class CategoryRepository implements ICategoryRepository {
  async create(category: CategoryDto): Promise<CategoryResponseDto> {
    try {
      const newCategory = await Category.create({ name: category.name });
      if (!newCategory) {
        throw new CustomError("Category can't be create", 400);
      }
      return new CategoryResponseDto(
        newCategory.id.toString(),
        newCategory.name
      );
    } catch (error: any) {
      throw new CustomError(error, 400);
    }
  }

  async findAll(): Promise<CategoryResponseDto[]> {
    const categories = await Category.find();
    return categories.map(
      (cat) => new CategoryResponseDto(cat.id.toString(), cat.name)
    );
  }

  async findById(id: string): Promise<CategoryResponseDto | null> {
    const category = await Category.findById(id);
    return category
      ? new CategoryResponseDto(category.id.toString(), category.name)
      : null;
  }

  async update(
    id: string,
    category: Partial<CategoryDto>
  ): Promise<CategoryResponseDto | null> {
    const updated = await Category.findByIdAndUpdate(id, category, {
      new: true,
    });
    return updated
      ? new CategoryResponseDto(updated.id.toString(), updated.name)
      : null;
  }

  async delete(id: string): Promise<void> {
    await Category.findByIdAndDelete(id);
  }
}
