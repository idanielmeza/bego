import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { ParseMongoIdPipe } from 'src/common/parse-mongo-id/parse-mongo-id.pipe';
import { ApiResponse } from '@nestjs/swagger';
import { User } from 'src/common/entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'User has been successfully created.'
  })
  create(@Body() createUserDto: CreateUserDto) {
    this.userService.create(createUserDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    type: Array<User>
  })
  findAll(@Query() paginationDto: PaginationDto) {
    return this.userService.findAll(paginationDto);
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'User has been successfully created.',
    type: User
  })
  findOne(@Param('id', ParseMongoIdPipe) id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  @ApiResponse({
    status: 204
  })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiResponse({
    status: 204
  })
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
