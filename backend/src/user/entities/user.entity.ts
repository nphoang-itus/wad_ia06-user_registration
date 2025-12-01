import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true }) // Tự động tạo createdAt và updatedAt
export class User {
  // Yêu cầu PDF: email (String, required, unique)
  @Prop({ required: true, unique: true })
  email: string;

  // Yêu cầu PDF: password (String, required)
  @Prop({ required: true })
  password: string;

  // Yêu cầu PDF: createdAt
  // @Schema({ timestamps: true }) ở trên đã tự động làm việc này rồi
  @Prop({ default: Date.now })
  createdAt: Date;
}

// Tạo Schema từ Class trên để Mongoose hiểu
export const UserSchema = SchemaFactory.createForClass(User);
