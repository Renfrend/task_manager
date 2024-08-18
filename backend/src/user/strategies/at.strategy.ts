import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import configuration from '../../config/configuration';
import { UserService } from '../user.service';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class AtStrategy extends PassportStrategy(Strategy, 'access-token') {
  constructor(private readonly userService: UserService) {
    const config = configuration();

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.jwtAccess.secret,
      ignoreExpiration: false,
    });
  }

  async validate(payload: JwtPayload) {
    const { id } = payload;

    const user = await this.userService.findById(id);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
