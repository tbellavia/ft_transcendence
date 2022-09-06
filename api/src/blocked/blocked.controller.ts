import { Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { PaginationQueryDto } from '../common/dto/pagination.query-dto';
import { Public } from '../common/decorators/public.decorator';
import { BlockedService } from './blocked.service';

@Controller('users')
export class BlockedController {
  constructor(private readonly blockedService: BlockedService) {}

  @Post(":username1/blocked/:username2")
  async create(
    @Param("username1") username1: string,
    @Param("username2") username2: string
  )
  {
    return this.blockedService.create(username1, username2);
  }

  @Get(":username/blocked")
  async findAll(
    @Param("username") username: string,
    @Query() paginationQueryDto: PaginationQueryDto
  ) 
  {
    return this.blockedService.findAll(username, paginationQueryDto);
  }

  @Delete(":username1/blocked/:username2")
  async delete(
    @Param("username1") username1: string,
    @Param("username2") username2: string
  )
  {
    return this.blockedService.delete(username1, username2);
  }
}
