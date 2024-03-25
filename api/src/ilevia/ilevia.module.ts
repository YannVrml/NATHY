import { Module } from '@nestjs/common';
import { IleviaController } from './ilevia.controller';
import { IleviaService } from './ilevia.service';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [CacheModule.register()],
  controllers: [IleviaController],
  providers: [IleviaService],
})
export class IleviaModule {}
