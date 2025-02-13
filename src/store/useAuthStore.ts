import { create } from "zustand";
import { persist } from "zustand/middleware";
import useSWRMutation from "swr/mutation";

interface User {
  username: string;
  email: string;
}

interface AuthStore {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  setAuthState: (state: Partial<AuthStore>) => void;
  logout: () => void;
}

const syncToCookie = (state: any) => {
  if (typeof document !== "undefined") {
    document.cookie = `auth-storage=${encodeURIComponent(
      JSON.stringify({
        state: {
          token: state.token,
          user: state.user,
          isAuthenticated: state.isAuthenticated,
        },
      })
    )}; path=/`;
  }
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      token: null,
      setAuthState: (state) => {
        set(state);
        syncToCookie({ ...useAuthStore.getState(), ...state });
      },
      logout: () => {
        set({
          isAuthenticated: false,
          user: null,
          token: null,
        });
        if (typeof document !== "undefined") {
          document.cookie =
            "auth-storage=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
        }
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        token: state.token,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

export function useLogin() {
  const { setAuthState } = useAuthStore();

  const loginFetcher = async (
    url: string,
    { arg }: { arg: { username: string; password: string } }
  ) => {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(arg),
    });

    if (!response.ok) {
      throw new Error("Invalid credentials");
    }

    return response.json();
  };

  const { trigger, isMutating, error } = useSWRMutation(
    "https://fakestoreapi.com/auth/login",
    loginFetcher
  );

  const login = async (username: string, password: string) => {
    try {
      const data = await trigger({ username, password });
      setAuthState({
        isAuthenticated: true,
        user: { username, email: username },
        token: data.token,
      });
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  return { login, isLoading: isMutating, error };
}
