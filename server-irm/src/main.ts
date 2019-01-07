import { NestFactory, NestApplication } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const hostDomain = `${AppModule.protocol}://${AppModule.host}:${AppModule.port}`;

  await app.listen(AppModule.port);
}
bootstrap();
