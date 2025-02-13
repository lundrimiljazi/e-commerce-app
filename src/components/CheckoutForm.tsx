import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { checkoutSchema } from "@/schema/checkoutSchema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckoutFormData } from "@/schema/checkoutSchema";

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
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
  });

  const formatExpiryDate = (value: string) => {
    const cleanedValue = value.replace(/[^\d]/g, "");
    if (cleanedValue.length <= 2) return cleanedValue;
    return `${cleanedValue.slice(0, 2)}/${cleanedValue.slice(2, 4)}`;
  };

  return (
    <div className="md:w-1/2 p-8">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-6">Checkout</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4 text-black">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            {...register("name")}
            className="w-full bg-white border-gray-400 focus:border-gray-500 focus:ring-gray-500"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-4 text-black">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            {...register("email")}
            className="w-full bg-white border-gray-400 focus:border-gray-500 focus:ring-gray-500"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-4 text-black">
          <Label htmlFor="address">Address</Label>
          <Input
            id="address"
            {...register("address")}
            className="w-full bg-white border-gray-400 focus:border-gray-500 focus:ring-gray-500"
          />
          {errors.address && (
            <p className="text-red-500 text-sm">{errors.address.message}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4 text-black">
          <div className="space-y-4">
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              {...register("city")}
              className="w-full bg-white border-gray-400 focus:border-gray-500 focus:ring-gray-500"
            />
            {errors.city && (
              <p className="text-red-500 text-sm">{errors.city.message}</p>
            )}
          </div>
          <div className="space-y-4 text-black">
            <Label htmlFor="zipCode">ZIP Code</Label>
            <Input
              id="zipCode"
              {...register("zipCode")}
              className="w-full bg-white border-gray-400 focus:border-gray-500 focus:ring-gray-500"
            />
            {errors.zipCode && (
              <p className="text-red-500 text-sm">{errors.zipCode.message}</p>
            )}
          </div>
        </div>

        <div className="space-y-4 text-black">
          <Label htmlFor="cardNumber">Card Number</Label>
          <Input
            id="cardNumber"
            {...register("cardNumber")}
            className="w-full bg-white border-gray-400 focus:border-gray-500 focus:ring-gray-500"
            placeholder="1234 5678 9012 3456"
            maxLength={19}
          />
          {errors.cardNumber && (
            <p className="text-red-500 text-sm">{errors.cardNumber.message}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4 text-black">
          <div className="space-y-4">
            <Label htmlFor="cardExpiry">Expiry Date</Label>
            <Controller
              name="cardExpiry"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  onChange={(e) =>
                    field.onChange(formatExpiryDate(e.target.value))
                  }
                  className="w-full bg-white border-gray-400 focus:border-gray-500 focus:ring-gray-500"
                  placeholder="MM/YY"
                />
              )}
            />
            {errors.cardExpiry && (
              <p className="text-red-500 text-sm">
                {errors.cardExpiry.message}
              </p>
            )}
          </div>
          <div className="space-y-4">
            <Label htmlFor="cardCVC">CVC</Label>
            <Input
              id="cardCVC"
              {...register("cardCVC")}
              className="w-full bg-white border-gray-400 focus:border-gray-500 focus:ring-gray-500"
              placeholder="123"
              maxLength={3}
            />
            {errors.cardCVC && (
              <p className="text-red-500 text-sm">{errors.cardCVC.message}</p>
            )}
          </div>
        </div>

        <Button
          type="submit"
          className="w-full bg-black hover:bg-gray-700 text-white font-bold py-3 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Processing..." : `Pay $${total.toFixed(2)}`}
        </Button>
      </form>
    </div>
  );
}
