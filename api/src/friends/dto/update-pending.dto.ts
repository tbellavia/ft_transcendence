import { IsBoolean, IsNotEmpty } from "class-validator";

export class UpdatePendingDto {
    @IsNotEmpty()
    @IsBoolean()
    pending: boolean;
}