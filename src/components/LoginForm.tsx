"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLogin } from "@/store/useAuthStore";
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
import { loginSchema, FormData } from "@/schema/loginSchema";
export default function LoginForm() {
  const router = useRouter();
  const { login, isLoading, error } = useLogin();

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
    try {
      await login(data.username, data.password);
      toast.success("Login successful!");
      handleSuccessfulLogin();
    } catch (error) {
      toast.error("Invalid credentials", { position: "top-center" });
    } finally {
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
              <FormLabel className="text-gray-700 ">Username</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your username"
                  {...field}
                  className="bg-white text-gray-700"
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
              <FormLabel className="text-gray-700 ">Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  {...field}
                  className="bg-white text-gray-700"
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
        >
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isLoading ? "Signing in..." : "Sign in"}
        </Button>
      </form>
    </Form>
  );
}
