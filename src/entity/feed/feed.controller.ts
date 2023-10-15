import { Controller, Get } from '@nestjs/common';
import { TarefasService } from './feed.service';

@Controller('/feed')
export class FeedController {
  constructor(private readonly feedService: TarefasService) {}

  @Get()
  async getAll(): Promise<any> {
    return await this.feedService.findAll();
  }
}
