import axiosInstance from "./axios-instance";
import { API } from "./endpoints";

const getErrorMessage = (error: unknown, fallback: string) =>
  (error as any)?.response?.data?.message || fallback;

export const sendContactMessage = async (data: {
  name: string;
  email: string;
  message: string;
}) => {
  try {
    const response = await axiosInstance.post(API.CONTACT.SEND, data);
    return response.data; // response body
  } catch (error: unknown) {
    throw new Error(getErrorMessage(error, "Failed to send message"));
  }
};
