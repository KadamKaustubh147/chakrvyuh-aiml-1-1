import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext-http-jwt";
import api from "../AxiosInstance";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import zxcvbn from "zxcvbn";
import { CgSpinnerAlt } from "react-icons/cg";
import SideImg from "../components/SideImg";

// ✅ Schema for Djoser default user creation
const schema = z
  .object({
    username: z
      .string()
      .min(3, "Username must be at least 3 characters")
      .max(30, "Username must be at most 30 characters")
      .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"),
    email: z.string().email("Invalid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .refine((val) => zxcvbn(val).score >= 2, {
        message: "Password is too weak. Try adding symbols, numbers, or uppercase letters.",
      }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type FormFields = z.infer<typeof schema>;

const SignUp = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext)!;

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      const response = await api.post("accounts/users/", {
        username: data.username,
        email: data.email,
        password: data.password,
        re_password: data.confirmPassword,
      });

      if (response.status === 201) {
        navigate("/login"); // ✅ Removed alert, just redirect
      }
    } catch (error: any) {
      if (error.response?.data) {
        const serverErrors = error.response.data;
        Object.entries(serverErrors).forEach(([field, messages]) => {
          setError(field as keyof FormFields, {
            type: "server",
            message: (messages as string[]).join(" "),
          });
        });
      } else {
        alert("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="w-full flex bg-black h-[100vh]">
      <div className="w-full md:w-3/5 h-full flex items-center justify-center">
        <div className="w-full max-w-sm p-4 bg-white rounded-lg shadow-sm sm:p-6 md:p-8 dark:bg-black">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <h5 className="text-xl font-medium text-gray-900 text-center dark:text-white">
              Sign up to [platform]
            </h5>

            <div className="flex items-center my-4">
              <div className="flex-grow h-px bg-gray-500"></div>
              <span className="mx-2 text-gray-400 text-sm">or</span>
              <div className="flex-grow h-px bg-gray-500"></div>
            </div>

            {/* Username */}
            <div>
              <label
                htmlFor="username"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Username
              </label>
              <input
                id="username"
                {...register("username")}
                placeholder="jon_snow"
                className="outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-[#1c1d21] dark:border-gray-500 dark:text-white"
              />
              {errors.username && (
                <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                {...register("email")}
                placeholder="jon@example.com"
                className="outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-[#1c1d21] dark:border-gray-500 dark:text-white"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                {...register("password")}
                placeholder="••••••••"
                className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-[#1c1d21] block w-full p-2.5 dark:border-gray-500 dark:text-white"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Confirm password
              </label>
              <input
                id="confirmPassword"
                type="password"
                {...register("confirmPassword")}
                placeholder="••••••••"
                className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-[#1c1d21] block w-full p-2.5 dark:border-gray-500 dark:text-white"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full text-white bg-[#8f34c2] hover:bg-[#762ba1] cursor-pointer focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center flex items-center justify-center gap-2"
            >
              Create account {isSubmitting && <CgSpinnerAlt className="animate-spin text-xl" />}
            </button>

            {/* Login link */}
            <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
              Already have an account?{" "}
              <Link to="/login" className="text-[#8f34c2] hover:underline">
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>

      <SideImg />
    </div>
  );
};

export default SignUp;
