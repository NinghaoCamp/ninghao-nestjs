import { Controller, Get, Req, Query } from '@nestjs/common';
import { Request } from 'express';

@Controller('posts')
export class PostsController {
  @Get()
  index(@Query() query) {
    console.log(query);
    
    return [
      {
        title: 'hello ~'
      }
    ];
  }
}
