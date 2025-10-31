import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext-http-jwt"; // ✅ FIXED
import type { FormEvent } from "react";
import SideImg from "../components/SideImg";

const Login = () => {
    const { login } = useContext(AuthContext)!; // ✅ non-null since you know it will be provided
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const success = await login(username, password);

        if (success) {
            navigate("/app");
        } else {
            console.log("FAIL");
        }
    };

    return (
        <div className="w-full flex bg-black h-[100vh]">
            {/* login container left side */}
            <div className="w-full md:w-3/5 h-full flex items-center justify-center">
                <div className="w-full max-w-sm p-4 bg-white rounded-lg shadow-sm sm:p-6 md:p-8 dark:bg-black">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <h5 className="text-xl font-medium text-gray-900 text-center dark:text-white">
                            Login to [platform]
                        </h5>

                        {/* OR Line Separator */}
                        <div className="flex items-center my-4">
                            <div className="flex-grow h-px bg-gray-500"></div>
                            <span className="mx-2 text-gray-400 text-sm">or</span>
                            <div className="flex-grow h-px bg-gray-500"></div>
                        </div>

                        <div>
                            <label
                                htmlFor="username"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Your username
                            </label>
                            <input
                                type="text"
                                onChange={(e) => setUsername(e.target.value)}
                                name="username"
                                id="username"
                                className="outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-[#1c1d21] dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                placeholder="yourusername"
                                required
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="password"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Your password
                            </label>
                            <input
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                name="password"
                                id="password"
                                placeholder="••••••••"
                                className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-[#1c1d21] block w-full p-2.5 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                required
                            />
                        </div>

                        <div className="flex items-start">
                            <div className="flex items-start"></div>
                            <Link
                                to="/forgot"
                                className="ms-auto text-sm text-[#8f34c2] hover:underline "
                            >
                                Forgot Password?
                            </Link>
                        </div>

                        <button
                            type="submit"
                            className="w-full text-white bg-[#8f34c2] hover:bg-[#762ba1] cursor-pointer focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                        >
                            Login to your account
                        </button>

                        <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                            Not registered?{" "}
                            <Link
                                to="/register"
                                className="text-[#8f34c2] hover:underline "
                            >
                                Create account
                            </Link>
                        </div>
                    </form>
                </div>
            </div>

            {/* Right side image */}
            <SideImg />
        </div>
    );
};

export default Login;
