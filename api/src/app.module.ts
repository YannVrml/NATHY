import { Module } from '@nestjs/common';
import { IleviaModule } from './ilevia/ilevia.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), IleviaModule],
})
export class AppModule {}
