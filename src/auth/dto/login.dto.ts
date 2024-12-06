import { ApiProperty } from "@nestjs/swagger";

export class LoginDto {
    @ApiProperty({ description: 'E-mail do usuário para login'})
    email: string; // eve.holt@reqres.in

    @ApiProperty({ description: 'Senha do usuário'})
    password: string;
}