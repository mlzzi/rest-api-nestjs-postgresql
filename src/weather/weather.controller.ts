import { Controller, Get, Post, Query } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { WeatherEntity } from './entities/weather.entity';

@Controller('weather') // Base route for weather-related endpoints
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {} // Injects the WeatherService

  @Get('current')
  async getCurrentWeather(@Query('location') location: string) {
      return this.weatherService.getCurrentWeather(location); // Retrieves current weather for the specified location
  }

  @Post('save')
  async createWeather(@Query('location') location: string): Promise<WeatherEntity> {
      return this.weatherService.createWeather(location); // Saves weather data for the specified location
  }

  @Get('all')
  async getAllWeatherRecords(): Promise<WeatherEntity[]> {
      return this.weatherService.getAllWeatherRecords(); // Retrieves all saved weather records
  }
}