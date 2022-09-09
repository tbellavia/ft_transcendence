import { Transform } from "class-transformer";
import { IsBoolean, IsNotEmpty } from "class-validator";
import { toBoolean } from "src/common/helper/cast.helper";

export class UpdatePendingDto {
    @IsNotEmpty()
    @IsBoolean()
    @Transform(({ value }) => toBoolean(value))
    pending: boolean;
}