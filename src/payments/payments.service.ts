import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Payment } from './model/payment.model';

@Injectable()
export class PaymentsService {
  constructor(@InjectModel(Payment) private PaymentModel: typeof Payment) {}

  async create(createPaymentDto: CreatePaymentDto) {
    return this.PaymentModel.create(createPaymentDto);
  }

  async findAll() {
    return this.PaymentModel.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    const payment = await this.PaymentModel.findByPk(id, {
      include: { all: true },
    });
    if (!payment) {
      throw new NotFoundException(`ID ${id} bo‘yicha to‘lov topilmadi`);
    }
    return payment;
  }

  async update(id: number, updatePaymentDto: UpdatePaymentDto) {
    const [updatedCount] = await this.PaymentModel.update(updatePaymentDto, {
      where: { id },
    });
    if (updatedCount === 0) {
      throw new NotFoundException(
        `ID ${id} bo‘yicha yangilash uchun to‘lov topilmadi`,
      );
    }
    return { message: `ID ${id} bo‘yicha to‘lov yangilandi` };
  }

  async remove(id: number) {
    const deletedCount = await this.PaymentModel.destroy({ where: { id } });
    if (deletedCount === 0) {
      throw new NotFoundException(
        `ID ${id} bo‘yicha o‘chirish uchun to‘lov topilmadi`,
      );
    }
    return {
      message: 'To‘lov muvaffaqiyatli o‘chirildi',
      id,
    };
  }
}
