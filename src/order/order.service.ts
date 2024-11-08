import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Order } from './model/order.model';

@Injectable()
export class OrderService {
  constructor(@InjectModel(Order) private orderModel: typeof Order) {}

  async create(createOrderDto: CreateOrderDto) {
    return this.orderModel.create(createOrderDto);
  }

  async findAll() {
    return this.orderModel.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    const order = await this.orderModel.findByPk(id,{
      include: { all: true }
    });
    if (!order) {
      throw new NotFoundException(`ID ${id} bo‘yicha buyurtma topilmadi`);
    }
    return order;
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    const [updatedCount] = await this.orderModel.update(updateOrderDto, {
      where: { id },
    });
    if (updatedCount === 0) {
      throw new NotFoundException(
        `ID ${id} bo‘yicha yangilash uchun buyurtma topilmadi`,
      );
    }
    return { message: `ID ${id} bo‘yicha buyurtma yangilandi` };
  }

  async remove(id: number) {
    const deletedCount = await this.orderModel.destroy({ where: { id } });
    if (deletedCount === 0) {
      throw new NotFoundException(
        `ID ${id} bo‘yicha o‘chirish uchun buyurtma topilmadi`,
      );
    }
    return {
      message: 'Buyurtma muvaffaqiyatli o‘chirildi',
      id,
    };
  }
}
