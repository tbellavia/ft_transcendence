import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateUserDTO {
    @IsNotEmpty()
    @IsString()
    username: string;

    @IsOptional()
    @IsNumber()
    user42_id?: number;
}