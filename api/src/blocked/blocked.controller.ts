import { Controller, Param, Post } from '@nestjs/common';
import { Public } from '../common/decorators/public.decorator';
import { BlockedService } from './blocked.service';

@Controller('users')
export class BlockedController {
  constructor(private readonly blockedService: BlockedService) {}

  @Public()
  @Post(":user1_id/blocked/:user2_id")
  async create(
    @Param("user1_id") user1_id: string,
    @Param("user2_id") user2_id: string
  )
  {
    return this.blockedService.create(user1_id, user2_id);
  }
}
