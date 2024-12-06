import { HttpService } from '@nestjs/axios';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { CreateWeatherDto } from './dto/create-weather.dto';
import { WeatherEntity } from './entities/weather.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class WeatherService {
  private readonly apiUrl = 'http://api.weatherstack.com/current';
  private readonly key = 'key';

  constructor(
    private readonly httpService: HttpService,
    @InjectRepository(WeatherEntity)
    private readonly weatherRepository: Repository<WeatherEntity>,
  ) {}

  async getCurrentWeather(query: string): Promise<any> {
    try {
      const url = `${this.apiUrl}?access_key=${this.key}&query=${query}`;
      const response = await firstValueFrom(this.httpService.get(url));
      return response.data;
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch weather data');
    }
  }

  async createWeather(query: string): Promise<WeatherEntity> {
    try {
      const weatherData = await this.getCurrentWeather(query);
      const createWeatherDto: CreateWeatherDto = {
        name: weatherData.location.name,
        country: weatherData.location.country,
        region: weatherData.location.region,
        localtime: weatherData.location.localtime,
        utc_offset: weatherData.location.utc_offset,
      };
      const weather = this.weatherRepository.create(createWeatherDto);
      return this.weatherRepository.save(weather);
    } catch (error) {
      throw new InternalServerErrorException('Failed to save weather data');
    }
  }

  async getAllWeatherRecords(): Promise<WeatherEntity[]> {
    try {
      return this.weatherRepository.find();
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch weather records');
    }
  }
}