import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Public } from 'src/common/decorators/public.decorator';
import { UpdateStatDto } from './dto/stats.dto';
import { StatsService } from './stats.service';

@Controller('users')
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @Post("/:username/stats")
  async create(@Param("username") username: string) {
    return this.statsService.create(username);
  }

  @Get("/:username/stats")
  async findOne(@Param("username") username: string) {
    return this.statsService.findOne(username);
  }

  @Put("/:username/stats")
  async update(
    @Param("username") username: string,
    @Body() updateStatDto: UpdateStatDto
  ) 
  {
    return this.statsService.update(username, updateStatDto);
  }

  @Delete("/:username/stats")
  async remove(@Param("username") username: string){
    return this.statsService.remove(username);
  }
}
