import { IsNotEmpty, IsNumber, IsNumberString } from "class-validator";

export default class TwoFactorCodeDTO {
  @IsNotEmpty()
  @IsNumberString()
  code: string
}