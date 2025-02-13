"use server";

import { revalidateAuthPaths } from "@/actions/revalidate";
import { cookies } from "next/headers";




export async function loginUser(credentials: { username: string; password: string }) {
    const cookieStore = await cookies();

  try {
    const response = await fetch("https://fakestoreapi.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error("Invalid credentials");
    }

    const data = await response.json();
    
    const authState = {
      isAuthenticated: true,
      user: { username: credentials.username, email: credentials.username },
      token: data.token,
    };

    cookieStore.set("auth-storage", encodeURIComponent(JSON.stringify({ state: authState })), {
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    });

    await revalidateAuthPaths();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function logoutUser() {
    const cookieStore = await cookies();

  try {
    // Clear the auth cookie
    cookieStore.delete("auth-storage");

    await revalidateAuthPaths();
    return { success: true };
  } catch (error) {
    throw new Error("Logout failed");
  }
}