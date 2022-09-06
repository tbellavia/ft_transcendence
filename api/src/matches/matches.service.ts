import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PaginationQueryDto } from "src/common/dto/pagination.query-dto";
import { UserEntity } from "src/users/entities/user.entity";
import { selectUserOption } from "src/users/options/user-select.option";
import { Repository } from "typeorm";
import { MatchCreationDto } from "./dto/match-creation.dto";
import { UpdateMatchDto } from "./dto/match-update.dto";
import { MatchEntity } from "./entity/match.entity";

@Injectable()
export class MatchesService {
    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
        @InjectRepository(MatchEntity)
        private matchRepositoy: Repository<MatchEntity>
    ) { }

    async create(username1: string, username2: string, matchCreationDto: MatchCreationDto) {
        const user1 = await this.userRepository.findOneBy({ username: username1 });
        const user2 = await this.userRepository.findOneBy({ username: username2 });

        if ( username1 == username2 ){
            return { msg: "User cannot play with himself" };
        }
        if ( !user1 || !user2 ){
            return { msg: "One or more user does not exists!" };
        }
        const match = MatchEntity.create();

        match.user_1 = user1;
        match.user_2 = user2;
        match.begin_date = matchCreationDto.begin_date;
        await match.save();
        return await this.findLatest(username1, username2);
    }

    async findOne(match_id: string) {
        const match = await this.matchRepositoy.findOne({
            where: { match_id },
            relations: {
                user_1: true,
                user_2: true
            },
            select: {
                user_1: selectUserOption,
                user_2: selectUserOption
            }
        });

        if ( !match ){
            return { msg: "Match does not exist" };
        }
        return match;
    }

    async findAll(paginationQueryDto: PaginationQueryDto){
        const opts = paginationQueryDto.getConfig<MatchEntity>(
            {},
            {
                user_1: true,
                user_2: true
            },
            {
                user_1: selectUserOption,
                user_2: selectUserOption
            }
        );
        return await this.matchRepositoy.find(opts);
    }

    async findAllByUsers(username1: string, username2: string, paginationQueryDto: PaginationQueryDto) {
        const user1 = await this.userRepository.findOneBy({ username: username1 });
        const user2 = await this.userRepository.findOneBy({ username: username2 });

        if ( username1 == username2 ){
            return { msg: "A match between the same user cannot exist" };
        }
        if ( !user1 || !user2 ){
            return { msg: "One or more user does not exists!" };
        }
        const opts = paginationQueryDto.getConfig<MatchEntity>(
            {
                user_1: { username: username1 },
                user_2: { username: username2 }    
            },
            {
                user_1: true,
                user_2: true
            },
            {
                user_1: selectUserOption,
                user_2: selectUserOption
            }
        );
        return await this.matchRepositoy.find(opts);
    }

    async findAllByUser(username: string, paginationQueryDto: PaginationQueryDto) {
        const user = await this.userRepository.findOneBy({ username });

        if ( !user ){
            return { msg: "User not found!" };
        }
        const opts = paginationQueryDto.getConfig<MatchEntity>(
            [
                { user_1: { username } },
                { user_2: { username } }
            ],
            {
                user_1: true,
                user_2: true
            },
            {
                user_1: selectUserOption,
                user_2: selectUserOption
            }
        );
        return await this.matchRepositoy.find(opts);
    }

    async update(match_id: string, updateMatchDto: UpdateMatchDto) {
        const match = await this.matchRepositoy.findOneBy({ match_id });

        if ( !match ){
            return { msg: "Match not found!" };
        }
        match.player_1_point = updateMatchDto.player_1_point;
        match.player_2_point = updateMatchDto.player_2_point;
        match.player_1_outcome = updateMatchDto.player_1_outcome;
        match.player_2_outcome = updateMatchDto.player_2_outcome;
        match.end_date = updateMatchDto.end_date;
        await match.save();
        return await this.findOne(match.match_id);
    }

    async remove(match_id: string) {
        const match = await this.matchRepositoy.findOneBy({ match_id });

        if ( !match ){
            return { msg: "Match does not exist" };
        }
        await match.remove();
        return { msg: "Match successfuly deleted" };
    }

    async findLatest(username1: string, username2: string){
        const matches = await this.matchRepositoy.find({
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
            },
            order: {
                match_id: 'DESC'
            }
        });

        if ( matches && matches.length > 0 ){
            return matches[0];
        }
    }
}