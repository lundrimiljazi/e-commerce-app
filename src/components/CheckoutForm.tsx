import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { checkoutSchema } from "@/schema/checkoutSchema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckoutFormData } from "@/schema/checkoutSchema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

type CheckoutFormProps = {
  onSubmit: (data: CheckoutFormData) => Promise<void>;
  isSubmitting: boolean;
  total: number;
};

export function CheckoutForm({
  onSubmit,
  isSubmitting,
  total,
}: CheckoutFormProps) {
  const form = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
  });

  const formatExpiryDate = (value: string) => {
    const cleanedValue = value.replace(/[^\d]/g, "");
    if (cleanedValue.length <= 2) return cleanedValue;
    return `${cleanedValue.slice(0, 2)}/${cleanedValue.slice(2, 4)}`;
  };

  const onFormSubmit = async (data: CheckoutFormData) => {
    try {
      await onSubmit(data);
    } catch (error) {
      toast.error("Payment failed", { position: "top-center" });
    }
  };

  return (
    <div className="md:w-1/2 p-8">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-6">Checkout</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onFormSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700">Full Name</FormLabel>
                <FormControl>
                  <Input {...field} className="bg-white text-gray-700" />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700">Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    className="bg-white text-gray-700"
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700">Address</FormLabel>
                <FormControl>
                  <Input {...field} className="bg-white text-gray-700" />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-4 text-black">
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">City</FormLabel>
                  <FormControl>
                    <Input {...field} className="bg-white text-gray-700" />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="zipCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">ZIP Code</FormLabel>
                  <FormControl>
                    <Input {...field} className="bg-white text-gray-700" />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="cardNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700">Card Number</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="bg-white text-gray-700"
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="cardExpiry"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700">Expiry Date</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    onChange={(e) =>
                      field.onChange(formatExpiryDate(e.target.value))
                    }
                    className="bg-white text-gray-700"
                    placeholder="MM/YY"
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="cardCVC"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700">CVC</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="bg-white text-gray-700"
                    placeholder="123"
                    maxLength={3}
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
            disabled={isSubmitting}
          >
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isSubmitting ? "Processing..." : `Pay $${total.toFixed(2)}`}
          </Button>
        </form>
      </Form>
    </div>
  );
}
