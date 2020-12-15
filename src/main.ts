import { ConfigService } from '@nestjs/config';
import { Logger } from './common/middlewares/app.middleware';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(Logger);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const config = app.get<any>(ConfigService);
  const port = config?.port ? config?.port : 3000;
  await app.listen(port);
  console.log(`App running on port ${port}...`);
}
bootstrap();
