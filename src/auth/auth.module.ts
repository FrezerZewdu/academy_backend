import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthControllor } from './auth.controller';

@Module({
  providers: [AuthService],
  controllers: [AuthControllor],
})
export class AuthModule {}
