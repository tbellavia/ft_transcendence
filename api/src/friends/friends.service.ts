import { BadRequestException, forwardRef, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PaginationQueryDto } from "src/common/dto/pagination.query-dto";
import { UsersService } from "src/users/users.service";
import { FindManyOptions, FindOptionsWhere, Repository } from "typeorm";
import { GetFriendsQueryDTO } from "./dto/get-friends.query.dto";
import { UpdatePendingDto } from "./dto/update-pending.dto";
import { FriendEntity } from "./entity/friend.entity";
import { selectFriendOptions } from "./options/select-friend.options";
import { BlockedService } from "src/blocked/blocked.service";

@Injectable()
export class FriendsService {
    constructor(
        @InjectRepository(FriendEntity)
        private friendRepository: Repository<FriendEntity>,
        private readonly userService: UsersService,
        @Inject(forwardRef(() => BlockedService))
        private readonly blockedService: BlockedService,
    ) { }

    async create(username1: string, username2: string){
        const user1 = await this.userService.findOneByName(username1);
        const user2 = await this.userService.findOneByName(username2);

        if ( await this.exists(username1, username2) ){
            throw new BadRequestException('friendship already exists');
        }
        if ( await this.exists(username2, username1) ){
            throw new BadRequestException('friendship already exists');
        }
        if ( username1 == username2 ){
            throw new BadRequestException('User can not be friend with himself');
        }
        // if target blocked this user: don't create any friendship
        if (await this.blockedService.exists(username2, username1)){
            throw new BadRequestException('Friendship for this user is unvailable');
        }
        const friend = FriendEntity.create();

        friend.user_1 = user1;
        friend.user_2 = user2;
        await friend.save()
        return await this.findOne(username1, username2);
    }

    async findAll(username: string, getFriendsQueryDto: GetFriendsQueryDTO) {
        const user = await this.userService.findOneByName(username);

        const whereOpts = [
            { user_1: { username } },
            { user_2: { username } }
        ]
        
        const opts: FindManyOptions<FriendEntity> = {
            relations: {
                user_1: true,
                user_2: true
            }
        }
        if ( getFriendsQueryDto.limit )
            opts.take = getFriendsQueryDto.limit;
        if ( getFriendsQueryDto.skip )
            opts.skip = getFriendsQueryDto.skip;
        if ( getFriendsQueryDto.pending !== undefined ){
            whereOpts[0]["pending"] = getFriendsQueryDto.pending;
            whereOpts[1]["pending"] = getFriendsQueryDto.pending;
        }
        opts.where = whereOpts;
        return await this.friendRepository.find(opts);
    }

    async findFriendsRequests(username: string, paginationQueryDto: PaginationQueryDto) {
        const user = await this.userService.findOneByName(username);

        const opts: FindManyOptions<FriendEntity> = paginationQueryDto.getConfig<FriendEntity>(
            {
                user_2 : { username },
                pending: true
            },
            {
                user_1: true
            }
        )
        return await this.friendRepository.find(opts);
    }

    async findOne(username1: string, username2: string){
        const friendship = await this.friendRepository.findOne({
            where: {
                user_1: { username: username1 },
                user_2: { username: username2 }
            },
            relations: {
                user_2: true
            },
            select: selectFriendOptions
        });
        if (!friendship)
            throw new NotFoundException('Friendship relation not found');
        return friendship;
    }

    async update(username1: string, username2: string, updatePendingDto: UpdatePendingDto) {
        const friendship = await this.findOne(username2, username1);
        friendship.pending = updatePendingDto.pending;
        await friendship.save();
        return friendship;
    }

    async delete(username1: string, username2: string) {
        let friendship;
        try {
            friendship = await this.findOne(username1, username2);
        }
        catch {
            friendship = await this.findOne(username2, username1);
        }
        await friendship.remove();
        return { msg: "Relation deleted successfuly" };
    }

    async exists(username1: string, username2: string) {
        try {
            await this.findOne(username1, username2);
            return true;
        } catch (error) {
            return false;
        }
    }
}