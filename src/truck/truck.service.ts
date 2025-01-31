import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTruckDto } from './dto/create-truck.dto';
import { UpdateTruckDto } from './dto/update-truck.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/common/entities/user.entity';
import { Model } from 'mongoose';
import { Truck } from './entities/truck.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class TruckService {

  constructor(
    @InjectModel(Truck.name)
    private readonly truckModel: Model<Truck>,
    private readonly userService: UserService,
  ){}

  async create(createTruckDto: CreateTruckDto) {

    const user = await this.userService.findOne(createTruckDto.user);

    if(!user) throw new ConflictException('user is invalid');

    if(!user.isActive) throw new ConflictException('user is not acitve');

    return this.truckModel.create(createTruckDto);
  }

  findAll(paginationDto: PaginationDto) {
    const skip = paginationDto.page * paginationDto.per_page - paginationDto.per_page;
    const take = paginationDto.per_page;

    return this.truckModel.find({
      isActive: true
    }).skip(skip)
      .limit(take);
  }

  findOne(id: string) {
    return this.truckModel.findById(id);
  }

  async update(id: string, updateTruckDto: UpdateTruckDto) {
    const user = await this.userService.findOne(updateTruckDto.user!);

    if(!user) throw new ConflictException('user is invalid');

    if(!user.isActive) throw new ConflictException('user is not acitve');

    return await this.truckModel.findByIdAndUpdate(id, updateTruckDto, { new: true });

  }

  async remove(id: string) {
    const truck = await this.findOne(id);
    if(!truck) throw new NotFoundException('truck not found');
    truck.isActive = false;
    await truck.save();
  }
}
