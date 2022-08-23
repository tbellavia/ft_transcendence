import { Controller, Get, Param, Post, Query } from "@nestjs/common";
import { Public } from "src/common/decorators/public.decorator";
import { GetUsersQueryDTO } from "./dto/get-users-query.dto";
import { FriendsService } from "./friends.service";

@Controller("users")
export class FriendsController {
    constructor(
        private friendsService: FriendsService
    ) {}

    @Public()
    @Post(":user1_id/friends/:user2_id")
    async create(
        @Param("user1_id") user1_id: string,
        @Param("user2_id") user2_id: string
    ) 
    {
        return this.friendsService.create(user1_id, user2_id);
    }

    @Public()
    @Get(":user_id/friends")
    async findAll(
        @Param("user_id") user_id: string,
        @Query() getUserQueryDto: GetUsersQueryDTO) 
    {
        return this.friendsService.findAll(user_id, getUserQueryDto);
    }
}