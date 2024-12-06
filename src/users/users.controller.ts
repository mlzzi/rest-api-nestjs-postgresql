import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {

    constructor(private readonly userService: UsersService) {}

    @ApiBody({ type: UserDto })
    @Get()
    @ApiResponse({ status: 200, description: 'Usuários buscados com sucesso' })
    async getUsers() {
        return await this.userService.getUsersFromApi();
    }

    @ApiBody({ type: UserDto })
    @Get('filtered')
    @ApiResponse({ status: 200, description: 'Usuários filtrados e transformados com sucesso' })
    async getFilteredUser(@Query('search') search: string) {
        return await this.userService.getUsersFromApiAndFilter(search);
    }
    
    @Post()
    async createUser(@Body() createUserDto: UserDto): Promise<UserDto> {
        return this.userService.createUser(createUserDto);
    }
}
