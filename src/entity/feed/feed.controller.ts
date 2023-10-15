import { Controller, Get, UseGuards } from '@nestjs/common';
import { FeedService } from './feed.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from 'src/guard/auth.guard';

@ApiBearerAuth()
@Controller('/feed')
@UseGuards(AuthGuard)
export class FeedController {
  constructor(private readonly feedService: FeedService) {}

  @Get()
  async getAll(): Promise<any> {
    return await this.feedService.findAll();
  }
}
