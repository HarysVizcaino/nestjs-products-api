import { Injectable, Logger } from '@nestjs/common';
import * as contentful from 'contentful';
import { ConfigService } from '@nestjs/config';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ProductsService } from 'src/products/products.service';

@Injectable()
export class ContentfulService {
  private readonly logger = new Logger(ContentfulService.name);
  private client: contentful.ContentfulClientApi<any>;

  constructor(
    private readonly configService: ConfigService,
    private readonly productsService: ProductsService,
  ) {
    this.client = contentful.createClient({
      space: this.configService.get('CONTENTFUL_SPACE_ID'),
      accessToken: this.configService.get('CONTENTFUL_ACCESS_TOKEN'),
      environment: this.configService.get('CONTENTFUL_ENVIRONMENT'),
    });
  }

  @Cron(CronExpression.EVERY_HOUR)
  async syncProducts() {
    this.logger.log('Starting product sync from Contentful');
    try {
      const response = await this.client.getEntries({
        content_type: this.configService.get('CONTENTFUL_CONTENT_TYPE'),
      });

      const products = response.items.map((item) => ({
        contentfulId: item.sys.id,
        name: item.fields.name as string,
        category: item.fields.category as string,
        price: item.fields.price as number,
        description: item.fields.description as string,
      }));

      await this.productsService.syncProducts(products);
      console.log(products);
      this.logger.log(`Successfully synced ${products.length} products`);
    } catch (error) {
      this.logger.error('Error syncing products from Contentful', error);
    }
  }

  async manualSync() {
    await this.syncProducts();
  }
}
