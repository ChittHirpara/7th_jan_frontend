import api from "./axios";

export const authApi = {
  googleLogin: async (googleIdToken: string) => {
    const { data } = await api.post("/auth/google", {
      token: googleIdToken,
    });
    return data;
  },

  getCurrentUser: async () => {
    const { data } = await api.get("/auth/me");
    return data;
  },

  logout: async () => {
    await api.post("/auth/logout");
    localStorage.removeItem("sentinai_token");
  },
};