// src/schemas/auth.schema.ts
import { z } from "zod";

// ==========================================
// VALIDATION RULES - Khớp với backend
// ==========================================

// Email validation
const emailValidation = z
  .string()
  .min(1, "Vui lòng nhập email")
  .email("Email không hợp lệ");

// Password validation - Khớp với backend requirements
// Backend yêu cầu: 6 ký tự gồm chữ và số
const passwordValidation = z
  .string()
  .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
  .regex(/[0-9]/, "Mật khẩu phải có ít nhất 1 số");

// ==========================================
// LOGIN SCHEMA
// ==========================================
export const loginSchema = z.object({
  email: emailValidation,
  password: z.string().min(1, "Vui lòng nhập mật khẩu"),
  // Không cần validate password phức tạp khi login
});

// ==========================================
// REGISTER SCHEMA
// ==========================================
export const registerSchema = z
  .object({
    email: emailValidation,
    password: passwordValidation,
    confirmPassword: z.string().min(1, "Vui lòng nhập lại mật khẩu"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu nhập lại không khớp",
    path: ["confirmPassword"], // Hiển thị lỗi ở field confirmPassword
  });

// ==========================================
// TYPE EXPORTS - Để dùng trong components
// ==========================================
export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
