import * as z from "zod";

export const checkoutSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  city: z.string().min(2, "City must be at least 2 characters"),
  zipCode: z.string().regex(/^\d{5}(-\d{4})?$/, "Invalid ZIP code"),
  cardNumber: z.string().regex(/^\d{16}$/, "Invalid card number"),
  cardExpiry: z
    .string()
    .regex(/^(0[1-9]|1[0-2])\/([0-9]{2})$/, "Invalid expiry date (MM/YY)"),
  cardCVC: z
    .string()
    .regex(/^\d{3,4}$/, "Invalid CVC")
    .max(3),
});

export type CheckoutFormData = z.infer<typeof checkoutSchema>;