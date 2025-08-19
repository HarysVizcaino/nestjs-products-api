import { Module } from '@nestjs/common';
import { ContentfulService } from './contentful.service';
import { ContentfulController } from './contentful.controller';

@Module({
  controllers: [ContentfulController],
  providers: [ContentfulService],
})
export class ContentfulModule {}
