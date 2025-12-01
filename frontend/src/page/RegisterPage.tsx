import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";

const registerSchema = z.object({
  email: z
    .string()
    .email("Email không hợp lệ")
    .min(1, "Bắt buộc phải điền Email"),
  password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const navigate = useNavigate();

  // 1. Setup React Query Mutation
  const mutation = useMutation({
    mutationFn: async (newUser: RegisterFormData) => {
      const response = await axios.post(
        "http://localhost:3000/user/register",
        newUser
      );
      return response.data;
    },
    onSuccess: (data) => {
      alert("Đăng ký thành công!");
      console.log("Server response:", data);
      navigate("/login");
    },
    onError: (error: { response?: { data?: { message?: string } } }) => {
      const message = error.response?.data?.message || "Có lỗi xảy ra";
      alert(`Đăng ký thất bại: ${message}`);
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
    // console.log("Dữ liệu form", data);
    // alert("Validation OK! Chuẩn bị gửi API: " + JSON.stringify(data));
    mutation.mutate(data);
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-lg shadow-md border">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Đăng Ký Tài Khoản
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Email Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            {...register("email")} // Đăng ký input này với Hook Form
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="example@email.com"
          />
          {/* Hiển thị lỗi nếu có */}
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Password Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Mật khẩu
          </label>
          <input
            type="password"
            {...register("password")}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="******"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={mutation.isPending} // Disable nút khi đang loading
          className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white
            ${
              mutation.isPending
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
        >
          {mutation.isPending ? "Đang xử lý..." : "Đăng Ký"}
        </button>

        {/* Hiển thị lỗi chung từ API nếu có */}
        {mutation.isError && (
          <div className="p-3 bg-red-100 text-red-700 rounded text-sm text-center">
            {/* Lấy message lỗi từ error object của axios */}
            {mutation.error?.response?.data?.message ||
              "Lỗi không xác định"}
          </div>
        )}
      </form>

      <p className="mt-4 text-center text-sm text-gray-600">
        Đã có tài khoản?{" "}
        <Link
          to="/login"
          className="font-medium text-blue-600 hover:text-blue-500"
        >
          Đăng nhập ngay
        </Link>
      </p>
    </div>
  );
}
