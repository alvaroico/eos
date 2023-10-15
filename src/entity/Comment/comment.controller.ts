import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Comment } from './comment.entity';
import { CommentService } from './comment.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from 'src/guard/auth.guard';
import { ITokenJWT } from 'src/guard/auth.guard.interface';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@ApiBearerAuth()
@Controller('/comment')
@UseGuards(AuthGuard)
export class CommentController {
  constructor(
    private readonly commentService: CommentService,
    private readonly jwtService: JwtService,
  ) {}

  @Get()
  async getAll(): Promise<Comment[]> {
    return await this.commentService.findAll();
  }

  @Post()
  async create(
    @Body() body: { comment: Comment },
    @Req() request: Request,
  ): Promise<Comment> {
    return await this.commentService.create(
      body.comment,
      this.jwtService.decode(
        request.headers.authorization.split(' ')[1],
      ) as ITokenJWT,
    );
  }

  @Put('/:id')
  async editComment(
    @Body() body: { comment: Comment },
    @Req() request: Request,
    @Param() param: { id: string },
  ): Promise<Comment> {
    return await this.commentService.editComment(
      body.comment,
      this.jwtService.decode(
        request.headers.authorization.split(' ')[1],
      ) as ITokenJWT,
      param.id,
    );
  }

  @Delete('/:id')
  async deleteComment(
    @Req() request: Request,
    @Param() param: { id: string },
  ): Promise<Comment> {
    return await this.commentService.deleteComment(
      this.jwtService.decode(
        request.headers.authorization.split(' ')[1],
      ) as ITokenJWT,
      param.id,
    );
  }
}
