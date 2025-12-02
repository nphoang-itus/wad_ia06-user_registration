import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

interface LoginFormInputs {
  email: string;
  password: string;
}

export default function LoginPage({
  onSwitch,
  onClose,
}: {
  onSwitch?: () => void;
  onClose?: () => void;
}) {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();

  const mutation = useMutation({
    mutationFn: async (data: LoginFormInputs) => {
      const response = await axios.post("http://localhost:3000/user/login", data);
      return response.data;
    },
    onSuccess: () => {
      alert("Đăng nhập thành công!");
      window.location.reload();
    },
    onError: (error: import("axios").AxiosError) => {
      const message = (error.response?.data as { message?: string })?.message || "Có lỗi xảy ra";
      alert(`Đăng nhập thất bại: ${message}`);
    },
  });

  const onSubmit = (data: LoginFormInputs) => {
    mutation.mutate(data);
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
          Đăng nhập
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Tham gia để trải nghiệm
        </p>
        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          {/* Email */}
          <div>
            <input
              type="email"
              placeholder="Email"
              autoComplete="email"
              {...register("email", { required: "Vui lòng nhập email" })}
              className={`w-full rounded-xl border ${
                errors.email ? "border-red-400" : "border-gray-300"
              } px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-red-400`}
            />
            {errors.email && (
              <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
            )}
          </div>
          {/* Password */}
          <div>
            <input
              type="password"
              placeholder="Mật khẩu"
              autoComplete="current-password"
              {...register("password", { required: "Vui lòng nhập mật khẩu" })}
              className={`w-full rounded-xl border ${
                errors.password ? "border-red-400" : "border-gray-300"
              } px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-red-400`}
            />
            {errors.password && (
              <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>
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
            Đăng nhập
          </button>
        </form>
        {/* Register link */}
        <p className="text-sm text-center mt-4">
          Chưa có tài khoản?{" "}
          <span
            className="font-bold text-red-600 cursor-pointer hover:underline"
            onClick={onSwitch}
          >
            Đăng ký ngay
          </span>
        </p>
      </div>
    </div>
  );
}