import {
  Controller,
  Post,
  Body,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { apiResponse } from 'src/helpers/enums/api-response.enum';
import { Public } from 'src/helpers/decorators/is-public.decorator';
import { UserSigninDto } from './dto/user-sign-in.dto';
import { AuthResponseDto } from './dto/auth-response.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    description: 'SignIn user',
  })
  @ApiNotFoundResponse({
    description: apiResponse.NOT_FOUND,
    type: NotFoundException,
  })
  @ApiBadRequestResponse({
    description: apiResponse.BAD_REQUEST,
  })
  @ApiUnauthorizedResponse({
    description: apiResponse.UNAUTHORIZED,
    type: UnauthorizedException,
  })
  @Public()
  @Post('login')
  signIn(@Body() userSigninDto: UserSigninDto): Promise<AuthResponseDto> {
    return this.authService.signIn(userSigninDto);
  }
}
