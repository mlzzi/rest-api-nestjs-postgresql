import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AuthService {

constructor(private readonly httpService: HttpService) {}

async authenticate(email: string, password: string): Promise<string> {
    const response = await firstValueFrom(
        this.httpService.post('https://reqres.in/api/login', {
            email,
            password
        })
    )
    return response.data.token;
}

}
