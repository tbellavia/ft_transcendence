import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class JoinChannelDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  password?: string;
}