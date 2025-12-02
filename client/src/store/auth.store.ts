import { create } from "zustand";
import { loginApi, getMeApi } from "../api/auth.api";

export const useAuthStore = create((set) => ({
  user: null,
  token: localStorage.getItem("xtrack_token") || null,
  loading: false,

  login: async (username: string, password: string) => {
    set({ loading: true });
    const res = await loginApi({ username, password });

    const { token, user } = res.data.data;

    localStorage.setItem("xtrack_token", token);
    set({ token, user, loading: false });

    return user;
  },

  fetchMe: async () => {
    const res = await getMeApi();
    set({ user: res.data.data });
  },

  logout: () => {
    localStorage.removeItem("xtrack_token");
    set({ user: null, token: null });
  },
}));
