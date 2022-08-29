import { IsNotEmpty, IsString } from "class-validator";

export class UpdateUserDTO {
    @IsNotEmpty()
    @IsString()
    password: string;
}