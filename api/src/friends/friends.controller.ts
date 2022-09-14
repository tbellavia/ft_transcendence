import { Req, Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { RequestWithUser } from "src/auth/interfaces/requestWithUser.interface";
import { GetFriendsQueryDTO } from "./dto/get-friends.query.dto";
import { UpdatePendingDto } from "./dto/update-pending.dto";
import { FriendsService } from "./friends.service";

// This controller routes works only for authentified user
@Controller('/users/friends/me')
export class FriendsController {
    constructor(
        private friendsService: FriendsService
    ) {}

    @Post(':target')
    async create(
        @Req() request: RequestWithUser,
        @Param("username2") target: string
    ) 
    {
        return this.friendsService.create(request.user.username, target);
    }

    @Get()
    async findAll(
        @Req() request: RequestWithUser,
        @Query() getFriendsQueryDto: GetFriendsQueryDTO
    ) 
    {
        return this.friendsService.findAll(request.user.username, getFriendsQueryDto);
    }

    @Put(':target')
    async update(
        @Req() request: RequestWithUser,
        @Param('target') target: string,
        @Body() updatePendingDto: UpdatePendingDto
    )
    {
        return await this.friendsService.update(request.user.username, target, updatePendingDto);
    }

    @Delete(':target')
    async delete(
        @Req() request: RequestWithUser,
        @Param('target') target: string
    )
    {
        return this.friendsService.delete(request.user.username, target);
    }
}