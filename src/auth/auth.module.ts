import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthControllor } from './auth.controller';
import { JwtStrategy } from './strategy';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule.register({})],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthControllor],
})
export class AuthModule {}
