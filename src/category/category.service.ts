import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Category } from './model/category.model';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(@InjectModel(Category) private categoryModel: typeof Category) {}

  async create(createCategoryDto: CreateCategoryDto) {
    return this.categoryModel.create(createCategoryDto);
  }

  async findAll() {
    return this.categoryModel.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    const category = await this.categoryModel.findByPk(id, {
      include: { all: true },
    });
    if (!category) {
      throw new NotFoundException(`ID ${id} bo‘yicha kategoriya topilmadi`);
    }
    return category;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const [updatedCount] = await this.categoryModel.update(updateCategoryDto, {
      where: { id },
    });
    if (updatedCount === 0) {
      throw new NotFoundException(
        `ID ${id} bo‘yicha yangilash uchun kategoriya topilmadi`,
      );
    }
    return { message: `ID ${id} bo‘yicha kategoriya yangilandi` };
  }

  async remove(id: number) {
    const deletedCount = await this.categoryModel.destroy({ where: { id } });
    if (deletedCount === 0) {
      throw new NotFoundException(
        `ID ${id} bo‘yicha o‘chirish uchun kategoriya topilmadi`,
      );
    }
    return {
      message: 'Kategoriya muvaffaqiyatli o‘chirildi',
      id,
    };
  }
}
