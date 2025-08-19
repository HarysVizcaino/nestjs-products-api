import { Injectable } from '@nestjs/common';
import { CreateContentfulDto } from './dto/create-contentful.dto';
import { UpdateContentfulDto } from './dto/update-contentful.dto';

@Injectable()
export class ContentfulService {
  create(createContentfulDto: CreateContentfulDto) {
    return 'This action adds a new contentful';
  }

  findAll() {
    return `This action returns all contentful`;
  }

  findOne(id: number) {
    return `This action returns a #${id} contentful`;
  }

  update(id: number, updateContentfulDto: UpdateContentfulDto) {
    return `This action updates a #${id} contentful`;
  }

  remove(id: number) {
    return `This action removes a #${id} contentful`;
  }
}
