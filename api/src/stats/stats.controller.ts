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
  async findOne(@Req() request: RequestWithUser) { // TODO see if necessary eithan
    try {
      return this.statsService.findOne(request.user.username);
    }
    catch {
      return undefined;
    }
  }

  // route for getting stats of other users
  @Get('/:target/stats')
  async GetTargetStats(@Param('target') target: string) {  // TODO see if necessary eithan
    try {
      return this.statsService.findOne(target);
    }
    catch {
      return undefined;
    }
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
