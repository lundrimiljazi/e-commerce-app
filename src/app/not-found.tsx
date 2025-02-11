import Link from "next/link";
import { Metadata } from "next";
import { ArrowLeft, Construction } from "lucide-react";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you are looking for does not exist.",
};

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="bg-white p-8 rounded-lg shadow-2xl max-w-md w-full">
        <div className="text-center">
          <Construction className="mx-auto h-24 w-24 text-yellow-500 mb-4" />
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Oops!</h1>
          <h2 className="text-2xl font-semibold text-gray-600 mb-4">
            Page not found
          </h2>
          {/* <p className="text-gray-500 mb-6">
            We're working hard to bring you something amazing! This page will be
            available soon.
          </p> */}
          <div className="space-y-4">
            <Link
              href="/"
              className="block w-full bg-gradient-to-r  bg-black text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
            >
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
