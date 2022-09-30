import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateChannelDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  password?: string;
}