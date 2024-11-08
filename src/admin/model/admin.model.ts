import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface AdminCreationAttrs {
  full_name: string;
  phone_number: string;
  username: string;
  email: string;
  password: string;
  is_active: boolean;
  is_creator: boolean;
}

@Table({ tableName: 'admins' })
export class Admin extends Model<Admin, AdminCreationAttrs> {
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
    unique: true,
    allowNull: false,
  })
  phone_number: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  is_active: boolean;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_creator: boolean;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  hashed_refresh_token: string;
}
