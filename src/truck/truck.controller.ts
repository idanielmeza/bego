import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { TruckService } from './truck.service';
import { CreateTruckDto } from './dto/create-truck.dto';
import { UpdateTruckDto } from './dto/update-truck.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ApiResponse } from '@nestjs/swagger';
import { Truck } from './entities/truck.entity';

@Controller('truck')
export class TruckController {
  constructor(private readonly truckService: TruckService) {}

  @Post()
  @ApiResponse({
    status:201,
    type: Truck
  })
  @Auth()
  create(@Body() createTruckDto: CreateTruckDto) {
    return this.truckService.create(createTruckDto);
  }

  @Get()
  @ApiResponse({
    status:200,
    type: Array<Truck>
  })
  @Auth()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.truckService.findAll(paginationDto);
  }

  @Get(':id')
  @ApiResponse({
    status:200,
    type: Truck
  })
  @Auth()
  findOne(@Param('id') id: string) {
    return this.truckService.findOne(id);
  }

  @Patch(':id')
  @ApiResponse({
    status:200,
    type: Truck
  })
  @Auth()
  update(@Param('id') id: string, @Body() updateTruckDto: UpdateTruckDto) {
    return this.truckService.update(id, updateTruckDto);
  }

  @Delete(':id')
  @ApiResponse({
    status:204
  })
  @Auth()
  remove(@Param('id') id: string) {
    return this.truckService.remove(id);
  }
}
