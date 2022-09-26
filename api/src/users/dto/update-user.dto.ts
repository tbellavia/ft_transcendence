import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateUserDTO {
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    public password?: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    public username?: string;

    @IsOptional()
    @IsBoolean()
    public is_two_factor_auth_enabled?: boolean;
}