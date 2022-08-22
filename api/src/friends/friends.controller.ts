import { Controller, Param, Post } from "@nestjs/common";
import { Public } from "src/common/decorators/public.decorator";
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
}