import { Transform } from "class-transformer";
import { IsBoolean, IsNumber, IsOptional } from "class-validator";
import { toBoolean, toNumber } from "../../common/helper/cast.helper";

export class GetUsersQueryDTO {
    @IsOptional()
    @Transform(({ value }) => toNumber(value))
    @IsNumber()
    limit: number | null = null;

    @IsOptional()
    @Transform(({ value }) => toNumber(value))
    @IsNumber()
    skip: number | null = null;

    @IsOptional()
    @Transform(({ value }) => toBoolean(value))
    @IsBoolean()
    pending: boolean = null;
}