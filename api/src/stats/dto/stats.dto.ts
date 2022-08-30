import { IsEnum, IsNumber, IsOptional } from "class-validator";
import { RankEnum } from "../entities/stat.entity";

export class UpdateStatDto {
    @IsOptional()
    @IsNumber()
    game_total: number;

    @IsOptional()
    @IsNumber()
    game_won: number;

    @IsOptional()
    @IsNumber()
    game_abandonned: number;

    @IsOptional()
    @IsEnum(RankEnum)
    rank: RankEnum;
}