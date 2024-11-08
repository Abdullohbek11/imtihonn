import { Module } from '@nestjs/common';
import { ShippingMethodsService } from './shipping_methods.service';
import { ShippingMethodsController } from './shipping_methods.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { ShippingMethod } from './model/shipping_method.model';

@Module({
  imports: [SequelizeModule.forFeature([ShippingMethod])],
  controllers: [ShippingMethodsController],
  providers: [ShippingMethodsService],
  exports: [ShippingMethodsService],
})
export class ShippingMethodsModule {}
