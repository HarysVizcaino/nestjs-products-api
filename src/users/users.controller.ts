import {
  Controller,
  Post,
  Body,
  NotFoundException,
  UnauthorizedException,
  UseGuards,
  Get,
  BadRequestException,
  Param,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { UserResponseDto } from './dto/user-response.dto';
import { roleEnum } from 'src/helpers/enums/roles.enum';

import { apiResponse } from 'src/helpers/enums/api-response.enum';
import { AuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Public } from 'src/helpers/decorators/is-public.decorator';
import { PaginatedResponseDto } from 'src/commons/dto/paginated-response.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({
    description: `Create new user
    <br><br/>
    Allowed Roles: [
    ${roleEnum.ADMIN}
    ]
    `,
  })
  @ApiOkResponse({
    description: apiResponse.OK,
    type: UserResponseDto,
  })
  @ApiBadRequestResponse({
    description: apiResponse.BAD_REQUEST,
  })
  @ApiUnauthorizedResponse({
    description: apiResponse.UNAUTHORIZED,
    type: UnauthorizedException,
  })
  @ApiNotFoundResponse({
    description: apiResponse.NOT_FOUND,
    type: NotFoundException,
  })

  // @UseGuards(AuthGuard)
  @Public()
  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<UserResponseDto> {
    return this.usersService.create(createUserDto);
  }

  @ApiOperation({
    description: `List of users with pagination.
    <br><br/>
    Allowed Roles: [
    ${roleEnum.ADMIN}
    ]
    `,
  })
  @ApiOkResponse({
    description: apiResponse.OK,
    type: [UserResponseDto],
  })
  @ApiBadRequestResponse({
    description: apiResponse.BAD_REQUEST,
  })
  @ApiUnauthorizedResponse({
    description: apiResponse.UNAUTHORIZED,
    type: UnauthorizedException,
  })
  @UseGuards(AuthGuard)
  @Get()
  findAll(): Promise<PaginatedResponseDto<UserResponseDto>> {
    return this.usersService.findAll();
  }

  @ApiOperation({
    description: `Get user by Id.
    <br><br/>
    Allowed Roles: [
    ${roleEnum.ADMIN}
    ]
    `,
  })
  @ApiOkResponse({
    description: apiResponse.OK,
    type: UserResponseDto,
  })
  @ApiBadRequestResponse({
    description: apiResponse.BAD_REQUEST,
    type: BadRequestException,
  })
  @ApiUnauthorizedResponse({
    description: apiResponse.UNAUTHORIZED,
    type: UnauthorizedException,
  })
  @ApiNotFoundResponse({
    description: apiResponse.NOT_FOUND,
    type: NotFoundException,
  })
  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    if (!id) {
      throw new BadRequestException('ID must be a positive integer');
    }
    return this.usersService.findOne(id);
  }
}
