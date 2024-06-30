// src/services/apiService.ts
import axios, {
  AxiosInstance,
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";
import { Constants } from "../../config/constants";
import store from "../../store/store";
import { clearUser } from "../../store/slices/authSlice";

class ApiService {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: Constants.API_URL,
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.initializeRequestInterceptor();
    this.initializeResponseInterceptor();
  }

  private initializeRequestInterceptor() {
    this.axiosInstance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        if (config.headers && config.headers["Require-Auth"]) {
          const token = this.getAuthToken();
          if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
          } else {
            console.warn("Auth token is missing");
          }
        }
        return config;
      },
      (error: AxiosError) => {
        return Promise.reject(error);
      }
    );
  }

  private initializeResponseInterceptor() {
    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error: AxiosError) => {
        if (error.response && error.response.status === 401) {
          localStorage.removeItem("token");
          store.dispatch(clearUser());
        }
        return Promise.reject(error);
      }
    );
  }

  private getAuthToken(): string | null {
    return localStorage.getItem("token");
  }

  private setCustomHeaders(headers: Record<string, string>) {
    this.axiosInstance.defaults.headers = {
      ...this.axiosInstance.defaults.headers,
      ...headers,
    };
  }

  public get<T>(
    url: string,
    params: Record<string, any> = {},
    requireAuth: boolean = false,
    customHeaders: Record<string, string> = {}
  ): Promise<AxiosResponse<T>> {
    const headers = requireAuth ? { "Require-Auth": true } : {};
    this.setCustomHeaders(customHeaders);
    return this.axiosInstance.get<T>(url, { params, headers });
  }

  public post<T>(
    url: string,
    data: any,
    requireAuth: boolean = false,
    customHeaders: Record<string, string> = {}
  ): Promise<AxiosResponse<T>> {
    const headers = requireAuth ? { "Require-Auth": true } : {};
    this.setCustomHeaders(customHeaders);
    return this.axiosInstance.post<T>(url, data, { headers });
  }

  public put<T>(
    url: string,
    data: any,
    requireAuth: boolean = false,
    customHeaders: Record<string, string> = {}
  ): Promise<AxiosResponse<T>> {
    const headers = requireAuth ? { "Require-Auth": true } : {};
    this.setCustomHeaders(customHeaders);
    return this.axiosInstance.put<T>(url, data, { headers });
  }

  public patch<T>(
    url: string,
    data: any,
    requireAuth: boolean = false,
    customHeaders: Record<string, string> = {}
  ): Promise<AxiosResponse<T>> {
    const headers = requireAuth ? { "Require-Auth": true } : {};
    this.setCustomHeaders(customHeaders);
    return this.axiosInstance.patch<T>(url, data, { headers });
  }

  public delete<T>(
    url: string,
    requireAuth: boolean = false,
    customHeaders: Record<string, string> = {}
  ): Promise<AxiosResponse<T>> {
    const headers = requireAuth ? { "Require-Auth": true } : {};
    this.setCustomHeaders(customHeaders);
    return this.axiosInstance.delete<T>(url, { headers });
  }
}

export default new ApiService();
