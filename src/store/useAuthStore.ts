import { create } from "zustand";
import { persist } from "zustand/middleware";
import useSWRMutation from "swr/mutation";
import { revalidateAuthPaths } from "@/actions/revalidate";

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
    const cookieValue = JSON.stringify({
      state: {
        token: state.token,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }
    });
    document.cookie = `auth-storage=${encodeURIComponent(cookieValue)}; path=/`;
  }
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      token: null,
      setAuthState: async (state) => {
        set(state);
        syncToCookie({ ...useAuthStore.getState(), ...state });
        // Revalidate cache for protected pages
        if (state.isAuthenticated) {
          await revalidateAuthPaths();
        }
      },
      logout: async () => {
        set({
          isAuthenticated: false,
          user: null,
          token: null,
        });
        if (typeof document !== "undefined") {
          document.cookie =
            "auth-storage=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
        }
        await revalidateAuthPaths();
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        token: state.token,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
      onRehydrateStorage: () => (state) => {
        if (state && typeof document !== "undefined") {
          const cookieValue = document.cookie
            .split('; ')
            .find(row => row.startsWith('auth-storage='))
            ?.split('=')[1];
          
          if (cookieValue) {
            try {
              // First decode the URI component, then parse JSON
              const decodedValue = decodeURIComponent(cookieValue);
              const parsed = JSON.parse(decodedValue);
              
              // Ensure the parsed object has the expected structure
              if (parsed && parsed.state && typeof parsed.state === 'object') {
                state.setAuthState({
                  isAuthenticated: parsed.state.isAuthenticated || false,
                  user: parsed.state.user || null,
                  token: parsed.state.token || null
                });
              }
            } catch (error) {
              console.error('Failed to parse auth cookie:', error);
              // Clear invalid cookie
              document.cookie =
                "auth-storage=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
            }
          }
        }
      }
    }
  )
);


