import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { FriendEntity } from './entity/friend.entity';
import { FriendsController } from './friends.controller';
import { FriendsService } from './friends.service';
import { BlockedModule } from "src/blocked/blocked.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([FriendEntity]), 
    UsersModule, 
    forwardRef(() => BlockedModule)
  ],
  providers: [FriendsService],
  exports: [FriendsService],
  controllers: [FriendsController],
})
export class FriendsModule {}
