import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UserSigninDto {
  @ApiProperty({
    example: 'user@email.com',
    description: 'email for signin',
  })
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'yourSecurePassword',
    description: 'user password',
  })
  @IsNotEmpty()
  password: string;
}
