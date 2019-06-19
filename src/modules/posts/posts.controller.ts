import { Controller, Get, Req, Query, Headers, Param, Post, Body, HttpException, HttpStatus, ForbiddenException, UseFilters, UsePipes, ValidationPipe, ParseIntPipe, UseGuards, SetMetadata, UseInterceptors } from '@nestjs/common';
import { Request } from 'express';
import { CreatePostDto } from './post.dto';
import { DemoService } from './providers/demo/demo.service';
import { DemoFilter } from '../../core/filters/demo.filter';
import { DemoAuthGuard } from '../../core/guards/demo-auth.guard';
import { Roles } from '../../core/decorator/roles.decorator';
import { LoggingInterceptor } from '../../core/interceptors/logging.interceptor';
import { TransformInterceptor } from '../../core/interceptors/transform.interceptor';
import { ErrorsInterceptor } from '../../core/interceptors/errors.interceptor';

@Controller('posts')
// @UseFilters(DemoFilter)
// @UseGuards(DemoAuthGuard)
// @UseInterceptors(LoggingInterceptor)
export class PostsController {
  constructor(private readonly demoService: DemoService) { }

  @Get()
  // @UseInterceptors(TransformInterceptor)
  @UseInterceptors(ErrorsInterceptor)
  index(@Headers('authorization') headers) {
    throw new ForbiddenException();
    // return this.demoService.findAll();
  }

  @Get(':id')
  show(@Param('id', ParseIntPipe) id) {
    console.log('id:', typeof id);
    
    return {
      title: `Post ${id}`
    };
  }

  @Post()
  // @UseFilters(DemoFilter)
  @UsePipes(ValidationPipe)
  // @SetMetadata('roles', ['member'])
  @Roles('member')
  store(@Body() post: CreatePostDto) {
    // throw new HttpException('没有权限！', HttpStatus.FORBIDDEN);
    // throw new ForbiddenException('没有权限！');
    this.demoService.create(post);
  }
}