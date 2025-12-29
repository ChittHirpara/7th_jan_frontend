import { apiClient } from './axios';
import type { AnalysisRequest, AnalysisResult, DashboardMetrics } from '../types/analysis';

export const analysisApi = {
  analyze: async (data: AnalysisRequest): Promise<AnalysisResult> => {
    const response = await apiClient.post<AnalysisResult>('/api/analyze', data);
    return response.data;
  },

  getHistory: async (): Promise<AnalysisResult[]> => {
    const response = await apiClient.get<AnalysisResult[]>('/api/analyze/history');
    return response.data;
  },

  getDashboardMetrics: async (): Promise<DashboardMetrics> => {
    const response = await apiClient.get<DashboardMetrics>('/api/dashboard/metrics');
    return response.data;
  },
};

