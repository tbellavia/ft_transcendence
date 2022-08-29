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

    
    @Post(":user1_id/friends/:user2_id")
    async create(
        @Param("user1_id") user1_id: string,
        @Param("user2_id") user2_id: string
    ) 
    {
        return this.friendsService.create(user1_id, user2_id);
    }

    
    @Get(":user_id/friends")
    async findAll(
        @Param("user_id") user_id: string,
        @Query() getFriendsQueryDto: GetFriendsQueryDTO) 
    {
        return this.friendsService.findAll(user_id, getFriendsQueryDto);
    }

    
    @Get(":user1_id/friends/:user2_id")
    async findOne(
        @Param("user1_id") user1_id: string,
        @Param("user2_id") user2_id: string
    )
    {
        return this.friendsService.findOne(user1_id, user2_id);
    }

    
    @Put(":user1_id/friends/:user2_id")
    async update(
        @Param("user1_id") user1_id: string,
        @Param("user2_id") user2_id: string,
        @Body() updatePendingDto: UpdatePendingDto
    )
    {
        return this.friendsService.update(user1_id, user2_id, updatePendingDto);
    }

    
    @Delete(":user1_id/friends/:user2_id")
    async delete(
        @Param("user1_id") user1_id: string,
        @Param("user2_id") user2_id: string,
    )
    {
        return this.friendsService.delete(user1_id, user2_id);
    }
}