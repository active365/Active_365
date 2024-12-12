import Link from "next/link";

const Login: React.FC = () => {
  return (
    <section className="bg-gray-dark h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-lg shadow p-6 space-y-6">
        <h1 className="text-2xl font-bold text-black text-center">
          Sign in to your account
        </h1>
        <form className="space-y-4" action="#">
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
              className="w-full p-2.5 bg-gray-light border border-gray-dark rounded-lg focus:ring-yellow focus:border-yellow"
              placeholder="name@company.com"
              required
            />
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
              className="w-full p-2.5 bg-gray-light border border-gray-dark rounded-lg focus:ring-yellow focus:border-yellow"
              placeholder="••••••••"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2.5 text-sm font-medium text-black bg-yellow hover:bg-yellow-light focus:ring-4 focus:ring-yellow-orange focus:outline-none rounded-lg"
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
