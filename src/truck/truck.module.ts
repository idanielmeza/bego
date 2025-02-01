import { Module } from '@nestjs/common';
import { TruckService } from './truck.service';
import { TruckController } from './truck.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Truck, TruckSchema } from './entities/truck.entity';
import { CommonModule } from 'src/common/common.module';
import { UserModule } from 'src/user/user.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Truck.name,
        schema: TruckSchema,
      },
    ]),
    CommonModule,
    UserModule,
    AuthModule
  ],
  controllers: [TruckController],
  providers: [TruckService],
  exports: [MongooseModule, TruckService]
})
export class TruckModule {}
