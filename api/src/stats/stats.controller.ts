import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Public } from 'src/common/decorators/public.decorator';
import { UpdateStatDto } from './dto/stats.dto';
import { StatsService } from './stats.service';

@Controller('users')
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  
  @Post("/:user_id/stats")
  async create(@Param("user_id") user_id: string) {
    return this.statsService.create(user_id);
  }

  
  @Get("/:user_id/stats")
  async findOne(@Param("user_id") user_id: string) {
    return this.statsService.findOne(user_id);
  }

  @Put("/:user_id/stats")
  async update(
    @Param("user_id") user_id: string,
    @Body() updateStatDto: UpdateStatDto
  ) 
  {
    return this.statsService.update(user_id, updateStatDto);
  }

  
  @Delete("/:user_id/stats")
  async remove(@Param("user_id") user_id: string){
    return this.statsService.remove(user_id);
  }
}
