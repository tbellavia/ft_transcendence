import { Module } from '@nestjs/common';
import { BlockedService } from './blocked.service';
import { BlockedController } from './blocked.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlockedEntity } from './entity/blocked.entity';
import { FriendsModule } from 'src/friends/friends.module';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([BlockedEntity]), FriendsModule, UsersService],
  controllers: [BlockedController],
  providers: [BlockedService],
  exports: [BlockedService]
})
export class BlockedModule { }
