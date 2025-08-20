import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class SeedService {
  constructor(private readonly usersService: UsersService) {}

  async seed() {
    const user = await this.usersService.create({
      email: 'test@test.com',
      password: 'test',
      firstName: 'Test',
      lastName: 'Test',
    });

    console.log(user);
  }
}
