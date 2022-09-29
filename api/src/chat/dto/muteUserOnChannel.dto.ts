import { IsDate, IsNotEmpty, IsString } from "class-validator";

export class MuteUserOnChannelDTO {
  @IsString()
  @IsNotEmpty()
  name: string;
  
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsDate()
  duration: Date;
}