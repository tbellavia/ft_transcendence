import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { UpdateStatDto } from './dto/stats.dto';
import { StatEntity } from './entities/stat.entity';

@Injectable()
export class StatsService {
    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
        @InjectRepository(StatEntity)
        private statRepository: Repository<StatEntity>
    ) { }

    async create(username: string) {
        const user = await this.userRepository.findOne({ where: { username } });

        if ( user == null ){
            return { msg: "User not found!" };
        }
        const stat = StatEntity.create();
        
        stat.user = user;
        await stat.save();
        return await this.findOne(username);
    }

    async update(username: string, updateStatDto: UpdateStatDto) {
        const stat = await this.findOne(username);

        if ( !stat ){
            return { msg: "Not found!" };
        }
        const { game_total, game_won, game_abandonned, rank } = updateStatDto;

        if ( game_total !== undefined )
            stat.game_total = game_total;
        if ( game_won !== undefined )
            stat.game_won = game_won;
        if ( game_abandonned !== undefined )
            stat.game_abandonned = game_abandonned;
        if ( rank !== undefined )
            stat.rank = rank;
        await stat.save();
        return stat;
    }

    async findOne(username: string) {
        const user = await this.userRepository.findOne({ where: { username } });

        if ( user == null ){
            return null;
        }
        return await this.statRepository.findOne({ 
            where: {
                user: { username }
            }
        });
    }

    async remove(username: string) {
        const stat = await this.findOne(username);

        if ( stat == null )
            return { msg: "Stat not found!" };
        await stat.remove();
        return { msg: "Stat successfuly removed!" };
    }
}
