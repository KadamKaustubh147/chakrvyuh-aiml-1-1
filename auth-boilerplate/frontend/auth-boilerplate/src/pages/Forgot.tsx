import { useState } from "react";
import { MdKeyboardBackspace } from "react-icons/md";
import { HiKey } from "react-icons/hi2";
import { Link } from "react-router-dom";
import api from "../AxiosInstance"; // ✅ your configured Axios instance

const Forgot = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setStatus("loading");
    setMessage("");

    try {
      await api.post("/accounts/users/reset_password/", {
        email: email,
      });

      setStatus("success");
      setMessage("A reset link has been sent to your email address.");
    } catch (error: any) {
      console.error(error);
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="bg-black flex w-full h-screen items-center justify-center p-4">
      <div className="flex flex-col items-center text-white w-full max-w-sm space-y-4 p-6 rounded-lg shadow-md">
        <div className="flex justify-center w-full">
          <HiKey className="text-4xl" />
        </div>

        <h1 className="text-2xl font-semibold text-center pb-4">Forgot your password?</h1>
        <p className="text-center text-sm text-gray-300">
          A link will be sent to your email to help reset your password.
        </p>

        <form onSubmit={handleSubmit} className="w-full space-y-4">
          <div className="w-full">
            <label htmlFor="email" className="block mb-2 text-sm font-medium">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="outline-none border border-gray-600 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-[#1c1d21] placeholder-gray-400 text-white"
              placeholder="Enter your email address"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full text-white bg-[#8f34c2] hover:bg-[#762ba1] cursor-pointer focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            disabled={status === "loading"}
          >
            {status === "loading" ? "Sending..." : "Reset Password"}
          </button>
        </form>

        {message && (
          <p
            className={`text-sm ${
              status === "success" ? "text-green-400" : "text-red-400"
            } text-center`}
          >
            {message}
          </p>
        )}

        <Link to="/login" className="flex items-center text-sm hover:underline">
          <MdKeyboardBackspace className="mr-1" />
          Back to login
        </Link>
      </div>
    </div>
  );
};

export default Forgot;
