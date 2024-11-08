import { Column, DataType, Model, Table, HasMany } from 'sequelize-typescript';
import { Product } from 'src/product/model/product.model';

interface CategoryCreationAttrs {
  name: string;
  description: string;
}

@Table({ tableName: 'categories' })
export class Category extends Model<Category, CategoryCreationAttrs> {
  @Column({
    type: DataType.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  name: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  description: string;

  @HasMany(() => Product)
  products: Product[];
}
