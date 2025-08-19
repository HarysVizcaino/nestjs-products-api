import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserRepository } from './users.repository';
import { HashHelper } from 'src/helpers/hashing-helpers';
import { AuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  controllers: [UsersController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    UsersService,
    UserRepository,
    HashHelper,
  ],
  imports: [TypeOrmModule.forFeature([User])],
  exports: [UsersService, UserRepository, HashHelper],
})
export class UsersModule {}
