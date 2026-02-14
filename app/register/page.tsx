"use client";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { registerSchema } from "@/lib/validation";
import { register } from "@/lib/api";
const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [error, setError] = useState<string | null>(null);
                            
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = {
            name: formData.get("name") as string,
            email: formData.get("email") as string,
            DOB: formData.get("DOB") as string,
            password: formData.get("password") as string,
            role: formData.get("role") as string,
            organisation: formData.get("organisation") as string,
        };

        const validation = registerSchema.safeParse(data);
        if (!validation.success) {
            setError(validation.error.issues[0].message);
            return;
        }

        // proceed with successful registration (e.g., send to API)
        // console.log("Validated data:", validation.data);
        const res = await register(data);
        if (res.status === 201) {
            setError("Registration successful! Redirecting to login...");
            setTimeout(() => {
                window.location.href = "/login";
            }, 2000);
        } else {
            setError("Registration failed. Please try again.");
        }
    }

    return (
        <>

            <div className="min-h-screen flex items-center justify-center 
      bg-gradient-to-br from-black via-gray-900 to-gray-800 px-4">

                <div className="w-full max-w-md bg-black p-8 rounded-2xl shadow-xl">

                    <h2 className="text-3xl font-bold text-white text-center mb-6">
                        Create Account
                    </h2>

                    <form className="space-y-5" onSubmit={handleSubmit}>

                        {/* Full Name */}
                        <div>
                            <label className="block text-sm text-gray-300 mb-1">
                                Full Name
                            </label>
                            <input
                                name="name"
                                type="text"
                                placeholder="Enter your name"
                                className="w-full px-4 py-2 bg-black border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm text-gray-300 mb-1">
                                Email
                            </label>
                            <input
                                name="email"
                                type="email"
                                placeholder="Enter your email"
                                className="w-full px-4 py-2 bg-black border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                            />
                        </div>
                        {/* Date of Birth */}
                        <div>
                            <label className="block text-sm text-gray-300 mb-1">
                                Date of Birth
                            </label>
                            <input
                                name="DOB"
                                type="date"
                                className="w-full px-4 py-2 bg-black border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                            />
                        </div>
                        {/* Role Selection */}
                        <div>
                            <label className="block text-sm text-gray-300 mb-2">
                                Are you a Student or HR?
                            </label>

                            <div className="flex gap-6 text-gray-300">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="role"
                                        value="student"
                                        className="accent-orange-500"
                                    />
                                    Student
                                </label>
                                

                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="role"
                                        value="hr"
                                        className="accent-orange-500"
                                    />
                                    HR
                                </label>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm text-gray-300 mb-1">
                                Organization Name
                            </label>
                            <input
                                name="organisation"
                                type="text"
                                placeholder="Enter your name"
                                className="w-full px-4 py-2 bg-black border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm text-gray-300 mb-1">
                                Password
                            </label>

                            <div className="relative">
                                <input
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter password"
                                    className="w-full px-4 py-2 pr-12 bg-black border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                                />

                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-orange-500"
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label className="block text-sm text-gray-300 mb-1">
                                Confirm Password
                            </label>

                            <div className="relative">
                                <input
                                    name="confirmPassword"
                                    type={showConfirm ? "text" : "password"}
                                    placeholder="Confirm password"
                                    className="w-full px-4 py-2 pr-12 bg-black border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                                />

                                <button
                                    type="button"
                                    onClick={() => setShowConfirm(!showConfirm)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-orange-500"
                                >
                                    {showConfirm ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                        </div>

                        {/* Register Button */}
                        <button
                            type="submit"
                            className="w-full bg-orange-600 hover:bg-orange-700 text-white py-2 rounded-lg transition duration-300"
                        >
                            Register
                        </button>

                    </form>

                    {/* Login Link */}
                    <p className="text-center text-sm text-gray-400 mt-6">
                        Already have an account?{" "}
                        <a href="/login" className="text-orange-500 hover:underline">
                            Login
                        </a>
                    </p>

                </div>
            </div>
        </>
    );
};

export default Register;
