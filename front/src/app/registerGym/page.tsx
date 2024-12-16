"use client";
import validateRegister from "@/helpers/validateRegister";
import { useState } from "react";

const RegisterGym: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<Record<string, string | null>>({});
  const [passwordCriteria, setPasswordCriteria] = useState({
    length: false,
    uppercase: false,
    special: false,
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Validación individual
    const error = validateRegister(name, value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));

    // Validaciones específicas para la contraseña
    if (name === "password") {
      setPasswordCriteria({
        length: value.length >= 6,
        uppercase: /[A-Z]/.test(value),
        special: /[!@#$%^&*(),.?":{}|<>]/.test(value),
      });
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const validationErrors: Record<string, string | null> = {};
    let hasErrors = false;

    for (const [name, value] of Object.entries(formData)) {
      const error = validateRegister(name, value);
      if (error) {
        validationErrors[name] = error;
        hasErrors = true;
      }
    }

    setErrors(validationErrors);

    if (!hasErrors) {
      console.log("Form submitted successfully:", formData);
      // Lógica de solicitud al backend
    }
  };

  return (
    <section className="bg-gray-dark h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-lg shadow p-6 space-y-6">
        <h1 className="text-2xl font-bold text-black text-center">
          Register Gym
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {["name", "phone", "address", "email", "password"].map((field) => (
            <div key={field}>
              <label
                htmlFor={field}
                className="block mb-2 text-sm font-medium text-black"
              >
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input
                type={field === "email" ? "email" : field === "password" ? "password" : "text"}
                name={field}
                id={field}
                className={`w-full p-2.5 bg-gray-light border rounded-lg focus:ring-yellow focus:border-yellow ${
                  field === "password"
                    ? passwordCriteria.length && passwordCriteria.uppercase && passwordCriteria.special
                      ? "border-green-500"
                      : "border-red-500"
                    : ""
                }`}
                placeholder={`Enter ${field}`}
                value={formData[field as keyof typeof formData]}
                onChange={handleInputChange}
              />
              {errors[field] && (
                <p className="text-red-500 text-sm mt-2">{errors[field]}</p>
              )}
              {field === "password" && (
                <div className="mt-2 text-sm">
                  <p
                    className={`${
                      passwordCriteria.length ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    • At least 6 characters
                  </p>
                  <p
                    className={`${
                      passwordCriteria.uppercase ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    • One uppercase letter
                  </p>
                  <p
                    className={`${
                      passwordCriteria.special ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    • One special character
                  </p>
                </div>
              )}
            </div>
          ))}
          <button
            type="submit"
            className="w-full py-2.5 text-sm font-medium text-black bg-yellow hover:bg-yellow-light focus:ring-4 focus:ring-yellow-orange focus:outline-none rounded-lg"
          >
            Register
          </button>
        </form>
      </div>
    </section>
  );
};

export default RegisterGym;
