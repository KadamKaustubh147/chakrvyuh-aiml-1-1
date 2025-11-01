// import { Link, useNavigate } from "react-router-dom";
// import { useContext, useState } from "react";
// import { AuthContext } from "../context/AuthContext-http-jwt"; // ✅ FIXED
// import type { FormEvent } from "react";
// import SideImg from "../components/SideImg";
// import Silk from "../components/Silk";

// const Login = () => {
//     const { login } = useContext(AuthContext)!; // ✅ non-null since you know it will be provided
//     const [username, setUsername] = useState("");
//     const [password, setPassword] = useState("");
//     const navigate = useNavigate();

//     const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//         e.preventDefault();
//         const success = await login(username, password);

//         if (success) {
//             navigate("/app");
//         } else {
//             console.log("FAIL");
//         }
//     };

//     return (
//         <div className="w-full flex bg-black h-[100vh]">
//             {/* login container left side */}
//             <div className="w-full md:w-3/5 h-full flex items-center justify-center">
//                 <div className="w-full max-w-sm p-4 bg-white rounded-lg shadow-sm sm:p-6 md:p-8 dark:bg-black">
//                     <form className="space-y-6" onSubmit={handleSubmit}>
//                         <h5 className="text-xl font-medium text-gray-900 text-center dark:text-white">
//                             Login to [platform]
//                         </h5>

//                         {/* OR Line Separator */}
//                         <div className="flex items-center my-4">
//                             <div className="flex-grow h-px bg-gray-500"></div>
//                             <span className="mx-2 text-gray-400 text-sm">or</span>
//                             <div className="flex-grow h-px bg-gray-500"></div>
//                         </div>

//                         <div>
//                             <label
//                                 htmlFor="username"
//                                 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                             >
//                                 Your username
//                             </label>
//                             <input
//                                 type="text"
//                                 onChange={(e) => setUsername(e.target.value)}
//                                 name="username"
//                                 id="username"
//                                 className="outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-[#1c1d21] dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
//                                 placeholder="yourusername"
//                                 required
//                             />
//                         </div>

//                         <div>
//                             <label
//                                 htmlFor="password"
//                                 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                             >
//                                 Your password
//                             </label>
//                             <input
//                                 onChange={(e) => setPassword(e.target.value)}
//                                 type="password"
//                                 name="password"
//                                 id="password"
//                                 placeholder="••••••••"
//                                 className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-[#1c1d21] block w-full p-2.5 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
//                                 required
//                             />
//                         </div>

//                         <div className="flex items-start">
//                             <div className="flex items-start"></div>
//                             <Link
//                                 to="/forgot"
//                                 className="ms-auto text-sm text-[#8f34c2] hover:underline "
//                             >
//                                 Forgot Password?
//                             </Link>
//                         </div>

//                         <button
//                             type="submit"
//                             className="w-full text-white bg-[#8f34c2] hover:bg-[#762ba1] cursor-pointer focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
//                         >
//                             Login to your account
//                         </button>

//                         <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
//                             Not registered?{" "}
//                             <Link
//                                 to="/register"
//                                 className="text-[#8f34c2] hover:underline "
//                             >
//                                 Create account
//                             </Link>
//                         </div>
//                     </form>
//                 </div>
//             </div>

//             {/* Right side image */}
//             <SideImg />
//         </div>
//     );
// };

// export default Login;


import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext-http-jwt";
import type { FormEvent } from "react";
import Silk from "../components/Silk";
import logo from "./gdg-logo.png"; // 🔁 replace with your logo path

const Login = () => {
  const { login } = useContext(AuthContext)!;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const success = await login(username, password);
    if (success) navigate("/app");
    else console.log("FAIL");
  };

  return (
    <div className="relative flex items-center justify-center h-screen overflow-hidden bg-black text-white">
      {/* 🔴 Moving silk background */}
      <div className="absolute inset-0 z-0">
        <Silk speed={5} scale={1} color="#dc143c" noiseIntensity={1.5} rotation={0} />
      </div>

      {/* 🧱 Login Card */}
      <div className="relative z-10 w-full max-w-md px-8 py-10 rounded-2xl bg-gradient-to-b from-[#141414]/90 to-[#000]/90 border border-[#ff0033]/40 shadow-[0_0_40px_rgba(255,0,50,0.2)]">
        {/* 🪩 Logo + Title */}
        <div className="flex flex-col items-center mb-6">
          <img src={logo} alt="logo" className="w-16 h-16 mb-3" />
          <h1
            className="text-4xl font-bold text-yellow-400 tracking-wider"
            style={{ fontFamily: "'Bangers', sans-serif" }}
          >
            CHAKRAVYUH
          </h1>
          <p className="text-sm text-gray-300 tracking-widest mt-2 uppercase">
            GDG IIIT SRI CITY – AIML CHALLENGE
          </p>
        </div>

        {/* 🧾 Login Form */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="username"
              className="block mb-2 text-xs font-semibold text-yellow-400 uppercase tracking-wider"
            >
              Team ID
            </label>
            <input
              type="text"
              onChange={(e) => setUsername(e.target.value)}
              name="username"
              id="username"
              className="w-full px-3 py-2 rounded-md bg-[#1a1a1a] border border-gray-700 text-gray-100 placeholder-gray-500 focus:ring-2 focus:ring-[#ff0033] focus:border-transparent outline-none"
              placeholder="Enter your Team ID"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-xs font-semibold text-yellow-400 uppercase tracking-wider"
            >
              Password
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password"
              className="w-full px-3 py-2 rounded-md bg-[#1a1a1a] border border-gray-700 text-gray-100 placeholder-gray-500 focus:ring-2 focus:ring-[#ff0033] focus:border-transparent outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full mt-6 py-2.5 rounded-md bg-[#ff0033] hover:bg-[#ff1f4b] transition-all duration-300 font-semibold uppercase tracking-wider shadow-[0_0_20px_rgba(255,0,50,0.3)]"
          >
            Enter the Multiverse
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
