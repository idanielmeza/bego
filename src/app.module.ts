import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { CommonModule } from './common/common.module';
import { MongooseModule } from '@nestjs/mongoose';
import { TruckModule } from './truck/truck.module';
import { LocationModule } from './location/location.module';
import { GmapsService } from './gmaps/gmaps.service';
import { OrderModule } from './order/order.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@localhost:27017/${process.env.DB_NAME}?authSource=admin`,
      { dbName: process.env.DB_NAME || 'test' },
    ),
    AuthModule,
    UserModule,
    CommonModule,
    TruckModule,
    LocationModule,
    OrderModule,
  ],
  controllers: [AppController],
  providers: [AppService, GmapsService],
})
export class AppModule {}
