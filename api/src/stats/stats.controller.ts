import { Body, Controller, Delete, Get, Param, Post, Put, Req } from '@nestjs/common';
import { RequestWithUser } from 'src/auth/interfaces/requestWithUser.interface';
import { UpdateStatDto } from './dto/stats.dto';
import { StatsService } from './stats.service';

@Controller('users')
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @Post('/stats/me')
  async create(@Req() request: RequestWithUser) {
    return this.statsService.create(request.user.username);
  }

  @Get('/stats/me')
  async findOne(@Req() request: RequestWithUser) {
    return this.statsService.findOne(request.user.username);
  }

  // route for getting stats of other users
  @Get('/:target/stats')
  async GetTargetStats(@Param('target') target: string) {
    return this.statsService.findOne(target);
  }

  @Put('/stats/me')
  async update(
    @Req() request: RequestWithUser,
    @Body() updateStatDto: UpdateStatDto
  ) 
  {
    return this.statsService.update(request.user.username, updateStatDto);
  }

  @Delete('/stats/me')
  async remove(@Req() request: RequestWithUser){
    return this.statsService.remove(request.user.username);
  }
}
