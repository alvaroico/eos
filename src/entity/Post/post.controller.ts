import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Req,
  Put,
  Param,
} from '@nestjs/common';
import { Post as PostEntity } from './post.entity';
import { PostService } from './post.service';
import { AuthGuard } from 'src/guard/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { ITokenJWT } from 'src/guard/auth.guard.interface';

@ApiBearerAuth()
@Controller('/post')
@UseGuards(AuthGuard)
export class PostController {
  constructor(
    private readonly postService: PostService,
    private readonly jwtService: JwtService,
  ) {}

  @Get('/:id')
  async getId(@Param() param: { id: string }): Promise<PostEntity> {
    return await this.postService.findOne(parseInt(param.id));
  }

  @Get()
  async getAll(): Promise<PostEntity[]> {
    return await this.postService.findAll();
  }

  @Post()
  async newPost(
    @Body() body: { post: PostEntity },
    @Req() request: Request,
  ): Promise<PostEntity> {
    return await this.postService.newPost(
      body.post,
      this.jwtService.decode(
        request.headers.authorization.split(' ')[1],
      ) as ITokenJWT,
    );
  }

  @Put()
  async updatePost(
    @Body() body: { post: PostEntity },
    @Req() request: Request,
  ): Promise<PostEntity | { mensagem: string }> {
    return await this.postService.update(
      body.post,
      this.jwtService.decode(
        request.headers.authorization.split(' ')[1],
      ) as ITokenJWT,
    );
  }
}
