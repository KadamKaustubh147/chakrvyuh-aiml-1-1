import { Link, useParams  } from "react-router-dom";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import zxcvbn from "zxcvbn";
import { useState } from "react";
import { HiKey } from "react-icons/hi2";
import { MdKeyboardBackspace } from "react-icons/md";
import api from "../AxiosInstance";

const schema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .refine((val) => zxcvbn(val).score >= 2, {
        message: "Password is too weak or common. Try adding symbols, numbers, or uppercase letters.",
      }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type FormFields = z.infer<typeof schema>;

const PasswordReset = () => {
  const { uid, token } = useParams();
  // const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  const [status, setStatus] = useState<"idle" | "pending" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    setStatus("pending");
    setMessage("");

    try {
      const response = await api.post("/accounts/users/reset_password_confirm/", {
        uid,
        token,
        new_password: data.password,
        re_new_password: data.confirmPassword,
      });

      if (response.status === 204 || response.status === 200) {
        setStatus("success");
        setMessage("✅ Your password has been successfully reset!");
      } else {
        setStatus("error");
        setMessage("❌ Unexpected response from server.");
      }
    } catch (error: any) {
      setStatus("error");

      if (error.response?.data) {
        const serverErrors = error.response.data;
        Object.entries(serverErrors).forEach(([field, messages]) => {
          setError(field as keyof FormFields, {
            type: "server",
            message: (messages as string[]).join(" "),
          });
        });
        setMessage("❌ Failed to reset password.");
      } else {
        setMessage("❌ Password reset link is invalid or has expired.");
      }
    }
  };

  return (
    <div className="bg-black flex w-full h-screen items-center justify-center p-4">
      <div className="flex flex-col items-center text-white w-full max-w-sm space-y-4 p-6 rounded-lg shadow-md">
        <div className="flex justify-center w-full">
          <HiKey className="text-4xl" />
        </div>

        {status === "idle" && (
          <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4">
            <h1 className="text-2xl font-semibold text-center">Reset your password</h1>
            <p className="text-sm text-center text-gray-300 mb-4">Enter your new password below.</p>

            <div>
              <label htmlFor="password" className="block text-sm mb-1">New password</label>
              <input
                type="password"
                id="password"
                {...register("password")}
                placeholder="••••••••"
                className="w-full p-2.5 rounded-lg bg-[#1c1d21] text-white border border-gray-600 focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.password && (
                <p className="text-sm text-red-400 mt-1">{errors.password.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm mb-1">Confirm password</label>
              <input
                type="password"
                id="confirmPassword"
                {...register("confirmPassword")}
                placeholder="••••••••"
                className="w-full p-2.5 rounded-lg bg-[#1c1d21] text-white border border-gray-600 focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.confirmPassword && (
                <p className="text-sm text-red-400 mt-1">{errors.confirmPassword.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-white text-black px-4 py-2 rounded-md mt-2 hover:bg-gray-200 transition w-full"
            >
              {isSubmitting ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        )}

        {status === "pending" && (
          <>
            <h1 className="text-2xl font-semibold text-center pb-4">Resetting password…</h1>
            <p className="text-center text-sm text-gray-300">Please wait while we reset your password.</p>
          </>
        )}

        {status !== "idle" && status !== "pending" && (
          <>
            <h1 className="text-2xl font-semibold text-center pb-4">
              {status === "success" ? "Password Reset Successful!" : "Password Reset Failed"}
            </h1>
            <p className="text-center text-sm text-gray-300">{message}</p>
            {status === "success" && (
              <p className="text-center text-sm text-gray-300">You can now log in with your new password.</p>
            )}
            <Link to="/login" className="flex items-center text-sm hover:underline mt-2">
              <MdKeyboardBackspace className="mr-1" />
              Back to login
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default PasswordReset;
