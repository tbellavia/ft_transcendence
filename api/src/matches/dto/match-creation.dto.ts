import { Transform } from "class-transformer";
import { IsDate, IsNotEmpty } from "class-validator";
import { toDate } from "src/common/helper/cast.helper";

export class MatchCreationDto {
    @IsNotEmpty()
    @IsDate()
    @Transform(({ value }) => toDate(value))
    begin_date: Date;
};