"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { loginSchema, type FormData } from "@/schema/LoginSchema";
import { useState } from "react";
import { loginUser } from "@/lib/authentication";
import { useAuthStore } from "@/store/useAuthStore";

export default function LoginForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { setAuthState } = useAuthStore();

  const form = useForm<FormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const handleSuccessfulLogin = () => {
    const redirectPath = localStorage.getItem("redirectAfterLogin");
    localStorage.removeItem("redirectAfterLogin");
    router.push(redirectPath || "/");
  };

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      const response = await loginUser({
        username: data.username,
        password: data.password,
      });

      setAuthState({
        isAuthenticated: true,
        user: {
          username: data.username,
          email: data.username,
        },
        token: response.token,
      });

      toast.success("Login successful!");
      handleSuccessfulLogin();
    } catch (error) {
      toast.error("Invalid credentials", { position: "top-center" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700">Username</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your username"
                  {...field}
                  className="bg-white text-gray-700 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700">Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  {...field}
                  className="bg-white text-gray-700 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
        >
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isLoading ? "Signing in..." : "Sign in"}
        </Button>
      </form>
    </Form>
  );
}
