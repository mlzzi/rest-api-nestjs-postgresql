import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
    private readonly apiUrl = 'https://jsonplaceholder.typicode.com/users';

    constructor(private readonly httpService: HttpService) {}

    private users: UserDto[] = [];

    async getUsersFromApi() {
        const response = await firstValueFrom(
          this.httpService.get(this.apiUrl)
        );
        return response.data;
      }    

    async getUsersFromApiAndFilter(search: string) {
        const response = await firstValueFrom(
          this.httpService.get(this.apiUrl)
        );
        const users = response.data;
    
        return users.filter((user: any) =>
            user.name.toLowerCase().startsWith(search.toLowerCase())
          );
      }

      async createUser(createUserDto: UserDto): Promise<UserDto> {
        const response = await firstValueFrom(
          this.httpService.post(this.apiUrl, createUserDto),
        );
        return response.data;
      }
}
