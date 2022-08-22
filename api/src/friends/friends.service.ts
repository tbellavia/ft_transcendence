import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "src/users/entities/user.entity";
import { Repository } from "typeorm";
import { FriendEntity } from "./entity/friend.entity";

@Injectable()
export class FriendsService {
    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
        @InjectRepository(FriendEntity)
        private friendRepository: Repository<FriendEntity>
    ) { }

    async create(user1_id: string, user2_id: string){
        const user1 = await this.userRepository.findOneBy({ user_id: user1_id });
        const user2 = await this.userRepository.findOneBy({ user_id: user2_id });

        if ( user1_id == user2_id ){
            console.log("User cannot add himself");
            return null;
        }
        if ( user1 == null || user2 == null ){
            console.log("One or more user does not exist!");
            return null;
        }
        const friend = FriendEntity.create();

        friend.user_1 = user1;
        friend.user_2 = user2;
        return await friend.save()
    }
}