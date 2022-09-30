import { IsNotEmpty, IsString } from "class-validator";

export class InviteUserDTO {
  @IsNotEmpty()
  @IsString()
  channelName: string;

  @IsNotEmpty()
  @IsString()
  username: string;
}