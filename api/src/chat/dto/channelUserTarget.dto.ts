import { IsNotEmpty, IsString } from "class-validator";

export class ChannelUserTargetDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  username: string;
}