// src/DTO/CategorieDto.ts
export class CategoryDto {
  name!: string;

  constructor(data: Partial<CategoryDto>) {
    Object.assign(this, data);
  }
}

export class CategoryResponseDto {
  constructor(
    public readonly id: string,
    public readonly name: string
  ) {}
}
