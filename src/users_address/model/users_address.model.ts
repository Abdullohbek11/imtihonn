import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { ShippingMethod } from 'src/shipping_methods/model/shipping_method.model';
import { User } from 'src/users/model/user.model';

interface UsersAddressAttributes {
  id: number;
  user_id: number;
}

@Table({ tableName: 'users_address' })
export class UsersAddress extends Model<UsersAddressAttributes> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  user_id: number;

  @BelongsTo(() => User)
  user: User;

  @HasMany(() => ShippingMethod)
  shipping_methods: ShippingMethod[];
}
