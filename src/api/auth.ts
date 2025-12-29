import { apiClient } from './axios';
import type { AuthResponse } from '../types/auth';

export const authApi = {
  googleLogin: async (token: string): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>('/api/auth/google', { token });
    return response.data;
  },
};

