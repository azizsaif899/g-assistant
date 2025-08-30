import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  
  app.enableCors();
  
  const port = configService.get<number>('port') || 3000;
  const environment = configService.get<string>('environment') || 'development';
  
  await app.listen(port);
  
  console.log('🚀 G-Assistant API Server Started!');
  console.log(`📡 Server running on: http://localhost:${port}`);
  console.log(`🌍 Environment: ${environment}`);
  console.log(`⚡ Status: Ready to serve requests`);
}
bootstrap();
