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

interface ProductImageAttributes {
  id: number;
  productId: number;
  image_url: string;
}

@Table({
  tableName: 'product_images',
})
export class ProductImage extends Model<ProductImageAttributes> {
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

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  image_url: string;

  @BelongsTo(() => Product)
  product: Product;
}
