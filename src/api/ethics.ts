import { apiClient } from './axios';
import type { EthicalNotice } from '../types/analysis';

export const ethicsApi = {
  getEthicalNotice: async (): Promise<EthicalNotice> => {
    const response = await apiClient.get<EthicalNotice>('/api/ethical-notice');
    return response.data;
  },
};

