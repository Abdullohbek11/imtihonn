import {
  Column,
  DataType,
  Model,
  Table,
  CreatedAt,
  UpdatedAt,
  HasMany,
} from 'sequelize-typescript';
import { Contract } from 'src/contract/model/contract.model';

interface CouponCreationAttrs {
  code: string;
  discount_amount: number;
  expiry_date: Date;
  status: string;
}

@Table({ tableName: 'coupons' })
export class Coupon extends Model<Coupon, CouponCreationAttrs> {
  @Column({
    type: DataType.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  code: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  discount_amount: number;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  expiry_date: Date;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  status: string;

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;

  @HasMany(() => Contract)
  contracts: Contract[];
}
