import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';

@Controller('posts')
export class PostsController {
  @Get()
  index(@Req() request: Request) {
    console.log(
      request.ip,
      request.hostname,
      request.method
    );
    
    return [
      {
        title: 'hello ~'
      }
    ];
  }
}
