// ==========================================
// REQUEST DTOs (Gửi lên Backend)
// ==========================================
// export interface LoginRequest {
//   email: string;
//   password: string;
// }

// export interface RegisterRequest {
//   email: string;
//   password: string;
// }

export interface AuthRequest {
  email: string;
  password: string;
}

// ==========================================
// RESPONSE DTOs (Nhận từ Backend)
// ==========================================
export interface UserResponse {
  _id: string;
  email: string;
  createdAt: string; // ISO date string
}

// export interface LoginResponse {
//   message: string;
//   user: UserResponse;
// }

// export interface RegisterResponse {
//   message: string;
//   user: UserResponse;
// }

export interface AuthResponse {
  message: string;
  user: UserResponse;
}

// ==========================================
// ERROR RESPONSE (Từ Backend)
// ==========================================
export interface ApiErrorResponse {
  statusCode: number;
  message: string | string[]; // Có thể là string hoặc array of strings
  error?: string;
}

// ==========================================
// FORM INPUTS (Cho React Hook Form)
// ==========================================
export interface LoginFormInputs {
  email: string;
  password: string;
}

export interface RegisterFormInputs {
  email: string;
  password: string;
  confirmPassword: string;
}