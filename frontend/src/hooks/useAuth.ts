// src/hooks/useAuth.ts
import { useMutation } from "@tanstack/react-query";
import { authService, handleApiError } from "../services/auth.service";
import { type AuthRequest } from "../types/auth.types";

// ==========================================
// HOOK: useLogin
// ==========================================
export const useLogin = (
  onSuccess?: () => void,
  onError?: (error: string) => void
) => {
  return useMutation({
    mutationFn: (data: AuthRequest) => authService.login(data),
    onSuccess: (data) => {
      console.log("Login successful:", data);
      onSuccess?.();
    },
    onError: (error) => {
      const errorMessage = handleApiError(error);
      console.error("Login failed:", errorMessage);
      onError?.(errorMessage);
    },
  });
};

// ==========================================
// HOOK: useRegister
// ==========================================
export const useRegister = (
  onSuccess?: () => void,
  onError?: (error: string) => void
) => {
  return useMutation({
    mutationFn: (data: AuthRequest) => authService.register(data),
    onSuccess: (data) => {
      console.log("Registration successful:", data);
      onSuccess?.();
    },
    onError: (error) => {
      const errorMessage = handleApiError(error);
      console.error("Registration failed:", errorMessage);
      onError?.(errorMessage);
    },
  });
};
