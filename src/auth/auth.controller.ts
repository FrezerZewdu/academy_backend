import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, SignupDto } from './dto';
import { HasRoles } from './decorator/has-roles.decorator';
import { Roles } from './dto/enums';
import { RolesGuard } from './guard/roles.guard';

@Controller('auth')
export class AuthControllor {
  constructor(private authService: AuthService) {}

  @HasRoles(Roles.admin, Roles.registrar)
  @UseGuards(RolesGuard)
  @Post('signup')
  signup(@Body() request: SignupDto) {
    return this.authService.signup(request);
  }

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signin(@Body() request: LoginDto) {
    return this.authService.signin(request);
  }
}
