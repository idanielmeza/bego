import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { LocationService } from './location.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { ParseMongoIdPipe } from 'src/common/parse-mongo-id/parse-mongo-id.pipe';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ApiResponse } from '@nestjs/swagger';
import { Location } from './entities/location.entity';

@Controller('location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Location has been successfully created.',
    type: Location
  })
  @Auth()
  create(@Body() createLocationDto: CreateLocationDto) {
    return this.locationService.create(createLocationDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    type: Array<Location>
  })
  @Auth()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.locationService.findAll(paginationDto);
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    type: Location
  })
  @Auth()
  findOne(@Param('id', ParseMongoIdPipe) id: string) {
    return this.locationService.findOne(id);
  }

  @Patch(':id')
  @ApiResponse({
    status: 204,
    type: Location
  })
  @Auth()
  update(@Param('id', ParseMongoIdPipe) id: string, @Body() updateLocationDto: UpdateLocationDto) {
    return this.locationService.update(id, updateLocationDto);
  }

  @Delete(':id')
  @ApiResponse({
    status: 204
  })
  @Auth()
  remove(@Param('id', ParseMongoIdPipe) id: string) {
    return this.locationService.remove(id);
  }
}
