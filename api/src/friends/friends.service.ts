import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "src/users/entities/user.entity";
import { selectUserOption } from "src/users/options/user-select.option";
import { FindManyOptions, FindOptionsWhere, Repository } from "typeorm";
import { GetFriendsQueryDTO } from "./dto/get-friends.query.dto";
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

        if ( await this.exists(user1_id, user2_id) ){
            console.log("Friendship already exists");
            return { msg: "Friendship already exists!" };
        }
        if ( user1_id == user2_id ){
            console.log("User cannot add himself");
            return { msg: "User cannot add himself" };
        }
        if ( user1 == null || user2 == null ){
            console.log("One or more user does not exist!");
            return { msg: "One or more user does not exist" };
        }
        const friend = FriendEntity.create();

        friend.user_1 = user1;
        friend.user_2 = user2;
        await friend.save()
        return await this.findOne(user1_id, user2_id);
    }

    async findAll(user_id: string, getFriendsQueryDto: GetFriendsQueryDTO) {
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
        if ( getFriendsQueryDto.limit )
            opts.take = getFriendsQueryDto.limit;
        if ( getFriendsQueryDto.skip )
            opts.skip = getFriendsQueryDto.skip;
        if ( getFriendsQueryDto.pending ){
            whereOpts.pending = getFriendsQueryDto.pending;
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
            relations: {
                user_2: true
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
        return await this.findOne(user1_id, user2_id);
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

    async exists(user1_id: string, user2_id: string) {
        return await this.findOne(user1_id, user2_id) !== undefined;
    }
}