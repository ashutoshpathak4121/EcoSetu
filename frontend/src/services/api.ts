import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { getMockResponse } from './mockFallback';

export const api = axios.create({
  baseURL: ((import.meta as any).env?.VITE_API_BASE_URL as string) || '/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Request interceptor: attach token
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('ecosetu_token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: handle resilient mock fallback for static deployments (Vercel)
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    // If running on a static host (Vercel) and backend is offline / 404 / connection refused
    const isOffline =
      !error.response ||
      error.code === 'ERR_NETWORK' ||
      error.code === 'ECONNABORTED' ||
      error.response.status === 404 ||
      error.response.status === 502 ||
      error.response.status === 503;

    if (isOffline && error.config) {
      const method = (error.config.method || 'get').toUpperCase();
      const url = error.config.url || '';
      let requestData = error.config.data;
      if (typeof requestData === 'string') {
        try {
          requestData = JSON.parse(requestData);
        } catch {}
      }

      console.warn(`[EcoSetu Vercel Demo Mode] Providing resilient mock response for ${method} ${url}`);
      const mockRes = getMockResponse(method, url, requestData);
      return Promise.resolve(mockRes);
    }

    if (error.response?.status === 401) {
      if (!window.location.pathname.includes('/login')) {
        localStorage.removeItem('ecosetu_token');
        localStorage.removeItem('ecosetu_user');
      }
    }
    return Promise.reject(error);
  }
);

