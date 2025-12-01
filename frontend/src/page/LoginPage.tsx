import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<LoginFormInputs>();

  interface LoginFormInputs {
    email: string;
    password: string;
  }

  const onSubmit = (data: LoginFormInputs) => {
    console.log("Login data:", data);
    // Simulate login feedback
    alert("Đăng nhập giả lập thành công!");
    navigate("/"); // Về trang chủ
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-lg shadow-md border">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Đăng Nhập
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            {...register("email", { required: true })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Mật khẩu
          </label>
          <input
            type="password"
            {...register("password", { required: true })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700"
        >
          Đăng Nhập
        </button>
      </form>
      <p className="mt-4 text-center text-sm">
        Chưa có tài khoản?{" "}
        <Link to="/register" className="text-blue-600">
          Đăng ký ngay
        </Link>
      </p>
    </div>
  );
}
