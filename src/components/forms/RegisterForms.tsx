import React from "react";

interface RegisterFormProps {
  title: string;
  fields: { name: string; type: string; placeholder: string }[];
  errors: Record<string, string>;
  values: Record<string, string>;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({
  title,
  fields,
  errors,
  values,
  handleChange,
  handleSubmit,
}) => {
  return (
    <section className="bg-gray-dark h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-lg shadow p-6 space-y-6">
        <h1 className="text-2xl font-bold text-black text-center">{title}</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {fields.map((field, index) => (
            <div key={index}>
              <label
                htmlFor={field.name}
                className="block mb-2 text-sm font-medium text-black"
              >
                {field.placeholder}
              </label>
              <input
                type={field.type}
                name={field.name}
                id={field.name}
                className="w-full p-2.5 bg-gray-light border border-gray-dark rounded-lg focus:ring-yellow focus:border-yellow"
                placeholder={field.placeholder}
                value={values[field.name]}
                onChange={handleChange}
              />
              {errors[field.name] && (
                <p className="text-red-500 text-sm mt-2">{errors[field.name]}</p>
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

export default RegisterForm;
