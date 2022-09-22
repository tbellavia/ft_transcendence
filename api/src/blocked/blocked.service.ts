import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationQueryDto } from 'src/common/dto/pagination.query-dto';
import { FriendsService } from 'src/friends/friends.service';
import { selectUserOption } from 'src/users/options/user-select.option';
import { UsersService } from 'src/users/users.service';
import { FindManyOptions, Repository } from 'typeorm';
import { BlockedEntity } from './entity/blocked.entity';
import { BlockRelationNotFoundException } from './exceptions/blockRelationNotFound.exception';
import { UserAlreadyBlockedException } from './exceptions/userAlreadyBlocked.exception';
import { UserBlockHimselfException } from './exceptions/userBlockHimself.exception';

@Injectable()
export class BlockedService {
    constructor(
        private readonly userService: UsersService,
        private friendsService: FriendsService,
        @InjectRepository(BlockedEntity)
        private blockedRepository: Repository<BlockedEntity>
    ) { }

    async create(username1: string, username2: string) {
        const exists = await this.exists(username1, username2);
        if ( exists ) {
            throw new UserAlreadyBlockedException(username2);
        }
        if ( username1 === username2 ){
            throw new UserBlockHimselfException();
        }
        
        const user1 = await this.userService.findOneByName(username1);
        const user2 = await this.userService.findOneByName(username2);

        const blocked = BlockedEntity.create();

        blocked.user_1 = user1;
        blocked.user_2 = user2;
        await blocked.save();

        // Delete friendship if existing and user blocked
        if (await this.friendsService.exists(username1, username2))
            this.friendsService.delete(username1, username2);
        else if (await this.friendsService.exists(username2, username1))
            this.friendsService.delete(username2, username1);

        return await this.findOne(username1, username2);
    }

    async findOne(username1: string, username2: string) {
        return await this.blockedRepository.findOne({
            where: {
                user_1: { username: username1 },
                user_2: { username: username2 }
            },
            relations: {
                user_1: true,
                user_2: true,
            },
            select: {
                user_1: selectUserOption,
                user_2: selectUserOption
            }
        });
    }

    // Can be used to check if user is blocked
    async exists(username1: string, username2: string) {
        return await this.findOne(username1, username2) !== null;
    }

    async findAll(username: string, paginationQueryDto: PaginationQueryDto){
        await this.userService.findOneByName(username);

        const opts: FindManyOptions<BlockedEntity> = paginationQueryDto.getConfig<BlockedEntity>(
            { user_1: { username } },
            { user_2: true },
            { user_2: selectUserOption }
        );
        return await this.blockedRepository.find(opts);
    }

    async delete(username1: string, username2: string) {
        const blocked = await this.findOne(username1, username2);

        if ( blocked == null ){
            throw new BlockRelationNotFoundException();
        }
        await blocked.remove();
        return { msg: "Delete block relationship successful" };
    }
}
