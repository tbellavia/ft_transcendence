import { IsDate, IsNotEmpty, IsNumber, IsPositive, IsString } from "class-validator";

export class MuteUserOnChannelDTO {
  @IsString()
  @IsNotEmpty()
  name: string;
  
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsNumber()
  @IsPositive()
  durationMs: number;
}