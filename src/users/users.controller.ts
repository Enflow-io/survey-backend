import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import User from './entities/user.entity';
import { LocalAuthenticationGuard } from '../auth/localAuthentication.guard';
import RequestWithUser from '../auth/requestWithUser.interface';
import JwtAuthenticationGuard from '../auth/jwt-authentication.guard';
import * as bcrypt from 'bcrypt';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}



  @Get('gen')
  async gen(){
    const hashedPassword = await bcrypt.hash("e.kashirina@rnbconsulting.ru", 10);
    return {
      pass: hashedPassword
    }
  }

  @Post()
  async create(@Body() createUserDto: User) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    return this.usersService.create({
      ...createUserDto,
      password: hashedPassword
    });
  }

  @Get('me')
  @UseGuards(JwtAuthenticationGuard)
  async getCurrentUser(@Req() request: RequestWithUser){
    const user = request.user;
    const foundUser = await User.findOneBy({
      id: user.id
    })
    return foundUser;
  }

  @Patch('me')
  @UseGuards(JwtAuthenticationGuard)
  async updateCurrentUser(@Req() request: RequestWithUser, @Body() updateUserDto: UpdateUserDto){
    const user = request.user;
    const foundUser = await User.findOneBy({
      id: user.id
    })
    await User.update(user.id, updateUserDto)
    return foundUser;
  }

  @Get()
  // @UseGuards(LocalAuthenticationGuard)
  findAll(@Query() { take, skip }) {
    return this.usersService.findAndCount(take, skip);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findById(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }



}
