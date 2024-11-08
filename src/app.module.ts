import { Module } from '@nestjs/common';
import { AdminModule } from './admin/admin.module';
import { UsersModule } from './users/users.module';
import { UsersAddressModule } from './users_address/users_address.module';
import { PaymentsModule } from './payments/payments.module';
import { OrderModule } from './order/order.module';
import { OrderItemsModule } from './order_items/order_items.module';
import { InventoryModule } from './inventory/inventory.module';
import { ShippingMethodsModule } from './shipping_methods/shipping_methods.module';
import { ContractModule } from './contract/contract.module';
import { ProductModule } from './product/product.module';
import { ProductImagesModule } from './product_images/product_images.module';
import { CategoryModule } from './category/category.module';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt';
import { Admin } from './admin/model/admin.model';
import { CouponModule } from './coupon/coupon.module';
import { Coupon } from './coupon/model/coupon.model';
import { User } from './users/model/user.model';
import { Contract } from './contract/model/contract.model';
import { Category } from './category/model/category.model';
import { Inventory } from './inventory/model/inventory.model';
import { Order } from './order/model/order.model';
import { OrderItem } from './order_items/model/order_item.model';
import { Payment } from './payments/model/payment.model';
import { Product } from './product/model/product.model';
import { ProductImage } from './product_images/model/product_image.model';
import { ShippingMethod } from './shipping_methods/model/shipping_method.model';
import { UsersAddress } from './users_address/model/users_address.model';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    JwtModule.register({
      global: true,
      secret: process.env.ACCESS_TOKEN_KEY,
      signOptions: {
        expiresIn: '24h',
      },
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: String(process.env.POSTGRES_PASSWORD),
      database: process.env.POSTGRES_DB,
      models: [
        Admin,
        Coupon,
        User,
        Contract,
        Category,
        Inventory,
        Order,
        OrderItem,
        Payment,
        Product,
        ProductImage,
        ShippingMethod,
        UsersAddress,
      ],
      autoLoadModels: true,
      sync: { alter: true },
      logging: true,
    }),
    AdminModule,
    UsersModule,
    UsersAddressModule,
    PaymentsModule,
    OrderModule,
    OrderItemsModule,
    InventoryModule,
    ShippingMethodsModule,
    ContractModule,
    ProductModule,
    ProductImagesModule,
    CategoryModule,
    CouponModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
