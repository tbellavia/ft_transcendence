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

    
    @Post("/:user1_id/matches/:user2_id")
    async create(
        @Param("user1_id") user1_id: string,
        @Param("user2_id") user2_id: string,
        @Body() matchCreationDto: MatchCreationDto
    )
    {
        return this.matchesService.create(user1_id, user2_id, matchCreationDto);
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


    
    @Get("/:user1_id/matches/:user2_id")
    async findAllByUsers(
        @Param("user1_id") user1_id: string,
        @Param("user2_id") user2_id: string,
        @Query() paginationQueryDto: PaginationQueryDto
    )
    {
        return this.matchesService.findAllByUsers(user1_id, user2_id, paginationQueryDto);
    }

    
    @Get("/:user_id/matches")
    async findAllByUser(
        @Param("user_id") user_id: string,
        @Query() paginationQueryDto: PaginationQueryDto
    )
    {
        return this.matchesService.findAllByUser(user_id, paginationQueryDto);
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