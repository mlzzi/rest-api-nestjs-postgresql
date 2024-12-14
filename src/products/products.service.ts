import { HttpService } from '@nestjs/axios';
import { Injectable, NotFoundException } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ProductsService {

    constructor(
        private readonly httpService: HttpService,
    ) {}

    async getProducts(): Promise<any> {
        try {
            const url = 'https://fakestoreapi.com/products'; // API endpoint
            const response = await firstValueFrom(this.httpService.get(url)); // Send GET request

            return response.data; // Return the response data
        } catch (error) {
            console.log(error);
            throw new NotFoundException('Failed to Retrieve Products'); // Handle errors
        }
    }
}