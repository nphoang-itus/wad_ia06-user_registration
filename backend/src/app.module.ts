import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    // A. Load biến môi trường từ file .env
    ConfigModule.forRoot({
      isGlobal: true, // Để dùng được ở mọi nơi mà không cần import lại
    }),

    // B. Cấu hình kết nối MongoDB bất đồng bộ (Async)
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
      }),
      inject: [ConfigService],
    }),

    UserModule,
  ],
})
export class AppModule {}
