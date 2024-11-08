import {
  Column,
  DataType,
  Model,
  Table,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from 'src/users/model/user.model';
import { Order } from 'src/order/model/order.model';
import { Coupon } from 'src/coupon/model/coupon.model';

interface ContractCreationAttrs {
  user_id: number;
  orderId: number;
  coupon_id: number;
  start_date: Date;
  end_date: Date;
  terms: string;
  status: string;
}

@Table({ tableName: 'contracts' })
export class Contract extends Model<Contract, ContractCreationAttrs> {
  @Column({
    type: DataType.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  user_id: number;

  @ForeignKey(() => Order)
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  orderId: number;

  @ForeignKey(() => Coupon)
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  coupon_id: number;

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => Order)
  order: Order;

  @BelongsTo(() => Coupon)
  coupon: Coupon;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  start_date: Date;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  end_date: Date;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  terms: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  status: string;
}
