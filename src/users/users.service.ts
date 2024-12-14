import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
    private readonly apiUrl = 'https://jsonplaceholder.typicode.com/users'; // API endpoint

    constructor(private readonly httpService: HttpService) {} // Injects the HttpService

    private users: UserDto[] = []; // Local cache for users

    async getUsersFromApi() {
        const response = await firstValueFrom(
          this.httpService.get(this.apiUrl) // Sends GET request to API
        );
        return response.data; // Returns the response data
    }    

    async getUsersFromApiAndFilter(search: string) {
        const response = await firstValueFrom(
          this.httpService.get(this.apiUrl) // Sends GET request to API
        );
        const users = response.data;
    
        return users.filter((user: any) =>
            user.name.toLowerCase().startsWith(search.toLowerCase()) // Filters users by name
        );
    }

    async createUser(createUserDto: UserDto): Promise<UserDto> {
        const response = await firstValueFrom(
          this.httpService.post(this.apiUrl, createUserDto), // Sends POST request to API
        );
        return response.data; // Returns the created user
    }
}