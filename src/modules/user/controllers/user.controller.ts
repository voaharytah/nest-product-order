import { Roles } from '@common/decorators/app.decorators';
import { UserService } from '@services/user/user.service';
import { UserDto } from '@data/dto/user.dto';
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
import { UserInfosPipe } from '@common/pipes/user-infos.pipe';
import { RolesGuard } from '@common/guards/roles.guard';
import { Request } from 'express';

@UseGuards(RolesGuard)
@Controller('api/user')
export class UserController {
  constructor(private userService: UserService) {}

  @Roles('admin')
  @Post('save')
  createUser(@Body(UserInfosPipe) userDto: UserDto) {
    return this.userService.saveUser(userDto);
  }

  @Get(':username')
  findUser(@Param('username') username: string) {
    return this.userService.findUser(username);
  }

  @Put('update')
  updateUser(@Body() userDto: UserDto) {
    return userDto;
  }

  @Delete('delete/:username')
  deleteUser(@Param('username') username: string) {
    return username;
  }
}
