import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "src/users/entities/user.entity";
import { Repository } from "typeorm";
import { MatchCreationDto } from "./dto/match-creation.dto";
import { MatchEntity } from "./entity/match.entity";

@Injectable()
export class MatchesService {
    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
        @InjectRepository(MatchEntity)
        private matchRepositoy: Repository<MatchEntity>
    ) { }

    async create(user1_id: string, user2_id: string, matchCreationDto: MatchCreationDto) {
        const user1 = await this.userRepository.findOneBy({ user_id: user1_id });
        const user2 = await this.userRepository.findOneBy({ user_id: user1_id });

        if ( !user1 || !user2 ){
            return { msg: "One or more user does not exists!" };
        }
        const match = MatchEntity.create();

        match.user_1 = user1;
        match.user_2 = user2;
        match.begin_date = matchCreationDto.begin_date;
        await match.save();

        return { msg: "Match successfuly created!" };
    }
}