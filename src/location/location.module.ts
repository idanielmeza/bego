import { Module } from '@nestjs/common';
import { LocationService } from './location.service';
import { LocationController } from './location.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Location, LocationSchema } from './entities/location.entity';
import { GmapsService } from 'src/gmaps/gmaps.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [LocationController],
  providers: [LocationService, GmapsService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Location.name,
        schema: LocationSchema,
      },
    ]),
    AuthModule
  ]
})
export class LocationModule {}
