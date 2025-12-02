import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import { z } from "zod";

const registerSchema = z
  .object({
    email: z
      .string()
      .email("Email không hợp lệ")
      .min(1, "Vui lòng điền đầy đủ Email"),
    password: z
      .string()
      .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
      .regex(/^(?=.*[0-9])/, {
        message: "Mật khẩu phải có ít nhất 1 số",
      }),
    confirmPassword: z.string().min(1, "Vui lòng nhập lại mật khẩu"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu nhập lại không khớp",
    path: ["confirmPassword"],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterPage({
  onSwitch,
  onClose,
}: {
  onSwitch?: () => void;
  onClose?: () => void;
}) {
  const mutation = useMutation({
    mutationFn: async (newUser: { email: string; password: string }) => {
      const response = await axios.post(
        "http://localhost:3000/user/register",
        newUser
      );
      return response.data;
    },

    onSuccess: () => {
      alert("Đăng ký thành công");
    },

    onError: (error: { response?: { data?: { message?: string } } }) => {
      const message = error.response?.data?.message || "Có lỗi xảy ra";
      alert(`Đăng ký thất bại. Vui lòng thử lại: ${message}`);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterFormData) => {
    mutation.mutate({
      email: data.email,
      password: data.password,
    });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="relative bg-white rounded-[32px] shadow-2xl max-w-md w-full px-8 py-10">
        {/* Close button */}
        <button
          className="absolute top-4 right-4 text-2xl text-gray-400 hover:text-gray-700"
          onClick={onClose}
          aria-label="Đóng"
        >
          &times;
        </button>
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <img
            src="https://img.icons8.com/color/96/vietnam-circular.png"
            alt="Logo"
            className="w-12 h-12"
          />
        </div>
        {/* Title */}
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-2">
          Chào mừng bạn
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Đăng ký để tìm trải nghiệm
        </p>
        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          {/* Email */}
          <div>
            <input
              type="email"
              placeholder="Email"
              autoComplete="email"
              {...register("email")}
              className={`w-full rounded-xl border ${
                errors.email ? "border-red-400" : "border-gray-300"
              } px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-red-400`}
            />
            {errors.email && (
              <p className="text-xs text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          {/* Password */}
          <div>
            <input
              type="password"
              placeholder="Tạo mật khẩu"
              {...register("password")}
              className={`w-full rounded-xl border ${
                errors.password ? "border-red-400" : "border-gray-300"
              } px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-red-400`}
            />
            <p className="text-xs text-gray-500 mt-1">
              Sử dụng ít nhất 8 chữ cái, số
            </p>
            {errors.password && (
              <p className="text-xs text-red-500 mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          {/* Confirm Password */}
          <div>
            <input
              type="password"
              placeholder="Nhập lại mật khẩu"
              {...register("confirmPassword")}
              className={`w-full rounded-xl border ${
                errors.confirmPassword ? "border-red-400" : "border-gray-300"
              } px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-red-400`}
            />
            {errors.confirmPassword && (
              <p className="text-xs text-red-500 mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
          {/* Submit */}
          <button
            type="submit"
            disabled={mutation.isPending}
            className={`w-full mt-2 py-3 rounded-full text-white font-bold text-lg transition
              ${
                mutation.isPending
                  ? "bg-red-300 cursor-wait"
                  : "bg-red-600 hover:bg-red-700"
              }`}
          >
            Tiếp tục
          </button>
        </form>
        {/* Policy */}
        <p className="text-xs text-gray-500 mt-4 text-center">
          Bằng cách tiếp tục, bạn đồng ý với{" "}
          <a href="#" className="underline hover:text-red-600">
            Điều khoản dịch vụ
          </a>{" "}
          và xác nhận bạn đã đọc{" "}
          <a href="#" className="underline hover:text-red-600">
            Chính sách quyền riêng tư
          </a>
          .
        </p>
        {/* Đăng nhập link */}
        <p className="text-sm text-center mt-4">
          Bạn đã có tài khoản?{" "}
          <span
            className="font-bold text-red-600 cursor-pointer hover:underline"
            onClick={onSwitch}
          >
            Đăng nhập
          </span>
        </p>
      </div>
    </div>
  );
}
