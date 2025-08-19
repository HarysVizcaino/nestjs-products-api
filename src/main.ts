import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Products API')
    .setDescription('Product management API with Contentful integration')
    .setVersion('1.0')
    .addTag('Users', 'User management and authentication')
    .addTag('Products', 'Product catalog management')
    .addTag('Auth', 'Authentication endpoints')
    .addTag('Contentful', 'Contentful CMS integration')
    .addTag('Reports', 'Analytics and reporting')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
  console.log(
    `Swagger documentation available at: ${await app.getUrl()}/api/docs`,
  );
}
bootstrap();
