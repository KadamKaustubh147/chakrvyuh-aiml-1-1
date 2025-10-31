import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { MdKeyboardBackspace } from "react-icons/md";
import { HiKey } from "react-icons/hi2";
import api from "../AxiosInstance"; // your custom axios instance

const ActivateAccount = () => {
  const { uid, token } = useParams();
  const [status, setStatus] = useState<"idle" | "pending" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleActivate = async () => {
    setStatus("pending");
    try {
      await api.post("/accounts/users/activation/", { uid, token });
      setStatus("success");
      setMessage("✅ Your account has been successfully activated!");
    } catch (error) {
      setStatus("error");
      setMessage("❌ Activation link is invalid or has expired.");
    }
  };

  return (
    <div className="bg-black flex w-full h-screen items-center justify-center p-4">
      <div className="flex flex-col items-center text-white w-full max-w-sm space-y-4 p-6 rounded-lg shadow-md">
        <div className="flex justify-center w-full">
          <HiKey className="text-4xl" />
        </div>

        {status === "idle" && (
          <>
            <h1 className="text-2xl font-semibold text-center pb-4">Activate your account</h1>
            <p className="text-center text-sm text-gray-300">
              Click the button below to activate your account.
            </p>
            <button
              onClick={handleActivate}
              className="bg-white text-black px-4 py-2 rounded-md mt-4 hover:bg-gray-200 transition cursor-pointer"
            >
              Activate Account
            </button>
          </>
        )}

        {status === "pending" && (
          <>
            <h1 className="text-2xl font-semibold text-center pb-4">Activating your account…</h1>
            <p className="text-center text-sm text-gray-300">
              Please wait while we activate your account.
            </p>
          </>
        )}

        {status !== "idle" && status !== "pending" && (
          <>
            <h1 className="text-2xl font-semibold text-center pb-4">
              {status === "success" ? "Activation Successful!" : "Activation Failed"}
            </h1>
            <p className="text-center text-sm text-gray-300">{message}</p>
            {status === "success" && (
              <p className="text-center text-sm text-gray-300">
                You can now log in to access your account.
              </p>
            )}
            <Link to="/login" className="flex items-center text-sm hover:underline">
              <MdKeyboardBackspace className="mr-1" />
              Back to login
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default ActivateAccount;
