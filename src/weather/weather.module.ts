import { Module } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { WeatherController } from './weather.controller';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WeatherEntity } from './entities/weather.entity';

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([WeatherEntity])],
  providers: [WeatherService],
  controllers: [WeatherController]
})
export class WeatherModule {}
