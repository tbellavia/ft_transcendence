import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationQueryDto } from 'src/common/dto/pagination.query-dto';
import { selectUserOption } from 'src/users/options/user-select.option';
import { FindManyOptions, Repository } from 'typeorm';
import { UserEntity } from '../users/entities/user.entity';
import { BlockedEntity } from './entity/blocked.entity';

@Injectable()
export class BlockedService {
    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
        @InjectRepository(BlockedEntity)
        private blockedRepository: Repository<BlockedEntity>
    ) { }

    // TODO: Check if user already block the other user ?
    async create(username1: string, username2: string) {
        const exists = this.exists(username1, username2);
        if ( exists ) {
            return { msg: "User already blocked!" };
        }
        if ( username1 === username2 ){
            return { msg: "User cannot block himself" };
        }
        const user1 = await this.userRepository.findOneBy({ username: username1 });
        const user2 = await this.userRepository.findOneBy({ username: username2 });

        if ( !user1 || !user2 ){
            return { msg: "One or more user does not exist!" };
        }
        const blocked = BlockedEntity.create();

        blocked.user_1 = user1;
        blocked.user_2 = user2;
        await blocked.save();
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
        const user = await this.userRepository.findOneBy({ username });

        if ( !user ){
            return { msg: "User not found!" };
        }
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
            return { msg: `Blocked relationship does not exist between user id ${username1} and ${username2}` };
        }
        await blocked.remove();
        return { msg: "Delete block relationship successful" };
    }
}
