import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
}
