import { Controller, Get, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetUserDecorator } from './decorators/get-user.decorator';
import { User } from 'src/common/entities/user.entity';
import { Auth } from './decorators/auth.decorator';
import { LoginUserDto } from './dto/login-user.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  @ApiResponse({
    status: 200,
    type: String
  })
  signin(@Body() loginUserDto: LoginUserDto) {
    return this.authService.signin(loginUserDto);
  }

  @Get('refresh')
  @Auth()
  renewToken(
    @GetUserDecorator() user: User
  ) {
    return this.authService.refresh(user.id.toString());
  }
}
