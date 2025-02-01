import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { Order, OrderSchema } from './entities/order.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { CommonModule } from 'src/common/common.module';
import { TruckModule } from 'src/truck/truck.module';
import { LocationModule } from 'src/location/location.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Order.name, schema: OrderSchema }
    ]),
    AuthModule,
    CommonModule,
    TruckModule,
    LocationModule,
    UserModule
  ],
  controllers: [OrderController],
  providers: [OrderService],
 exports: [MongooseModule]
})
export class OrderModule {}
