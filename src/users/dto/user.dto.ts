import { ApiProperty } from "@nestjs/swagger";

export class UserDto {
    
    @ApiProperty({ description: 'ID do usuário' })
    id: number;

    @ApiProperty({ description: 'Nome do usuário' })
    name: string;

    @ApiProperty({ description: 'Username do usuário' })
    username: string;

    @ApiProperty({ description: 'E-mail do usuário' })
    email: string;

    @ApiProperty({ description: 'Endereço do usuário', type: Object })
    address: {
        street: string;
        city: string;
        zipcode: string;
    };

    @ApiProperty({ description: 'Telefone do usuário' })
    phone: string;

}