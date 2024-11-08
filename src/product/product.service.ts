import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from './model/product.model';
import { Op } from 'sequelize';

@Injectable()
export class ProductService {
  constructor(@InjectModel(Product) private ProductModel: typeof Product) {}

  async create(createProductDto: CreateProductDto) {
    return this.ProductModel.create(createProductDto);
  }

  async findAll() {
    return this.ProductModel.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    const product = await this.ProductModel.findByPk(id, {
      include: { all: true },
    });
    if (!product) {
      throw new NotFoundException(`ID ${id} bo‘yicha mahsulot topilmadi`);
    }
    return product;
  }

  async findByColor(color: string) {
    const products = await this.ProductModel.findAll({
      where: { color },
      include: { all: true },
    });

    if (!products.length) {
      throw new NotFoundException(`Rangi ${color} bo‘lgan mahsulot topilmadi`);
    }

    return products;
  }

  async findByPrice(minPrice: number, maxPrice: number) {
    const products = await this.ProductModel.findAll({
      where: {
        price: {
          [Op.gte]: minPrice,
          [Op.lte]: maxPrice,
        },
      },
      include: { all: true },
    });

    if (!products.length) {
      throw new NotFoundException(`Narh oralig'ida mahsulot topilmadi`);
    }

    return products;
  }
  async findBySize(minWidth: number, minHeight: number) {
    const products = await this.ProductModel.findAll({
      where: {
        width: { [Op.gte]: minWidth },
        height: { [Op.gte]: minHeight },
      },
      include: { all: true },
    });

    if (!products.length) {
      throw new NotFoundException(`Razmerga mos mahsulot topilmadi`);
    }

    return products;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const [updatedCount] = await this.ProductModel.update(updateProductDto, {
      where: { id },
    });
    if (updatedCount === 0) {
      throw new NotFoundException(
        `ID ${id} bo‘yicha yangilash uchun mahsulot topilmadi`,
      );
    }
    return { message: `ID ${id} bo‘yicha mahsulot yangilandi` };
  }

  async remove(id: number) {
    const deletedCount = await this.ProductModel.destroy({ where: { id } });
    if (deletedCount === 0) {
      throw new NotFoundException(
        `ID ${id} bo‘yicha o‘chirish uchun mahsulot topilmadi`,
      );
    }
    return {
      message: 'Mahsulot muvaffaqiyatli o‘chirildi',
      id,
    };
  }
}
