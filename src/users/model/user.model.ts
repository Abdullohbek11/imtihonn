import {
  Column,
  DataType,
  Model,
  Table,
  CreatedAt,
  UpdatedAt,
  HasMany,
} from 'sequelize-typescript';
import { UsersAddress } from 'src/users_address/model/users_address.model';
import { Order } from 'src/order/model/order.model';
import { Payment } from 'src/payments/model/payment.model';
import { Contract } from 'src/contract/model/contract.model';

interface UserCreationAttrs {
  full_name: string;
  phone_number: string;
  email: string;
  password: string;
  address: string;
  is_active: boolean;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs> {
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
  full_name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  phone_number: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;


  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  address: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_active: boolean;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  hashed_refresh_token: string;
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  activation_link: string;

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;

  @HasMany(() => UsersAddress)
  addresses: UsersAddress[];

  @HasMany(() => Order)
  orders: Order[];

  @HasMany(() => Payment)
  payments: Payment[];

  @HasMany(() => Contract)
  contracts: Contract[];
}
