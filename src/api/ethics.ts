import api from "./axios";

export const ethicsApi = {
  checkCompliance: async (payload: any) => {
    const { data } = await api.post("/api/ethics/check", payload);
    return data;
  },

  getPolicies: async () => {
    const { data } = await api.get("/api/ethics/policies");
    return data;
  },
};