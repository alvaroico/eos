import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Req,
  Put,
  Param,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { Post as PostEntity } from './post.entity';
import { PostService } from './post.service';
import { AuthGuard } from 'src/guard/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Request, Express } from 'express';
import { JwtService } from '@nestjs/jwt';
import { ITokenJWT } from 'src/guard/auth.guard.interface';
import { FileInterceptor } from '@nestjs/platform-express/multer';

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

  @Get('/:id/likes')
  async likeId(@Param() param: { id: string }): Promise<PostEntity> {
    return await this.postService.likeId(parseInt(param.id));
  }

  @Get('/:id/dislikes')
  async dislikesId(@Param() param: { id: string }): Promise<PostEntity> {
    return await this.postService.dislikesId(parseInt(param.id));
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async newPost(
    @Body() body: { post: PostEntity },
    @Req() request: Request,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<PostEntity> {
    return await this.postService.newPost(
      body.post,
      this.jwtService.decode(
        request.headers.authorization.split(' ')[1],
      ) as ITokenJWT,
      file,
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
