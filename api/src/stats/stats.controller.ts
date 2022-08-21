import { Controller, Get, Param, Post } from '@nestjs/common';
import { Public } from 'src/common/decorators/public.decorator';
import { StatsService } from './stats.service';

@Controller('users')
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @Public()
  @Post("/:user_id/stats")
  async create(@Param("user_id") user_id: string) {
    return this.statsService.create(user_id);
  }

  @Public()
  @Get("/:user_id/stats")
  async findOne(@Param("user_id") user_id: string) {
    return this.statsService.findOne(user_id);
  }
}
