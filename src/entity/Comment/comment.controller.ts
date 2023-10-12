import { Controller, Get } from '@nestjs/common';
import { Comment } from './comment.entity';
import { CommentService } from './comment.service';

@Controller('/comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get()
  async getAll(): Promise<Comment[]> {
    return await this.commentService.findAll();
  }
}
