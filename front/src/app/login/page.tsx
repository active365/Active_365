"use client";

import validateLogin from "@/helpers/validateLogin";
import Link from "next/link";
import { useState } from "react";
import { ILoginData, ILoginErrors } from "@/interfaces/ILogin";

const Login: React.FC = () => {
  const [loginData, setLoginData] = useState<ILoginData>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<ILoginErrors>({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    const error = validateLogin(name, value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));

    const validationErrors: ILoginErrors = {};
    let isValid = true;

    Object.entries({ ...loginData, [name]: value }).forEach(([key, val]) => {
      const fieldError = validateLogin(key, val);
      if (fieldError) {
        validationErrors[key as keyof ILoginData] = fieldError;
        isValid = false;
      }
    });

    setErrors(validationErrors);
    setIsFormValid(isValid);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    // Aquí iría la lógica de solicitud al backend
  };

  return (
    <section className="bg-gray-dark h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-lg shadow p-6 space-y-6">
        <h1 className="text-2xl font-bold text-black text-center">
          Sign in to your account
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-black"
            >
              Your email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className={`w-full p-2.5 bg-gray-light border ${
                errors.email ? "border-red-500" : "border-gray-dark"
              } rounded-lg focus:ring-yellow focus:border-yellow`}
              placeholder="name@company.com"
              value={loginData.email}
              onChange={handleInputChange}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-2">{errors.email}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-black"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                className={`w-full p-2.5 bg-gray-light border ${
                  errors.password ? "border-red-500" : "border-gray-dark"
                } rounded-lg focus:ring-yellow focus:border-yellow`}
                placeholder="••••••••"
                value={loginData.password}
                onChange={handleInputChange}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-0 right-3 flex items-center z-20 px-3 cursor-pointer text-gray-400 rounded-e-md focus:outline-none focus:text-blue-600"
              >
                <svg
                  className="shrink-0 size-3.5"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {showPassword ? (
                    <>
                      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </>
                  ) : (
                    <>
                      <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path>
                      <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"></path>
                      <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"></path>
                      <line x1="2" x2="22" y1="2" y2="22"></line>
                    </>
                  )}
                </svg>
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-2">{errors.password}</p>
            )}
          </div>
          <button
            type="submit"
            disabled={!isFormValid}
            className={`w-full py-2.5 text-sm font-medium text-black rounded-lg ${
              isFormValid
                ? "bg-yellow hover:bg-yellow-light focus:ring-4 focus:ring-yellow-orange"
                : "bg-gray-dark cursor-not-allowed"
            }`}
          >
            Sign in
          </button>
          <p className="text-sm text-gray-dark text-center">
            Don’t have an account yet?{" "}
            <Link
              href="/register"
              className="font-medium text-yellow-orange hover:underline"
            >
              Register
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Login;
