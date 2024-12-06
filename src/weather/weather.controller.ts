import { Controller, Get, Post, Query } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { WeatherEntity } from './entities/weather.entity';

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get('current')
  async getCurrentWeather(@Query('location') location: string) {
      return this.weatherService.getCurrentWeather(location);
  }

  @Post('save')
  async createWeather(@Query('location') location: string): Promise<WeatherEntity> {
  return this.weatherService.createWeather(location);
  }

  @Get('all')
  async getAllWeatherRecords(): Promise<WeatherEntity[]> {
    return this.weatherService.getAllWeatherRecords();
  }

}
