import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderItemDto } from './dto/create-order_item.dto';
import { UpdateOrderItemDto } from './dto/update-order_item.dto';
import { InjectModel } from '@nestjs/sequelize';
import { OrderItem } from './model/order_item.model';

@Injectable()
export class OrderItemsService {
  constructor(
    @InjectModel(OrderItem) private orderItemModel: typeof OrderItem,
  ) {}

  async create(createOrderItemDto: CreateOrderItemDto) {
    return this.orderItemModel.create(createOrderItemDto);
  }

  async findAll() {
    return this.orderItemModel.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    const orderItem = await this.orderItemModel.findByPk(id,{
      include: { all: true },
    });
    if (!orderItem) {
      throw new NotFoundException(
        `ID ${id} bo‘yicha buyurtma malumoti topilmadi`,
      );
    }
    return orderItem;
  }

  async update(id: number, updateOrderItemDto: UpdateOrderItemDto) {
    const [updatedCount] = await this.orderItemModel.update(
      updateOrderItemDto,
      {
        where: { id },
      },
    );
    if (updatedCount === 0) {
      throw new NotFoundException(
        `ID ${id} bo‘yicha yangilash uchun buyurtma malumoti topilmadi`,
      );
    }
    return { message: `ID ${id} bo‘yicha buyurtma malumoti yangilandi` };
  }

  async delete(id: number) {
    const deletedCount = await this.orderItemModel.destroy({ where: { id } });
    if (deletedCount === 0) {
      throw new NotFoundException(
        `ID ${id} bo‘yicha o‘chirish uchun buyurtma malumoti topilmadi`,
      );
    }
    return {
      message: "Buyurtma ma'lumoti muvaffaqiyatli o‘chirildi",
      id,
    };
  }
}
