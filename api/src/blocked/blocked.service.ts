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
    async create(user1_id: string, user2_id: string) {
        if ( user1_id === user2_id ){
            return { msg: "User cannot block himself" };
        }
        const user1 = await this.userRepository.findOneBy({ user_id: user1_id });
        const user2 = await this.userRepository.findOneBy({ user_id: user2_id });

        if ( !user1 || !user2 ){
            return { msg: "One or more user does not exist!" };
        }
        const blocked = BlockedEntity.create();

        blocked.user_1 = user1;
        blocked.user_2 = user2;
        await blocked.save();
        return { msg: "Blocked successful" };
    }

    async findAll(user_id: string, paginationQueryDto: PaginationQueryDto){
        const user = await this.userRepository.findOneBy({ user_id });

        if ( !user ){
            return { msg: "User not found!" };
        }
        const opts: FindManyOptions<BlockedEntity> = paginationQueryDto.getConfig<BlockedEntity>(
            { user_1: { user_id } },
            { user_2: true },
            { user_2: selectUserOption }
        );
        return await this.blockedRepository.find(opts);
    }

    async delete(user1_id: string, user2_id: string) {
        const result = await this.blockedRepository.delete({
            user_1: { user_id: user1_id },
            user_2: { user_id: user2_id }
        });
        if ( result.affected == 0 ){
            return { msg: `Blocked relationship does not exist between user id ${user1_id} and ${user2_id}` };
        }
        return { msg: "Delete block relationship successful" };
    }
}
