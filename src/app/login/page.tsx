import LoginForm from "@/components/LoginForm";

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl">
        <div>
          <h2 className="mt-2 text-center text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Welcome back! Please enter your details.
          </p>
        </div>
        <LoginForm />
        <div className="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-100">
          <p className="text-center text-sm font-medium text-gray-700">
            Demo credentials
          </p>
          <div className="mt-2 space-y-1 text-center text-sm text-gray-600">
            <p>
              Username:{" "}
              <code className=" bg-gray-100 px-2 py-0.5 rounded">mor_2314</code>
            </p>
            <p>
              Password:{" "}
              <code className=" bg-gray-100 px-2 py-0.5 rounded">83r5^_</code>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
