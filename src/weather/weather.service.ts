import { HttpService } from '@nestjs/axios';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { CreateWeatherDto } from './dto/create-weather.dto';
import { WeatherEntity } from './entities/weather.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class WeatherService {
  private readonly apiUrl = 'http://api.weatherstack.com/current'; // API endpoint
  private readonly key = 'insert-your-key'; // API key

  constructor(
    private readonly httpService: HttpService, // Injects the HttpService
    @InjectRepository(WeatherEntity)
    private readonly weatherRepository: Repository<WeatherEntity>, // Injects the WeatherEntity repository
  ) {}

  async getCurrentWeather(query: string): Promise<any> {
    try {
      const url = `${this.apiUrl}?access_key=${this.key}&query=${query}`; // Constructs the API URL
      const response = await firstValueFrom(this.httpService.get(url)); // Sends GET request to API
      return response.data; // Returns the response data
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch weather data'); // Handles errors
    }
  }

  async createWeather(query: string): Promise<WeatherEntity> {
    try {
      const weatherData = await this.getCurrentWeather(query); // Fetches current weather data
      const createWeatherDto: CreateWeatherDto = {
        name: weatherData.location.name,
        country: weatherData.location.country,
        region: weatherData.location.region,
        localtime: weatherData.location.localtime,
        utc_offset: weatherData.location.utc_offset,
      };
      const weather = this.weatherRepository.create(createWeatherDto); // Creates a new weather entity
      return this.weatherRepository.save(weather); // Saves the weather entity
    } catch (error) {
      throw new InternalServerErrorException('Failed to save weather data'); // Handles errors
    }
  }

  async getAllWeatherRecords(): Promise<WeatherEntity[]> {
    try {
      return this.weatherRepository.find(); // Retrieves all weather records
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch weather records'); // Handles errors
    }
  }
}