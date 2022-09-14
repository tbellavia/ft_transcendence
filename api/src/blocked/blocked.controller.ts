import { Controller, Delete, Get, Param, Post, Query, Req } from '@nestjs/common';
import { RequestWithUser } from 'src/auth/interfaces/requestWithUser.interface';
import { PaginationQueryDto } from '../common/dto/pagination.query-dto';
import { BlockedService } from './blocked.service';

// This block interfaces routes works only for auth user
@Controller('/users/blocked/me')
export class BlockedController {
  constructor(private readonly blockedService: BlockedService) {}

  @Post(':target')
  async create(
    @Req() request: RequestWithUser,
    @Param('target') target: string
  )
  {
    return this.blockedService.create(request.user.username, target);
  }

  @Get()
  async findAll(
    @Req() request: RequestWithUser,
    @Query() paginationQueryDto: PaginationQueryDto
  ) 
  {
    return this.blockedService.findAll(request.user.username, paginationQueryDto);
  }

  @Delete(':target')
  async delete(
    @Req() request: RequestWithUser,
    @Param('target') target: string
  )
  {
    return this.blockedService.delete(request.user.username, target);
  }
}
