import { Body, Controller, Param, Post } from "@nestjs/common";
import { Public } from "src/common/decorators/public.decorator";
import { MatchCreationDto } from "./dto/match-creation.dto";
import { MatchesService } from "./matches.service";

@Controller("users")
export class MatchesController {
    constructor(
        private matchesService: MatchesService
    ) { }

    @Public()
    @Post(":user1_id/matches/:user2_id")
    async create(
        @Param("user1_id") user1_id: string,
        @Param("user2_id") user2_id: string,
        @Body() matchCreationDto: MatchCreationDto
    )
    {
        return this.matchesService.create(user1_id, user2_id, matchCreationDto);
    }
}