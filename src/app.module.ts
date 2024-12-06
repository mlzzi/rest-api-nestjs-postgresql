import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { WeatherModule } from './weather/weather.module';
import { WeatherEntity } from './weather/entities/weather.entity';
import { ProductsModule } from './products/products.module';

@Module({
  controllers: [AppController, AuthController],
  providers: [AppService, AuthService],
  imports: [
    AuthModule,
    HttpModule,
    UsersModule,
    WeatherModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'user',
      password: 'password',
      database: 'db',
      entities: [WeatherEntity],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([WeatherEntity]),
    ProductsModule,
  ],
})
export class AppModule {}