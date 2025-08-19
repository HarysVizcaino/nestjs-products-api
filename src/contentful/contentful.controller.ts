import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ContentfulService } from './contentful.service';
import { CreateContentfulDto } from './dto/create-contentful.dto';
import { UpdateContentfulDto } from './dto/update-contentful.dto';

@Controller('contentful')
export class ContentfulController {
  constructor(private readonly contentfulService: ContentfulService) {}

  @Post()
  create(@Body() createContentfulDto: CreateContentfulDto) {
    return this.contentfulService.create(createContentfulDto);
  }

  @Get()
  findAll() {
    return this.contentfulService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contentfulService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateContentfulDto: UpdateContentfulDto) {
    return this.contentfulService.update(+id, updateContentfulDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contentfulService.remove(+id);
  }
}
