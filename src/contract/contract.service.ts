import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateContractDto } from './dto/create-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';
import { Contract } from './model/contract.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class ContractService {
  constructor(@InjectModel(Contract) private contractModel: typeof Contract) {}

  async create(createContractDto: CreateContractDto) {
    return this.contractModel.create(createContractDto);
  }

  async findAll() {
    return this.contractModel.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    const contract = await this.contractModel.findByPk(id, {
      include: { all: true },
    });
    if (!contract) {
      throw new NotFoundException(`ID ${id} bo‘yicha kontrakt topilmadi`);
    }
    return contract;
  }

  async update(id: number, updateContractDto: UpdateContractDto) {
    const [updatedCount] = await this.contractModel.update(updateContractDto, {
      where: { id },
    });
    if (updatedCount === 0) {
      throw new NotFoundException(
        `ID ${id} bo‘yicha yangilash uchun kontrakt topilmadi`,
      );
    }
    return { message: `ID ${id} bo‘yicha kontrakt yangilandi` };
  }

  async remove(id: number) {
    const deletedCount = await this.contractModel.destroy({ where: { id } });
    if (deletedCount === 0) {
      throw new NotFoundException(
        `ID ${id} bo‘yicha o‘chirish uchun kontrakt topilmadi`,
      );
    }
    return {
      message: 'Kontrakt muvaffaqiyatli o‘chirildi',
      id,
    };
  }
}
