import { Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { PaginationQueryDto } from '../common/dto/pagination.query-dto';
import { Public } from '../common/decorators/public.decorator';
import { BlockedService } from './blocked.service';

@Controller('users')
export class BlockedController {
  constructor(private readonly blockedService: BlockedService) {}

  
  @Post(":user1_id/blocked/:user2_id")
  async create(
    @Param("user1_id") user1_id: string,
    @Param("user2_id") user2_id: string
  )
  {
    return this.blockedService.create(user1_id, user2_id);
  }

  
  @Get(":user_id/blocked")
  async findAll(
    @Param("user_id") user_id: string,
    @Query() paginationQueryDto: PaginationQueryDto
  ) 
  {
    return this.blockedService.findAll(user_id, paginationQueryDto);
  }

  
  @Delete(":user1_id/blocked/:user2_id")
  async delete(
    @Param("user1_id") user1_id: string,
    @Param("user2_id") user2_id: string
  )
  {
    return this.blockedService.delete(user1_id, user2_id);
  }
}
