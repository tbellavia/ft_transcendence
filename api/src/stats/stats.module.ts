import { Module } from '@nestjs/common';
import { StatsService } from './stats.service';
import { StatsController } from './stats.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/entities/user.entity';
import { StatEntity } from './entities/stat.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, StatEntity])],
  controllers: [StatsController],
  providers: [StatsService]
})
export class StatsModule {}
