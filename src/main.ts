import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Webscraping')
    .setDescription('The webscraping API description')
    .setVersion('1.0')
    .addTag('webscrap')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  const port = process.env['PORT'] ?? 8000;
  await app.listen(port, () => console.log(`application is running on ${port} port`));
}
bootstrap();
