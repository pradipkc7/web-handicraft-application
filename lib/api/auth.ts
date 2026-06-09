import axiosInstance from "./axios-instance";
import { API } from "./endpoints";

export const register = async (data: any) => {
  try {
    const response = await axiosInstance.post(API.AUTH.REGISTER, data); // path, data
    return response.data; // reponse ko body
  } catch (error: Error | any) {
    const message =
      error?.response?.data?.message ||
      error?.response?.data ||
      error?.message ||
      "Registration failed";
    throw new Error(message);
  }
};

export const login = async (data: any) => {
  try {
    const response = await axiosInstance.post(API.AUTH.LOGIN, data); // path, data
    return response.data; // reponse ko body
  } catch (error: Error | any) {
    const message =
      error?.response?.data?.message ||
      error?.response?.data ||
      error?.message ||
      "Login failed";
    throw new Error(message);
  }
};
