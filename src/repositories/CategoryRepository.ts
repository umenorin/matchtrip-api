import { ICategoryRepository } from "../Interfaces/ICategoryRepository.js";
import CategoryDto from "../DTO/CategoryDto.js";
import { Category } from "../models/Categorie.js";
import { injectable } from "tsyringe";
import { CustomError } from "../errors/CustomError.js";
import TravelDtoResponse from "../DTO/TravelDtoResponse.js";
import UserDtoResponse from "../DTO/UserDtoResponse.js";
import { User } from "../models/User.js";
import { UserCategory } from "../models/UserCategory.js";
import { TravelCategory } from "../models/TravelCategory.js";
import { GroupTravalers } from "../models/GroupTravalers.js";
import { Travel } from "../models/Travel.js";

@injectable()
export class CategoryRepository implements ICategoryRepository {
  async sendCategoryForUser(
    categoryId: string,
    userId: string,
  ): Promise<UserDtoResponse | null> {
    try {
      const relationExists = await UserCategory.exists({
        userId: userId,
        categoryId: categoryId,
      });
      if (!!relationExists) {
        throw new CustomError("You already have this category", 400);
      }
      const categoriesDto: CategoryDto[] = [];
      await UserCategory.create({
        userId: userId,
        categoryId: categoryId,
      });
      const user: any = await User.findById(userId);
      const categoriesId = await UserCategory.find({ userId: userId })
        .populate("categoryId")
        .exec();

      categoriesId.forEach((category: any) => {
        console.log(category.categoryId);
        categoriesDto.push(
          new CategoryDto({
            id: category.categoryId._id,
            name: category.categoryId.name,
          }),
        );
      });

      return new UserDtoResponse({
        id: user._id.toString(),
        name: user.name as string,
        email: user.email,
        numberPhone: user.numberPhone,
        uniqueIdentification: user.uniqueIdentification,
        age: user.age,
        nationality: user.nationality,
        gender: user.gender,
        profileImage: user.profileImage || null,
        categories: categoriesDto,
      });
    } catch (error: any) {
      throw new CustomError(error.message, 400);
    }
  }

  async sendCategoryForTravel(
    categoryId: string,
    travelId: string,
  ): Promise<TravelDtoResponse | null> {
    try {
      const relationExists = await TravelCategory.exists({
       travelId: travelId,
        categoryId: categoryId,
      });
      if (!!relationExists) {
        throw new CustomError("You already have this category", 400);
      }
      const categoriesDto: CategoryDto[] = [];
      await TravelCategory.create({
        travelId: travelId,
        categoryId: categoryId,
      });
      const travel: any = await Travel.findById(travelId);
      const categoriesId = await TravelCategory.find({ travelId: travelId })
        .populate("categoryId")
        .exec();
      console.log(categoriesId);
      const travelers: any = await GroupTravalers.find({
        travel: travel._id.toString(),
      }).populate({
        path: "traveler",
        select: "-password", // Isso exclui o campo 'password' do resultado
      });
      categoriesId.forEach((category: any): any => {
        console.log(category.categoryId);
        categoriesDto.push(
          new CategoryDto({
            id: category.categoryId._id,
            name: category.categoryId.name,
          }),
        );
      });

      return new TravelDtoResponse({
        id: travel._id.toString(),
        owner: travel.owner,
        name: travel.name,
        description: travel.description,
        country: travel.country,
        city: travel.city,
        latitude: travel.latitude,
        longitude: travel.longitude,
        startDate: travel.startDate,
        endDate: travel.endDate,
        limitTravelers: travel.limitTravelers,
        imageTravel: travel.imageTravel,
        rating: {
          id: travel.rating._id,
          averageScore: travel.rating.averageRating, // Assuming this exists
          userRatings:
            travel.rating.ratings?.map((r: any) => ({
              userId: r.userId.toString(), // Changed from travelerOfUser to userId for consistency
              score: r.score,
            })) || [],
        },
        chat: {
          id: travel.chat._id,
          messageCount: travel.chat.messages?.length || 0, // Assuming messages array exists
        },
        createdAt: travel.createdAt,
        updatedAt: travel.updatedAt,
        travalers: travelers,
        categories: categoriesDto,
      });
    } catch (error: any) {
      throw new CustomError(error.message, 400);
    }
  }

  async create(category: CategoryDto): Promise<CategoryDto> {
    try {
      const newCategory: any = await Category.create({ name: category.name });
      if (!newCategory) {
        throw new CustomError("Category can't be create", 400);
      }
      return new CategoryDto({
        id: newCategory.id.toString(),
        name: newCategory.name,
      });
    } catch (error: any) {
      throw new CustomError(error, 400);
    }
  }

  async findAll(): Promise<CategoryDto[]> {
    const categories = await Category.find();
    return categories.map(
      (cat) => new CategoryDto({ id: cat.id.toString(), name: cat.name }),
    );
  }

  async findById(id: string): Promise<CategoryDto | null> {
    const category = await Category.findById(id);
    return category
      ? new CategoryDto({ id: category.id.toString(), name: category.name })
      : null;
  }

  async update(
    id: string,
    category: Partial<CategoryDto>,
  ): Promise<CategoryDto | null> {
    const updated = await Category.findByIdAndUpdate(id, category, {
      new: true,
    });
    return updated
      ? new CategoryDto({ id: updated.id.toString(), name: updated.name })
      : null;
  }

  async delete(id: string): Promise<void> {
    await Category.findByIdAndDelete(id);
  }
}
