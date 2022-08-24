import { Transform } from "class-transformer";
import { IsNumber, IsOptional, IsPositive } from "class-validator";
import { FindManyOptions } from "typeorm";
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

    getConfig<T>() : FindManyOptions<T> {
        const opts: FindManyOptions<T> = {};

        if ( this.limit )
            opts.take = this.limit;
        if ( this.skip )
            opts.skip = this.skip;
        return opts;
    }
}