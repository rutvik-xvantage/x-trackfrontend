import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AuthState, User } from "../types";

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      // Save user + token from backend
      setUser: (user: User) =>
        set({
          user,
          isAuthenticated: true,
        }),

      setToken: (token: string) => {
  localStorage.setItem("xtrack_token", token);
  set({
    token,
    isAuthenticated: true,
  });
},


      // Full login (optional)
      login: (user: User, token: string) =>
        set({
          user,
          token,
          isAuthenticated: true,
        }),

      // Logout
      logout: () =>
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        }),
    }),
    {
      name: "xtrack-auth-storage",
    }
  )
);
