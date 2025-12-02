// src/services/auth.service.ts
import axios, { AxiosError } from "axios";
import {
  type AuthRequest,
  type AuthResponse,
  type ApiErrorResponse,
} from "../types/auth.types";

// ==========================================
// AXIOS INSTANCE với base config
// ==========================================
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 10000, // 10 seconds timeout
  headers: {
    "Content-Type": "application/json",
  },
});

// ==========================================
// ERROR HANDLER - Xử lý lỗi từ backend
// ==========================================
export const handleApiError = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<ApiErrorResponse>;

    // Lỗi từ backend
    if (axiosError.response?.data?.message) {
      const message = axiosError.response.data.message;

      // NestJS validation errors trả về array
      if (Array.isArray(message)) {
        return message.join(", ");
      }

      return message;
    }

    // Lỗi network
    if (axiosError.code === "ECONNABORTED") {
      return "Yêu cầu hết thời gian chờ. Vui lòng thử lại.";
    }

    if (axiosError.code === "ERR_NETWORK") {
      return "Không thể kết nối tới server. Vui lòng kiểm tra kết nối.";
    }

    // Lỗi HTTP khác
    if (axiosError.response?.status) {
      switch (axiosError.response.status) {
        case 400:
          return "Dữ liệu không hợp lệ.";
        case 401:
          return "Email hoặc mật khẩu không chính xác.";
        case 409:
          return "Email đã được sử dụng.";
        case 500:
          return "Lỗi server. Vui lòng thử lại sau.";
        default:
          return "Đã có lỗi xảy ra. Vui lòng thử lại.";
      }
    }
  }

  // Lỗi không xác định
  return "Đã có lỗi xảy ra. Vui lòng thử lại.";
};

// ==========================================
// AUTH SERVICE - API Calls
// ==========================================
export const authService = {
  /**
   * Đăng nhập
   */
  login: async (data: AuthRequest): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>("/user/login", data);
    return response.data;
  },

  /**
   * Đăng ký
   */
  register: async (data: AuthRequest): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>(
      "/user/register",
      data
    );
    return response.data;
  },
};

// Export apiClient nếu cần dùng cho API khác
export default apiClient;