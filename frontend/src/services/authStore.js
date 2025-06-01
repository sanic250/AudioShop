import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set, get) => ({
      isLoggedIn: false,
      token: null,
      user: null,
      login: (payload) =>
        set({
          isLoggedIn: true,
          token: payload.token,
          user: {
            ...payload.user,
            role: payload.user?.role || "user",
          },
        }),
      logout: () => {
        set({
          isLoggedIn: false,
          token: null,
          user: null,
        });
        localStorage.removeItem("auth-storage");
      },
      isAdmin: () => {
        const user = get().user;
        return user?.role === "admin";
      },
    }),
    {
      name: "auth-storage",
      getStorage: () => localStorage,
    }
  )
);

export default useAuthStore;
