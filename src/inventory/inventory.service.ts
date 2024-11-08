import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Inventory } from './model/inventory.model';

@Injectable()
export class InventoryService {
  constructor(
    @InjectModel(Inventory) private inventorymodel: typeof Inventory,
  ) {}

  async create(createInventoryDto: CreateInventoryDto) {
    return this.inventorymodel.create(createInventoryDto);
  }

  async findAll() {
    return this.inventorymodel.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    const inventory = await this.inventorymodel.findByPk(id, {
      include: { all: true },
    });
    if (!inventory) {
      throw new NotFoundException(
        `ID ${id} bo‘yicha inventarizatsiya topilmadi`,
      );
    }
    return inventory;
  }

  async update(id: number, updateInventoryDto: UpdateInventoryDto) {
    const [updatedCount] = await this.inventorymodel.update(
      updateInventoryDto,
      {
        where: { id },
      },
    );
    if (updatedCount === 0) {
      throw new NotFoundException(
        `ID ${id} bo‘yicha yangilash uchun inventarizatsiya topilmadi`,
      );
    }
    return { message: `ID ${id} bo‘yicha inventarizatsiya yangilandi` };
  }

  async remove(id: number) {
    const deletedCount = await this.inventorymodel.destroy({ where: { id } });
    if (deletedCount === 0) {
      throw new NotFoundException(
        `ID ${id} bo‘yicha o‘chirish uchun inventarizatsiya topilmadi`,
      );
    }
    return {
      message: 'Inventarizatsiya muvaffaqiyatli o‘chirildi',
      id,
    };
  }
}
