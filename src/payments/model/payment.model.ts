import {
  Column,
  DataType,
  Model,
  Table,
  AutoIncrement,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Order } from 'src/order/model/order.model';
import { User } from 'src/users/model/user.model';

interface PaymentCreationAttrs {
  orderId: number;
  userId: number;
  amount: number;
  payment_date: Date;
  method: string;
  status: string;
}

@Table({ tableName: 'payments' })
export class Payment extends Model<Payment, PaymentCreationAttrs> {
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ForeignKey(() => Order)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    onDelete: 'CASCADE',
  })
  orderId: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number;

  @BelongsTo(() => Order)
  order: Order;

  @BelongsTo(() => User)
  user: User;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  amount: number;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  payment_date: Date;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  method: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  status: string;
}
