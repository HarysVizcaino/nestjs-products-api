import { Module } from '@nestjs/common';
import { ContentfulService } from './contentful.service';
import { ContentfulController } from './contentful.controller';
import { ProductsModule } from 'src/products/products.module';

@Module({
  imports: [ProductsModule],
  controllers: [ContentfulController],
  providers: [ContentfulService],
  exports: [ContentfulService],
})
export class ContentfulModule {}
