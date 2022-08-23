import { Transform } from "class-transformer";
import { IsBoolean, IsBooleanString, IsIn, IsNumber, IsNumberString, IsOptional, IsPositive, Matches } from "class-validator";
import { toBoolean, toNumber } from "../../common/helper/cast.helper";


export class GetUsersQueryDTO {
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

    @IsOptional()
    @Transform(({ value }) => toBoolean(value))
    @IsBoolean()
    pending: boolean;
}