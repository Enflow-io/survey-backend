import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { UsersService } from '../users/users.service';
import { jwtConstants } from './constants';
import { TokenPayload } from './tokenPayload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtConstants.secret,
      ignoreExpiration: true
    });
    // super({
    //   jwtFromRequest: ExtractJwt.fromExtractors([(request: Request) => {
    //     console.log(request.headers)
    //     return request?.cookies?.Authentication;
    //   }]),
    //   secretOrKey: jwtConstants.secret
    // });
  }

  async validate(payload: TokenPayload) {
    return this.userService.getById(payload.userId);
  }
}
