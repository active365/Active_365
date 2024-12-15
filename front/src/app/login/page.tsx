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
      const error = validateLogin(key, val);
      if (error) {
        validationErrors[key as keyof ILoginData] = error;
        isValid = false;
      }
    });

    setErrors(validationErrors);
    setIsFormValid(isValid);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    //lógica de solicitud al backend
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
            <input
              type="password"
              name="password"
              id="password"
              className={`w-full p-2.5 bg-gray-light border ${
                errors.password ? "border-red-500" : "border-gray-dark"
              } rounded-lg focus:ring-yellow focus:border-yellow`}
              placeholder="••••••••"
              value={loginData.password}
              onChange={handleInputChange}
            />
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
