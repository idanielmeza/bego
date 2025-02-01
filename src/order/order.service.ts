import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { UserService } from 'src/user/user.service';
import { TruckService } from 'src/truck/truck.service';
import { LocationService } from 'src/location/location.service';
import { InjectModel } from '@nestjs/mongoose';
import { Order } from './entities/order.entity';
import { Model } from 'mongoose';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Injectable()
export class OrderService {

  constructor(
    private readonly userService: UserService,
    private readonly truckService: TruckService,
    private readonly locationService: LocationService,
    @InjectModel(Order.name)
    private readonly orderModel: Model<Order>,
  ){}

  async create(createOrderDto: CreateOrderDto) {

    try {
      await Promise.all([
        this.userService.findOne(createOrderDto.user),
        this.truckService.findOne(createOrderDto.truck),
        this.locationService.findOne(createOrderDto.pickup),
        this.locationService.findOne(createOrderDto.dropoff),
      ]);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
   
    return this.orderModel.create(createOrderDto);
  }

  // TODO: add filters
  findAll(paginationDto: PaginationDto) {
    const skip = paginationDto.page * paginationDto.per_page - paginationDto.per_page;
    const take = paginationDto.per_page;
    return this.orderModel.find()
      .skip(skip)
      .limit(take)
      .exec();
  }

  async findOne(id: string) {
    const order = await this.orderModel.findById(id);

    if(!order) throw new NotFoundException('Order not found');

    return order;
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    
    const order = await this.findOne(id);

    if(!order) throw new NotFoundException('Order not found');

    return this.orderModel.findByIdAndUpdate(id, updateOrderDto, { new: true });
  }
  
}
