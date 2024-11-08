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
import { Product } from 'src/product/model/product.model';

interface OrderItemCreationAttrs {
  orderId: number;
  productId: number;
  quantity: number;
  price: number;
}

@Table({ tableName: 'order_items' })
export class OrderItem extends Model<OrderItem, OrderItemCreationAttrs> {
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
  })
  orderId: number;

  @BelongsTo(() => Order)
  order: Order;

  @ForeignKey(() => Product)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    onDelete: 'CASCADE', // Product o'chirilganda bog'liq order_item ham o'chiriladi
  })
  productId: number;

  @BelongsTo(() => Product)
  product: Product;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  quantity: number;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  price: number;
}
