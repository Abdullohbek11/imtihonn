import {
  Column,
  DataType,
  Model,
  Table,
  AutoIncrement,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Product } from 'src/product/model/product.model';

interface InventoryCreationAttrs {
  productId: number;
  quantity: number;
  location: string;
}

@Table({ tableName: 'inventories' })
export class Inventory extends Model<Inventory, InventoryCreationAttrs> {
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ForeignKey(() => Product)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
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
    type: DataType.STRING,
    allowNull: false,
  })
  location: string;
}
