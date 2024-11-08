import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductImageDto } from './dto/create-product_image.dto';
import { UpdateProductImageDto } from './dto/update-product_image.dto';
import { InjectModel } from '@nestjs/sequelize';
import { ProductImage } from './model/product_image.model';

@Injectable()
export class ProductImagesService {
  constructor(
    @InjectModel(ProductImage) private ProductImageModel: typeof ProductImage,
  ) {}

  async create(createProductImageDto: CreateProductImageDto) {
    return this.ProductImageModel.create(createProductImageDto);
  }

  async findAll() {
    return this.ProductImageModel.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    const productImage = await this.ProductImageModel.findByPk(id, {
      include: { all: true },
    });
    if (!productImage) {
      throw new NotFoundException(`ID ${id} bo‘yicha mahsulot rasm topilmadi`);
    }
    return productImage;
  }

  async update(id: number, updateProductImageDto: UpdateProductImageDto) {
    const [updatedCount] = await this.ProductImageModel.update(
      updateProductImageDto,
      {
        where: { id },
      },
    );
    if (updatedCount === 0) {
      throw new NotFoundException(
        `ID ${id} bo‘yicha yangilash uchun mahsulot rasm topilmadi`,
      );
    }
    return { message: `ID ${id} bo‘yicha mahsulot rasm yangilandi` };
  }

  async remove(id: number) {
    const deletedCount = await this.ProductImageModel.destroy({
      where: { id },
    });
    if (deletedCount === 0) {
      throw new NotFoundException(
        `ID ${id} bo‘yicha o‘chirish uchun mahsulot rasm topilmadi`,
      );
    }
    return {
      message: "Mahsulot rasmi muvaffaqiyatli o'chirildi",
      id: id,
    };
  }
}
