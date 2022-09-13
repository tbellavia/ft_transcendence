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

    async create(username1: string, username2: string){
        const user1 = await this.userRepository.findOneBy({ username: username1 });
        const user2 = await this.userRepository.findOneBy({ username: username2 });

        if ( await this.exists(username1, username2) ){
            console.log("Friendship already exists");
            return { msg: "Friendship already exists!" };
        }
        if ( username1 == username2 ){
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
        return await this.findOne(username1, username2);
    }

    async findAll(username: string, getFriendsQueryDto: GetFriendsQueryDTO) {
        const user = await this.userRepository.findOneBy({ username });

        if ( !user ){
            return null;
        }
        const whereOpts: FindOptionsWhere<FriendEntity> = {
            user_1: { username }
        };
        const opts: FindManyOptions<FriendEntity> = {
            relations: {
                user_2: true
            }
        }
        if ( getFriendsQueryDto.limit )
            opts.take = getFriendsQueryDto.limit;
        if ( getFriendsQueryDto.skip )
            opts.skip = getFriendsQueryDto.skip;
        if ( getFriendsQueryDto.pending !== undefined ){
            whereOpts.pending = getFriendsQueryDto.pending;
        }
        opts.where = whereOpts;
        return await this.friendRepository.find(opts);
    }

    async findOne(username1: string, username2: string){
        return await this.friendRepository.findOne({
            where: {
                user_1: { username: username1 },
                user_2: { username: username2 }
            },
            relations: {
                user_2: true
            },
            select: selectFriendOptions
        });
    }

    async update(username1: string, username2: string, updatePendingDto: UpdatePendingDto) {
        const friendship = await this.findOne(username1, username2);

        if ( friendship == null )
            return { msg: "Friendship not found!" };
        friendship.pending = updatePendingDto.pending;
        await friendship.save();
        return friendship;
    }

    async delete(username1: string, username2: string) {
        const friendship = await this.findOne(username1, username2);

        if ( friendship == null )
            return { msg: "Relation not found!" };
        await friendship.remove();
        return { msg: "Relation deleted successfuly" };
    }

    async exists(username1: string, username2: string) {
        return await this.findOne(username1, username2) !== null;
    }
}