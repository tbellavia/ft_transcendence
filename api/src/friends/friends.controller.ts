import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { Public } from "src/common/decorators/public.decorator";
import { GetFriendsQueryDTO } from "./dto/get-friends.query.dto";
import { UpdatePendingDto } from "./dto/update-pending.dto";
import { FriendsService } from "./friends.service";

@Controller("users")
export class FriendsController {
    constructor(
        private friendsService: FriendsService
    ) {}

    @Post(":username1/friends/:username2")
    async create(
        @Param("username1") username1: string,
        @Param("username2") username2: string
    ) 
    {
        return this.friendsService.create(username1, username2);
    }

    @Get(":username/friends")
    async findAll(
        @Param("username") username: string,
        @Query() getFriendsQueryDto: GetFriendsQueryDTO) 
    {
        return this.friendsService.findAll(username, getFriendsQueryDto);
    }

    @Get(":username1/friends/:username2")
    async findOne(
        @Param("username1") username1: string,
        @Param("username2") username2: string
    )
    {
        return this.friendsService.findOne(username1, username2);
    }

    @Put(":username1/friends/:username2")
    async update(
        @Param("username1") username1: string,
        @Param("username2") username2: string,
        @Body() updatePendingDto: UpdatePendingDto
    )
    {
        return await this.friendsService.update(username1, username2, updatePendingDto);
    }

    @Delete(":username1/friends/:username2")
    async delete(
        @Param("username1") username1: string,
        @Param("username2") username2: string,
    )
    {
        return this.friendsService.delete(username1, username2);
    }
}