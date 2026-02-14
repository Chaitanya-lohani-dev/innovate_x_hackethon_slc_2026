"use client";
import React from "react";
import { login } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";


const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        
        try {
            const res = await login(email, password);
            if (res.status === 200){
                
                setTimeout(() => router.push('/job'), 2000);
            }
        }
        catch (err) {
            setError("Invalid email or password");
        }
    }
  return (
    <>

      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-800 via-orange-500 via-orange-500 to-orange-900 px-4">
        <div className="w-full max-w-md bg-black text-white p-8 rounded-2xl shadow-lg">

          <h2 className="text-3xl font-bold text-center mb-6">
            Login to Your Account
          </h2>

          <form className="space-y-5">

            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Password */}
            <div>
  <label className="block text-sm font-medium mb-1 text-white">
    Password
  </label>

  <div className="relative">
    <input
      type={showPassword ? "text" : "password"}
      placeholder="Enter your password"
      className="w-full px-4 py-2 pr-12 bg-black border border-gray-500 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
    />

    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-orange-500"
    >
      {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
    </button>
  </div>
</div>


            {/* Remember + Forgot */}
            <div className="flex justify-between items-center text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" />
                Remember me
              </label>

              <a href="#" className="text-orange-500 hover:underline">
                Forgot Password?
              </a>
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700 transition duration-300"
            >
              Login
            </button>

          </form>

          {/* Signup Link */}
          <p className="text-center text-sm mt-6">
            Don't have an account?{" "}
            <a href="/signup" className="text-orange-500 hover:underline">
              Sign Up
            </a>
          </p>

        </div>
      </div>
    </>
  );
};

export default Login;
