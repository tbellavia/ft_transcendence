import { Transform } from "class-transformer";
import { IsNumber, IsOptional, IsPositive } from "class-validator";
import { toNumber } from "../helper/cast.helper";

export class PaginationQueryDto {
    @IsOptional()
    @Transform(({ value }) => toNumber(value))
    @IsNumber()
    @IsPositive()
    limit: number;

    @IsOptional()
    @Transform(({ value }) => toNumber(value))
    @IsNumber()
    @IsPositive()
    skip: number;
}