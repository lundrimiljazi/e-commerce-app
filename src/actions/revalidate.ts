"use server";
import { revalidatePath } from "next/cache";

export async function revalidateAuthPaths() {
  revalidatePath("/");
  revalidatePath("/cart");
  revalidatePath("/checkout");
  revalidatePath("/login");
} 
