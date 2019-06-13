import { Controller, Get, Req, Query, Headers, Param, Post, Body } from '@nestjs/common';
import { Request } from 'express';

@Controller('posts')
export class PostsController {
  @Get()
  index(@Headers('authorization') headers) {
    console.log(headers);
    
    return [
      {
        title: 'hello ~'
      }
    ];
  }

  @Get(':id')
  show(@Param() params) {
    return {
      title: `Post ${params.id}`
    };
  }

  @Post()
  store(@Body() body) {
    console.log(body);
  }
}
