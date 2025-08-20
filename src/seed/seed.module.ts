import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { UsersModule } from 'src/users/users.module';
@Module({
  providers: [SeedService],
  imports: [UsersModule],
})
export class SeedModule {}
