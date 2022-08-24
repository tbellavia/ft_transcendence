import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "src/users/entities/user.entity";
import { selectUserOption } from "src/users/options/user-select.option";
import { FindManyOptions, FindOptionsWhere, Repository } from "typeorm";
import { GetUsersQueryDTO } from "./dto/get-friends.query.dto";
import { UpdatePendingDto } from "./dto/update-pending.dto";
import { FriendEntity } from "./entity/friend.entity";
import { selectFriendOptions } from "./options/select-friend.options";

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

        if ( !user ){
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

    async findOne(user1_id: string, user2_id: string){
        return await this.friendRepository.findOne({
            where: {
                user_1: { user_id: user1_id },
                user_2: { user_id: user2_id }
            },
            select: selectFriendOptions
        });
    }

    async update(user1_id: string, user2_id: string, updatePendingDto: UpdatePendingDto) {
        const friendship = await this.findOne(user1_id, user2_id);

        if ( !friendship )
            return null;
        friendship.pending = updatePendingDto.pending;
        await friendship.save();
        return {
            msg: "Update success!"
        };
    }

    async delete(user1_id: string, user2_id: string) {
        const result = await this.friendRepository.delete({
            user_1: { user_id: user1_id },
            user_2: { user_id: user2_id }
        });
        if ( result.affected == 0 )
            return { msg: "Relation not found!" };
        return { msg: "Relation deleted successfuly" };
    }
}