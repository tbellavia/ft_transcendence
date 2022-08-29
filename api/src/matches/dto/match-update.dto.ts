import { Transform } from "class-transformer";
import { IsDate, IsNotEmpty, IsNumber } from "class-validator";
import { toDate, toNumber } from "src/common/helper/cast.helper";
import { MatchOutcomeEnum } from "src/matches/entity/match.entity"

export class UpdateMatchDto {
    @IsNotEmpty()
    @IsNumber()
    @Transform(({ value }) => toNumber(value))
    player_1_point: number;

    @IsNotEmpty()
    @IsNumber()
    @Transform(({ value }) => toNumber(value))
    player_2_point: number;

    @IsNotEmpty()
    player_1_outcome: MatchOutcomeEnum;

    @IsNotEmpty()
    player_2_outcome: MatchOutcomeEnum;

    @IsNotEmpty()
    @IsDate()
    @Transform(({ value }) => toDate(value))
    end_date: Date;
}