import { ConflictException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from '../common/entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { hashSync } from 'bcryptjs';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserService {

  private readonly logger = new Logger(UserService.name);

  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.userExists(createUserDto.email);

    if(user) throw new ConflictException('email is already registred');

    this.logger.log(`user ${createUserDto.email}, has been created`);

    createUserDto.password = hashSync(createUserDto.password, 10);
    createUserDto.email = createUserDto.email.toLowerCase();

    return this.userModel.create(createUserDto);
  }

  findAll(paginationDto: PaginationDto) {

    const skip = paginationDto.page * paginationDto.per_page - paginationDto.per_page;
    const take = paginationDto.per_page;

    return this.userModel.find({
      isActive: true
    }).skip(skip)
      .limit(take)
      .select(['email', 'isActive']);
  }

  async findOne(id: string) {

    this.logger.log(`Finding user with id: ${id}`);

    const user = await this.userModel.findById(id).select(['email', 'isActive']);

    this.logger.log({user});

    if(!user) throw new NotFoundException('user not found');

    return user
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userModel.findOne({where: {_id:id}})
    
    if(!user) throw new NotFoundException('user not found');

    user.password = hashSync(updateUserDto.password, 10);

    await user.save();
  }

  async remove(id: string) {
    const user = await this.findOne(id);

    if(!user) throw new NotFoundException('user not found');

    user.isActive = !user.isActive;

    await this.userModel.create(user);
  }


  private userExists(email: string) : Promise <User | null> {
    return this.userModel.findOne({ where: { email }, select: ['email'] });
  }
}
