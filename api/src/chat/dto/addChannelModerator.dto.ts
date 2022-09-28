import { IsNotEmpty, IsString } from "class-validator";

export class AddChannelModeratorDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  username: string;
}