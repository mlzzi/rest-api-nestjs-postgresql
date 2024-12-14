import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';

@ApiTags('Auth') // Swagger tag for grouping endpoints
@Controller('auth') // Base route for this controller
export class AuthController {

    constructor(private readonly authService: AuthService) {} // Injects the AuthService

    @ApiBody({ type: LoginDto }) // Describes the request body in Swagger
    @ApiResponse({ status: 200, description: 'Login successful' }) // Response for successful login
    @ApiResponse({ status: 401, description: 'Invalid credentials' }) // Response for failed login
    @Post('login') // Defines the HTTP POST method for the 'login' route
    async login(@Body() body: { email: string, password: string }) {
        const token = await this.authService.authenticate(body.email, body.password); // Authenticates the user
        return { token }; // Returns the token
    }
}