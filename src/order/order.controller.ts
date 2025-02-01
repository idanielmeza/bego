import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { ParseMongoIdPipe } from 'src/common/parse-mongo-id/parse-mongo-id.pipe';
import { Auth } from 'src/auth/decorators/auth.decorator';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @Auth()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }

  @Get()
  @Auth()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.orderService.findAll(paginationDto);
  }

  @Get(':id')
  @Auth()
  findOne(@Param('id', ParseMongoIdPipe) id: string) {
    return this.orderService.findOne(id);
  }

  @Patch(':id')
  @Auth()
  update(@Param('id', ParseMongoIdPipe) id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(id, updateOrderDto);
  }
}
