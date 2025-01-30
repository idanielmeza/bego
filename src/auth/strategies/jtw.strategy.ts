import { ExtractJwt, Strategy } from "passport-jwt";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { IJwtPayload } from "../interfaces/jwt-payload.interface";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { User } from "src/common/entities/user.entity";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    private readonly configService: ConfigService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET')
    });
  }

  async validate(payload: IJwtPayload) : Promise<User> {

    const { id } = payload;

    const user = await this.userModel.findById(id);

    console.log({user});

    if(!user)
        throw new UnauthorizedException('Invalid credentials');

    if(!user.isActive)
        throw new UnauthorizedException('User is not active');

    return user;
  }
}