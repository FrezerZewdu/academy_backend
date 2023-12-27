import { Module } from '@nestjs/common';
import { ModuleService } from './module.service';
import { ModuleController } from './module.controller';

@Module({
  providers: [ModuleService],
  controllers: [ModuleController]
})
export class ModuleModule {}
