import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "src/users/entities/user.entity";
import { selectUserOption } from "src/users/options/user-select.option";
import { FindManyOptions, FindOptionsWhere, Repository } from "typeorm";
import { GetUsersQueryDTO } from "./dto/get-users-query.dto";
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

    async findAll(user_id: string, getUserQueryDto: GetUsersQueryDTO) {
        const user = await this.userRepository.findOneBy({ user_id });

        if ( user == null ){
            return null;
        }
        const whereOpts: FindOptionsWhere<FriendEntity> = {
            user_1: { user_id }
        };
        const opts: FindManyOptions<FriendEntity> = {
            select: {
                friend_id: true,
                user_2: selectUserOption,
                pending: true,
            },
            relations: {
                user_2: true
            }
        }
        if ( getUserQueryDto.limit )
            opts.take = getUserQueryDto.limit;
        if ( getUserQueryDto.skip )
            opts.skip = getUserQueryDto.skip;
        if ( getUserQueryDto.pending ){
            whereOpts.pending = getUserQueryDto.pending;
        }
        opts.where = whereOpts;
        return await this.friendRepository.find(opts);
    }
}