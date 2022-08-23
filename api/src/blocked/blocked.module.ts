import { Module } from '@nestjs/common';
import { BlockedService } from './blocked.service';
import { BlockedController } from './blocked.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../users/entities/user.entity';
import { BlockedEntity } from './entity/blocked.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BlockedEntity, UserEntity])],
  controllers: [BlockedController],
  providers: [BlockedService]
})
export class BlockedModule {}
