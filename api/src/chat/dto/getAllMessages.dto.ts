import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class GetAllMessagesDTO {
  @IsString()
  @IsNotEmpty()
  target: string;

  @IsBoolean()
  isChannel: boolean;
}