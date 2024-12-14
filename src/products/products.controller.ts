import { Controller, Get } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products') // Defines the base route for this controller
export class ProductsController {

    constructor(private readonly productsService: ProductsService) {} // Injects the ProductsService

    @Get() // Defines the HTTP GET method for the 'products' route
    async getAllProducts() { // Handles the request to get all products
        return this.productsService.getProducts(); // Calls the service method to retrieve products
    }

}