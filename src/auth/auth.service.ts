import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/common/entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcryptjs';
import { IJwtPayload } from './interfaces/jwt-payload.interface';
import { LoginUserDto } from './dto/login-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {
  
  private readonly logger = new Logger(AuthService.name)

  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    private readonly jwtService: JwtService
  ) {}

  async signin(loginUserDto: LoginUserDto) {

    this.logger.log('entro');

    const {email, password} = loginUserDto;

    const user = await this.userModel.findOne({
      email: email
    });

    this.logger.log(user);

    if(!user)
      throw new UnauthorizedException('Invalid credentials');

    if(compareSync(password, user.password))
      return this.getJWT({id: user.id});

    throw new UnauthorizedException('Invalid credentials');

  }

  async refresh(id: string) {
    this.logger.log(id);
    return this.getJWT({id})
  }

  private getJWT(payload: IJwtPayload){
    return this.jwtService.sign(payload);
  }

}
