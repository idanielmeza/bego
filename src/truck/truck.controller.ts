import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { TruckService } from './truck.service';
import { CreateTruckDto } from './dto/create-truck.dto';
import { UpdateTruckDto } from './dto/update-truck.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Controller('truck')
export class TruckController {
  constructor(private readonly truckService: TruckService) {}

  @Post()
  create(@Body() createTruckDto: CreateTruckDto) {
    return this.truckService.create(createTruckDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.truckService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.truckService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTruckDto: UpdateTruckDto) {
    return this.truckService.update(id, updateTruckDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.truckService.remove(id);
  }
}
