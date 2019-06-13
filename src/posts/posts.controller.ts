import { Controller, Get, Req, Query, Headers } from '@nestjs/common';
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
}
