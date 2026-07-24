import axios from "axios";
import axiosInstance from "./axios-instance";
import { API } from "./endpoints";

const getErrorMessage = (error: unknown, fallback: string) =>
  (axios.isAxiosError(error) && error.response?.data?.message) || fallback;

export class CartItemSyncError extends Error {
  status?: number;

  constructor(message: string, status?: number) {
    super(message);
    this.name = "CartItemSyncError";
    this.status = status;
  }
}

export const addCartItem = async (itemId: string, quantity: number) => {
  try {
    const response = await axiosInstance.post(API.CART.ADD, { itemId, quantity });
    return response.data; // response body
  } catch (error: unknown) {
    throw new CartItemSyncError(
      getErrorMessage(error, "Failed to sync cart item"),
      axios.isAxiosError(error) ? error.response?.status : undefined,
    );
  }
};

export const clearBackendCart = async () => {
  try {
    const response = await axiosInstance.delete(API.CART.CLEAR);
    return response.data; // response body
  } catch (error: unknown) {
    throw new CartItemSyncError(
      getErrorMessage(error, "Failed to clear cart"),
      axios.isAxiosError(error) ? error.response?.status : undefined,
    );
  }
};

export type CreateOrderPayload = {
  shippingLocation: string;
  paymentMethod: "cod" | "khalti";
};

export const createOrder = async (payload: CreateOrderPayload) => {
  try {
    const response = await axiosInstance.post(API.ORDERS.CREATE, payload);
    return response.data; // response body -> data: { order, paymentUrl? }
  } catch (error: unknown) {
    throw new Error(getErrorMessage(error, "Failed to create order"));
  }
};

export type Order = {
  _id: string;
  createdAt: string;
  paymentMethod: "cod" | "khalti";
  paymentStatus: string;
  status?: string;
  totalAmount?: number;
  items?: { name: string; quantity: number; price: number }[];
};

export const getMyOrders = async (): Promise<Order[]> => {
  try {
    const response = await axiosInstance.get(API.ORDERS.GET_ALL);
    return response.data?.data ?? response.data ?? [];
  } catch (error: unknown) {
    throw new Error(getErrorMessage(error, "Failed to fetch orders"));
  }
};

export const verifyOrderPayment = async (pidx: string) => {
  try {
    const response = await axiosInstance.get(API.ORDERS.VERIFY_PAYMENT, {
      params: { pidx },
    });
    return response.data; // response body -> data: order
  } catch (error: unknown) {
    throw new Error(getErrorMessage(error, "Failed to verify payment"));
  }
};
