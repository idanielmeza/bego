import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Location } from './entities/location.entity';
import { Model } from 'mongoose';
import { GmapsService } from 'src/gmaps/gmaps.service';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Injectable()
export class LocationService {

  constructor(
    @InjectModel(Location.name)
    private readonly locationModel: Model<Location>,
    private readonly gmapsService: GmapsService,
  ){}

  async create(createLocationDto: CreateLocationDto) {

    const existsPlace = await this.existsPlaceId(createLocationDto.place_id);

    if(existsPlace) throw new ConflictException('place_id already exists');

    await this.gmapsService.getLocationByPlaceId(createLocationDto.place_id);

    return this.locationModel.create(createLocationDto);

  }

  findAll(paginationDto: PaginationDto) {
   
    const skip = paginationDto.page * paginationDto.per_page - paginationDto.per_page;
    const take = paginationDto.per_page;

    return this.locationModel.find({
      isActive: true
    })
      .skip(skip)
      .limit(take);
  }

  async findOne(id: string) {

    const location = await this.locationModel.findById(id);

    if(!location) throw new NotFoundException('location not found');

    return location;
  }

  async update(id: string, updateLocationDto: UpdateLocationDto) {

    await this.findOne(id);

    return this.locationModel.findByIdAndUpdate(id, updateLocationDto, { new: true });
  }

  async remove(id: string) {
    await this.findOne(id);
    this.locationModel.findByIdAndUpdate(id, {isActive: false})
  }

  private async existsPlaceId(placeId: string){
    return await this.locationModel.exists({ place_id: placeId });
  }
}
