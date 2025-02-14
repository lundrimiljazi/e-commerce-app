import LoginForm from "@/components/LoginForm";
import Image from "next/image";
import { Github, Linkedin, Twitter } from "lucide-react";
export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Image
            src="/logo.svg"
            alt="Logo"
            width={48}
            height={48}
            className="mx-auto"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Welcome back
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Please sign in to your account
          </p>
        </div>
        <LoginForm />
        <div className="mt-8 space-y-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-50 text-gray-500">
                Or continue with
              </span>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <button className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition duration-150 ease-in-out">
              <span className="sr-only">Sign in with Google</span>
              <Linkedin className="w-5 h-5" />
            </button>
            <button className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition duration-150 ease-in-out">
              <span className="sr-only">Sign in with Twitter</span>
              <Twitter className="w-5 h-5" />
            </button>
            <button className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition duration-150 ease-in-out">
              <span className="sr-only">Sign in with GitHub</span>
              <Github className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="mt-6 p-4 bg-white rounded-xl border border-gray-200 shadow-sm">
          <p className="text-center text-sm font-medium text-gray-700">
            Demo credentials
          </p>
          <div className="mt-2 space-y-1 text-center text-sm text-gray-600">
            <p>
              Username:{" "}
              <code className="bg-gray-100 px-2 py-0.5 rounded">mor_2314</code>
            </p>
            <p>
              Password:{" "}
              <code className="bg-gray-100 px-2 py-0.5 rounded">83r5^_</code>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
