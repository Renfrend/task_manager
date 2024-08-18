import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { compare, hash } from 'bcrypt';

import { User } from './user.entity';
import { RegisterUserDto } from './dto/register-user.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { AuthUser } from './interfaces/auth-user.interface';
import configuration from '../config/configuration';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerUserDto: RegisterUserDto): Promise<AuthUser> {
    const userByUsername = await this.userRepository.findOneBy({
      username: registerUserDto.username,
    });

    if (userByUsername) {
      throw new UnauthorizedException('This nickname is already taken!!!');
    }

    const hashedPassword = await hash(registerUserDto.password, 10);

    const newUser = this.userRepository.create({
      email: registerUserDto.email,
      username: registerUserDto.username,
      password: hashedPassword,
    });

    await this.userRepository.save(newUser);

    const accessToken = await this.generateAccessToken(newUser);

    return { username: newUser.username, email: newUser.email, accessToken };
  }

  async login(userLoginDto: UserLoginDto): Promise<AuthUser> {
    const user = await this.userRepository.findOneBy({
      username: userLoginDto.username,
    });

    if (!user) {
      throw new UnauthorizedException('Incorrect username or password!!!');
    }

    if (!(await compare(userLoginDto.password, user.password))) {
      throw new UnauthorizedException('Incorrect username or password!!!');
    }

    const accessToken = await this.generateAccessToken(user);

    return { username: user.username, email: user.email, accessToken };
  }

  async refreshToken(userId: number): Promise<AuthUser> {
    const user = await this.findById(userId);

    if (!user) {
      throw new UnauthorizedException();
    }

    const accessToken = await this.generateAccessToken(user);

    return { username: user.username, email: user.email, accessToken };
  }

  findById(id: number): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }

  private generateAccessToken(user: User): Promise<string> {
    const config = configuration();

    const payload: JwtPayload = { id: user.id };

    return this.jwtService.signAsync(payload, {
      secret: config.jwtAccess.secret,
      expiresIn: config.jwtAccess.expiresIn,
    });
  }
}
