import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import User from './entities/user.entity';
import RegisterDto from '../auth/register.dto';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

@Injectable()
export class UsersService extends TypeOrmCrudService<User> {
  constructor(@InjectRepository(User) repo) {
    super(repo);
  }


  async create(createUserDto: RegisterDto) {
    let user = User.create<User>(createUserDto)
    await user.save();
    return user;

  }

  async getById(id: number) {
    const user = await this.repo.findOne({
      where: {
        id
      }
    });
    if (user) {
      return user;
    }
    throw new HttpException('User with this id does not exist', HttpStatus.NOT_FOUND);
  }

  async findAndCount(take: number = 10, skip: number = 0) {
    const [data, total] = await User.findAndCount({ take, skip });
    return { data, total };
  }


  findAll() {
    return User.find();
  }

  async findById(id: number) {
    const user = await User.findOne({
      where: {id}
    });
    console.log(user)
    return user;
  }

  async findByMail(email: string) {
    const user = await User.findOne({
      where: { email: email }
    });
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    // const user = await User.findOne({id: id});

    const res = await User.update({ id }, updateUserDto)
    return res;
  }

  async remove(id: number) {
    try {
      await User.delete({ id })
      return true;
    } catch (e) {
      return e.toJSON();
    }

  }
}
