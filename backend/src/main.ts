import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 2. Kích hoạt Validation toàn cục
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Tự động loại bỏ các field thừa không có trong DTO (Bảo mật)
      forbidNonWhitelisted: true, // Báo lỗi nếu gửi field lạ lên
    }),
  );
  // 3. Enable CORS để Frontend React gọi được
  app.enableCors({
    // CHỈ cho phép domain này gọi API
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',

    // Chỉ cho phép các HTTP methods này: Đăng nhập/ Đăng ký dùng POST
    methods: ['POST'],

    // Cho phép gửi cookies/authentication headers
    credentials: true,

    // Chỉ cho phép gửi các headers này
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap().catch((err) => {
  console.error('Error during application bootstrap:', err);
});
