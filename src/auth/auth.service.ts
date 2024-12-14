import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable() // Marks this class as a provider that can be injected into other classes
export class AuthService {

    constructor(private readonly httpService: HttpService) {} // Injects the HttpService

    async authenticate(email: string, password: string): Promise<string> { // Authenticates the user with email and password
        const response = await firstValueFrom(
            this.httpService.post('https://reqres.in/api/login', { // Sends a POST request to the login endpoint
                email,
                password
            })
        );
        return response.data.token; // Returns the token from the response
    }
}