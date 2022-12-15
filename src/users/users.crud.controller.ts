import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import User from './entities/user.entity';
import { Crud, CrudController } from '@nestjsx/crud';

@Crud({
  model: {
    type: User,
  },
  query: {
    join: {

    },
    limit: 10,
  },
})
@Controller('users-crud')
export class UsersCrudController implements CrudController<User>{

  constructor(public service: UsersService) {
  }

  get base(): CrudController<User> {
    return this;
  }



}
