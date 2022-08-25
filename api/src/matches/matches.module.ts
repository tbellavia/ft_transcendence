import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MatchesController } from "./matches.controller";
import { MatchesService } from "./matches.service";

@Module({
    imports: [TypeOrmModule.forFeature([])],
    controllers: [MatchesController],
    providers: [MatchesService]
})
export class MatchesModule {}