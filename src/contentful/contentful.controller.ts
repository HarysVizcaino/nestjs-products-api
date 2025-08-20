import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ContentfulService } from './contentful.service';
import { Public } from 'src/helpers/decorators/is-public.decorator';
import { AuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('Contentful')
@Controller('contentful')
@ApiBearerAuth()
@UseGuards(AuthGuard)
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
