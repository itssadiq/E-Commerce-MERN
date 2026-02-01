import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "./loginSchema";
import { Eye, EyeOff } from "lucide-react";
import { useLoginUserMutation } from "../../services/auth";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loginUser] = useLoginUserMutation();
  const [success, setSuccess] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: "onTouched",
  });

  const submitHandler = async (formData) => {
    try {
      setError("");
      setSuccess("");
      const res = await loginUser(formData).unwrap();
      reset();
      setSuccess(
        res?.message || res?.data?.message || "Registered successfully",
      );
    } catch (err) {
      console.error(err);
      setError(
        err?.data?.error ||
          err?.error ||
          err?.message ||
          "Login failed. Please try again.",
      );
    }
  };

  return (
    <form
      className="space-y-6"
      onSubmit={handleSubmit(submitHandler)}
      noValidate
    >
      {/* Email Input */}
      {error && <div className="text-red-600 mb-4">{error}</div>}
      {success && <div className="text-green-600 mb-4">{success}</div>}
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email address
        </label>
        <div className="mt-1">
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            onChange={() => {}}
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter your email"
            {...register("email")}
          />
        </div>
        {errors.email?.message && (
          <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      {/* Password Input */}
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Password
        </label>
        <div className="mt-1 relative">
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"} // Toggles type
            autoComplete="current-password"
            required
            onChange={() => {}}
            // Added 'pr-10' to make room for the icon
            className="appearance-none block w-full px-3 py-2 pr-10 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter your password"
            {...register("password")}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
          >
            {showPassword ? (
              <EyeOff size={20} strokeWidth={2} />
            ) : (
              <Eye size={20} strokeWidth={2} />
            )}
          </button>
        </div>
        {errors.password?.message && (
          <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Signing In..." : "Sign In"}
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
