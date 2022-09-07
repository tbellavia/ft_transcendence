import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class SendMessageDTO {
  @IsString()
  @IsNotEmpty()
  target: string;

  @IsString()
  @IsNotEmpty()
  message: string;

  @IsBoolean()
  isChannel: boolean;
}