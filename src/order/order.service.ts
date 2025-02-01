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
import { OrderParser } from './utils/order.parser';
import { IOrderDetail } from './interface/Order.interface';

@Injectable()
export class OrderService {

  constructor(
    private readonly userService: UserService,
    private readonly truckService: TruckService,
    private readonly locationService: LocationService,
    @InjectModel(Order.name)
    private readonly orderModel: Model<Order>,
  ){}

  async create(createOrderDto: CreateOrderDto) : Promise<Order> {

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

  async findAll(paginationDto: PaginationDto) : Promise <IOrderDetail[]> {
    const skip = paginationDto.page * paginationDto.per_page - paginationDto.per_page;
    const take = paginationDto.per_page;
    const orders = await  this.orderModel.find()
      .populate('user', 'email')
      .populate('truck')
      .populate('pickup')
      .populate('dropoff')
      .skip(skip)
      .limit(take)
      .exec();

    return orders.map( OrderParser.parseOrderToOrderVO )
  }

  async findOne(id: string) : Promise<IOrderDetail> {
    const order = await this.orderModel.findById(id).populate('user', 'email')
    .populate('truck')
    .populate('pickup')
    .populate('dropoff');

    if(!order) throw new NotFoundException('Order not found');

    return OrderParser.parseOrderToOrderVO(order);
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) : Promise<Order | null> {
    
    const order = await this.findOne(id);

    if(!order) throw new NotFoundException('Order not found');

    return this.orderModel.findByIdAndUpdate(id, updateOrderDto, { new: true });
  }
  
}
