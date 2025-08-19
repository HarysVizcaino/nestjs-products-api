import { Expose } from 'class-transformer';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { UserResponseDto } from 'src/users/dto/user-response.dto';

export class AuthResponseDto {
  @IsString()
  @IsNotEmpty()
  @Expose()
  access_token: string;

  @IsInt()
  @IsOptional()
  @Expose()
  expires_in: number;

  @IsString()
  @IsOptional()
  @Expose()
  refresh_token: string;

  @Expose()
  user: UserResponseDto;

  constructor(access_token: string, user: UserResponseDto) {
    this.access_token = access_token;
    this.user = user;
  }
}
