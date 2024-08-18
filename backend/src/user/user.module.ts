import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

import { User } from './user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AtStrategy } from './strategies/at.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({}),
    ConfigModule,
  ],
  providers: [UserService, AtStrategy],
  controllers: [UserController],
  exports: [UserService, AtStrategy], // Це дозволяє використовувати сервіс в інших модулях
})
export class UserModule {}
