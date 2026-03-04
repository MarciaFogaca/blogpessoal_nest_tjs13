import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 4000);

  process.env.TZ = '-3:00';

  app.useGlobalPipes(new ValidationPipe());

  // Habilitar CORS para permitir requisições de outros domínios, origens ou portas (necessário para o frontend acessar a API)//
  app.enableCors();
}
bootstrap();
