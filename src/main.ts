import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

console.log(process.env);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('EOS API')
    .setDescription('Teste prático para desenvolvedores Back-End')
    .setVersion('0.0.1')
    .addBearerAuth()
    .addTag('EOS')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('Swagger', app, document);

  await app.listen(3000);
}
bootstrap();
