import { Injectable, UnauthorizedException } from '@nestjs/common';

import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { AuthResponseDto } from './dto/auth-response.dto';
import { UserSigninDto } from './dto/user-sign-in.dto';
import { HashHelper } from 'src/helpers/hashing-helpers';
import { isEmpty } from 'class-validator';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private hashHelper: HashHelper,
  ) {}

  async signIn(userSigninDto: UserSigninDto): Promise<AuthResponseDto> {
    const user = await this.usersService.findUserByEmail(userSigninDto.email);
    if (isEmpty(user)) {
      throw new UnauthorizedException('Invalid username or password');
    }

    const isPasswordValid = await this.hashHelper.comparePassword(
      userSigninDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid username or password');
    }
    const payload = {
      sub: user.id,
      username: user.email,
    };
    const token = await this.jwtService.signAsync(payload);
    return new AuthResponseDto(token, {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    });
  }
}
