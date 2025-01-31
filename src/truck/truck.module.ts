import { Module } from '@nestjs/common';
import { TruckService } from './truck.service';
import { TruckController } from './truck.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Truck, TruckSchema } from './entities/truck.entity';
import { CommonModule } from 'src/common/common.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Truck.name,
        schema: TruckSchema,
      },
    ]),
    CommonModule,
    UserModule
  ],
  controllers: [TruckController],
  providers: [TruckService],
  exports: [MongooseModule]
})
export class TruckModule {}
