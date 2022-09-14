import { Module } from '@nestjs/common';
import { StatsService } from './stats.service';
import { StatsController } from './stats.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatEntity } from './entities/stat.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([StatEntity]), UsersModule],
  controllers: [StatsController],
  providers: [StatsService]
})
export class StatsModule {}
