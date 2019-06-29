import { Controller, Post, Body, Get, Param, UseInterceptors, ClassSerializerInterceptor, Put, ParseIntPipe, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto, UpdatePasswordDto } from './user.dto';
import { AuthGuard } from '@nestjs/passport';
import { AccessGuard } from '../../core/guards/access.guard';
import { Permissions } from '../../core/decorators/permissions.decorator';
import { UserRole } from '../../core/enums/user-role.enum';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService
  ) { }

  @Post()
  async store(@Body() data: UserDto) {
    return await this.userService.store(data);
  }

  @Get(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  async show(@Param('id') id: string) {
    return await this.userService.show(id);
  }

  @Put(':id/password')
  @UseInterceptors(ClassSerializerInterceptor)
  async updatePassword(@Param('id') id: string, @Body() data: UpdatePasswordDto) {
    return await this.userService.updatePassword(id, data);
  }

  @Get(':id/liked')
  @UseInterceptors(ClassSerializerInterceptor)
  async liked(@Param('id', ParseIntPipe) id: number) {
    return this.userService.liked(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard(), AccessGuard)
  @Permissions({ role: UserRole.ADMIN })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UserDto
  ) {
    return await this.userService.update(id, data);
  }
}
