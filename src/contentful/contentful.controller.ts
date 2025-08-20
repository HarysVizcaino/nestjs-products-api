import { Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ContentfulService } from './contentful.service';
import { Public } from 'src/helpers/decorators/is-public.decorator';

@ApiTags('Contentful')
@Controller('contentful')
export class ContentfulController {
  constructor(private readonly contentfulService: ContentfulService) {}

  @Get('sync')
  syncProducts() {
    return this.contentfulService.syncProducts();
  }

  @Post('manual-sync')
  @Public()
  manualSync() {
    return this.contentfulService.manualSync();
  }
}
