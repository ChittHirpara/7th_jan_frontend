import api from "./axios";
import type {
  AnalysisRequest,
  AnalysisResult,
  DashboardMetrics,
} from "../types/analysis";

export const analysisApi = {
  analyze: async (data: AnalysisRequest): Promise<AnalysisResult> => {
    const response = await api.post<AnalysisResult>("/api/analyze", data);
    return response.data;
  },

  getHistory: async (): Promise<AnalysisResult[]> => {
    const response = await api.get<AnalysisResult[]>("/api/analyze/history");
    return response.data;
  },

  getDashboardMetrics: async (): Promise<DashboardMetrics> => {
    const response = await api.get<DashboardMetrics>(
      "/api/dashboard/metrics"
    );
    return response.data;
  },
};