import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'Jon',
    description: 'User first name',
  })
  @IsNotEmpty()
  @IsString()
  firstName: string;
  @ApiProperty({
    example: 'Doe',
    description: 'User last last name',
  })
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiProperty({
    example: 'JonDoe@platform.com',
    description: 'User first Email',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'someSecurePassword',
    description: 'User password',
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}
