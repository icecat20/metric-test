import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  const logger = new Logger();
  const config = new DocumentBuilder()
    .setTitle('Metric - tracking')
    .setDescription('The Metric API description')
    .setVersion('1.0')
    .addTag('Metric')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
  await app.listen(process.env.PORT ?? 3000);
  logger.log(`server is starting port ${process.env.PORT ?? 3000} `);
}
bootstrap();
