import { forwardRef, Module } from '@nestjs/common';
import { BlockedService } from './blocked.service';
import { BlockedController } from './blocked.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlockedEntity } from './entity/blocked.entity';
import { FriendsModule } from 'src/friends/friends.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([BlockedEntity]), 
    UsersModule,
    forwardRef(() => FriendsModule)
  ],
  controllers: [BlockedController],
  providers: [BlockedService],
  exports: [BlockedService]
})
export class BlockedModule { }
