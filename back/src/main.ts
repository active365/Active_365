import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors()
  app.useGlobalPipes(new ValidationPipe())

  const swaggerConfig = new DocumentBuilder()
                            .setTitle('DEMO Active365')
                            .setDescription('API for Active365')
                            .setVersion('1.0')
                            .addBearerAuth()
                            .build();
 const document = SwaggerModule.createDocument(app, swaggerConfig);                           
  SwaggerModule.setup('api', app, document);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
