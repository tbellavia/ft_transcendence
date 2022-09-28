import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { Public } from "src/common/decorators/public.decorator";
import { PaginationQueryDto } from "src/common/dto/pagination.query-dto";
import { MatchCreationDto } from "./dto/match-creation.dto";
import { UpdateMatchDto } from "./dto/match-update.dto";
import { MatchesService } from "./matches.service";

@Controller("users")
export class MatchesController {
    constructor(
        private matchesService: MatchesService
    ) { }

    @Post("/:username1/matches/:username2")
    async create(
        @Param("username1") username1: string,
        @Param("username2") username2: string
    )
    {
        return this.matchesService.create(username1, username2);
    }
    
    @Get("/matches/all")
    async findAll(@Query() paginationQueryDto: PaginationQueryDto) {
        return this.matchesService.findAll(paginationQueryDto);
    }

    @Get("/matches/:match_id")
    async findOne(
        @Param("match_id") match_id: string
    ) 
    {
        return this.matchesService.findOne(match_id);
    }

    @Get("/:username1/matches/:username2")
    async findAllByUsers(
        @Param("username1") username1: string,
        @Param("username2") username2: string,
        @Query() paginationQueryDto: PaginationQueryDto
    )
    {
        return this.matchesService.findAllByUsers(username1, username2, paginationQueryDto);
    }

    @Get("/:username/matches")
    async findAllByUser(
        @Param("username") username: string,
        @Query() paginationQueryDto: PaginationQueryDto
    )
    {
        return this.matchesService.findAllByUser(username, paginationQueryDto);
    }

    @Put("/matches/:match_id")
    async update(
        @Param("match_id") match_id: string,
        @Body() updateMatchDto: UpdateMatchDto
    )
    {
        return this.matchesService.update(match_id, updateMatchDto);
    }

    @Delete("/matches/:match_id")
    async remove(@Param("match_id") match_id: string) {
        return this.matchesService.remove(match_id);
    }
}