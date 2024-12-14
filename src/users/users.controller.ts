import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';

@ApiTags('Users') // Swagger tag for grouping endpoints
@Controller('users') // Base route for this controller
export class UsersController {

    constructor(private readonly userService: UsersService) {} // Injects the UsersService

    @ApiBody({ type: UserDto }) // Describes the request body in Swagger
    @Get()
    @ApiResponse({ status: 200, description: 'Users retrieved successfully' }) // Response for successful retrieval
    async getUsers() {
        return await this.userService.getUsersFromApi(); // Calls service to get users
    }

    @ApiBody({ type: UserDto }) // Describes the request body in Swagger
    @Get('filtered')
    @ApiResponse({ status: 200, description: 'Filtered users retrieved successfully' }) // Response for successful retrieval
    async getFilteredUser(@Query('search') search: string) {
        return await this.userService.getUsersFromApiAndFilter(search); // Calls service to get and filter users
    }
    
    @Post()
    async createUser(@Body() createUserDto: UserDto): Promise<UserDto> {
        return this.userService.createUser(createUserDto); // Calls service to create a new user
    }
}