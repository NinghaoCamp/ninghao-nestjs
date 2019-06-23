import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt, VerifiedCallback } from 'passport-jwt';
import { JwtPayload } from '../auth.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: '1AGy4bCUoECDZ4yI6h8DxHDwgj84EqStMNyab8nPChQ='
    });
  }

  async validate(payload: JwtPayload, done: VerifiedCallback) {
    console.log('payload: ', payload);

  }
}
