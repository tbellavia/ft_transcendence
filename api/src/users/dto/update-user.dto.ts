import { Transform } from "class-transformer";
import { IsBoolean, IsOptional } from "class-validator";
import { toBoolean } from "src/common/helper/cast.helper";

export class UpdateUserDTO {
    @IsOptional()
    @IsBoolean()
    @Transform(({ value }) => toBoolean(value))
    double_auth: boolean;
}