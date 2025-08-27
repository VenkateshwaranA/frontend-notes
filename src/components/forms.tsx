"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
type Inputs = {
  userName: string;
  email: string;
  password: string;
  confirmpassword: string;
};
interface props {
  cardName: string;
  buttonName: string;
}
function Forms({ cardName, buttonName }: props) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const handleSignUp: SubmitHandler<Inputs> = async (data) => {
    try {
      console.log(data);
      const resp = await axios.post(
        `${process.env.NEXT_PUBLIC_BE_URL}/register`,
        data
      );
      console.log({ resp });
      if (resp.status == 200) {
        router.push("/signin");
      }
    } catch (error) {
      console.error("error in sign UP --->", error);
    }
  };
  const handleSignIn: SubmitHandler<Inputs> = async (data) => {
    console.log("singggggggggggg", data);
    try {
      console.log(data);
      const resp = await axios.post(
        `${process.env.NEXT_PUBLIC_BE_URL}/login`,
        data
      );
      console.log({ resp });
      if (resp.status == 200) {
        router.push("/");
        localStorage.setItem("token", resp.data.access_token);
      }
    } catch (error) {
      console.error("error in sign UP --->", error);
    }
  };
  const password = watch("password");
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          {cardName}
        </h2>

        <form
          onSubmit={handleSubmit(
            cardName == "Sign Up" ? handleSignUp : handleSignIn
          )}
          className="space-y-4"
        >
          {cardName == "Sign Up" && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                {...register("userName", {
                  required: "Username is required",
                  minLength: {
                    value: 3,
                    message: "Username must be at least 3 characters",
                  },
                })}
                className={`mt-1 w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 ${
                  errors.userName
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-amber-500"
                }`}
                placeholder="Enter username"
              />
              {errors.userName && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.userName.message}
                </p>
              )}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email",
                },
              })}
              type="email"
              className={`mt-1 w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 ${
                errors.email
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-amber-500"
              }`}
              placeholder="Enter email"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 5,
                  message: "Password must be at least 5 characters",
                },
              })}
              type="password"
              className={`mt-1 w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 ${
                errors.password
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-amber-500"
              }`}
              placeholder="Enter password"
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {cardName == "Sign Up" && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                {...register("confirmpassword", {
                  required: "Confirm Password is required",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
                type="password"
                className={`mt-1 w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 ${
                  errors.confirmpassword
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-amber-500"
                }`}
                placeholder="Confirm password"
              />
              {errors.confirmpassword && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.confirmpassword.message}
                </p>
              )}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-amber-600 text-white py-2 rounded-lg font-semibold hover:bg-amber-700 transition"
          >
            {buttonName}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Forms;
