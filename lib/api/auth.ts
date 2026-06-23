import axiosInstance from "./axios-instance";
import { API } from "./endpoints";

type ApiErrorData = {
  message?: string;
  error?: string;
  errors?: Array<{ message?: string; msg?: string } | string>;
};

type ApiError = {
  message?: string;
  response?: {
    status?: number;
    data?: ApiErrorData | string;
  };
  config?: {
    baseURL?: string;
    url?: string;
    method?: string;
  };
};

const getErrorMessage = (error: unknown, fallback: string) => {
  const apiError = error as ApiError;
  const data = apiError.response?.data;
  const status = apiError.response?.status;
  const method = apiError.config?.method?.toUpperCase();
  const url = `${apiError.config?.baseURL || ""}${apiError.config?.url || ""}`;

  if (typeof data === "string") {
    return data;
  }

  if (data?.message) {
    return data.message;
  }

  if (data?.error) {
    return data.error;
  }

  if (Array.isArray(data?.errors)) {
    return data.errors
      .map((item) =>
        typeof item === "string" ? item : item.message || item.msg || "",
      )
      .filter(Boolean)
      .join(", ");
  }

  if (data) {
    return JSON.stringify(data);
  }

  if (apiError.message) {
    return apiError.message;
  }

  if (status || url) {
    return `${fallback}${status ? ` (${status})` : ""}${method || url ? `: ${method || "REQUEST"} ${url}` : ""}`;
  }

  return fallback;
};

export const register = async (data: unknown) => {
  try {
    const response = await axiosInstance.post(API.AUTH.REGISTER, data); // path, data
    return response.data; // reponse ko body
  } catch (error: unknown) {
    throw new Error(getErrorMessage(error, "Registration failed"));
  }
};

export const login = async (data: unknown) => {
  try {
    const response = await axiosInstance.post(API.AUTH.LOGIN, data); // path, data
    return response.data; // reponse ko body
  } catch (error: unknown) {
    throw new Error(getErrorMessage(error, "Login failed"));
  }
};
export const updateProfile = async (data: FormData) => {
  try {
    const response = await axiosInstance.put(API.AUTH.UPDATE, data, {
      headers: {
        "Content-Type": "multipart/form-data", // multipart/form-data for file upload
      },
    });
    return response.data; // reponse ko body
  } catch (error: unknown) {
    throw new Error(getErrorMessage(error, "Failed to update profile"));
  }
};

export const updatePassword = async (data: unknown) => {
  try {
    const response = await axiosInstance.patch(API.AUTH.CHANGE_PASSWORD, data);
    return response.data; // reponse ko body
  } catch (error: unknown) {
    throw new Error(getErrorMessage(error, "Failed to update password"));
  }
};
export const whoami = async () => {
  try {
    const response = await axiosInstance.get(API.AUTH.WHOAMI);
    return response.data; // reponse ko body
  } catch (error: unknown) {
    throw new Error(getErrorMessage(error, "Failed to fetch user details"));
  }
};
