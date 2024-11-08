import {
  Column,
  DataType,
  Model,
  Table,
  AutoIncrement,
  HasMany,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { ProductImage } from 'src/product_images/model/product_image.model';
import { OrderItem } from 'src/order_items/model/order_item.model';
import { Category } from 'src/category/model/category.model';
import { Inventory } from 'src/inventory/model/inventory.model';

interface ProductCreationAttrs {
  name: string;
  description: string;
  price: number;
  color: string;
  width: number;
  height: number;
  stock: number;
  category_id: number;
}

@Table({ tableName: 'products' })
export class Product extends Model<Product, ProductCreationAttrs> {
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description: string;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  price: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  color: string;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  width: number;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  height: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 0,
  })
  stock: number;

  @ForeignKey(() => Category)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  category_id: number;

  @BelongsTo(() => Category)
  category: Category;

  @HasMany(() => ProductImage)
  product_images: ProductImage[];

  @HasMany(() => OrderItem)
  order_items: OrderItem[];

  @HasMany(() => Inventory)
  inventory: Inventory[];
}
