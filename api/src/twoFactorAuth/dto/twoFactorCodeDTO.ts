import { IsNotEmpty, IsNumber, IsNumberString } from "class-validator";

export class TwoFactorCodeDTO {
  @IsNotEmpty()
  @IsNumberString()
  code: string
}