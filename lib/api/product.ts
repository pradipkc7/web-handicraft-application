import axiosInstance from "./axios-instance";
import { API } from "./endpoints";

export interface Product {
  _id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  price: number;
  discountPrice?: number;
  images: string[];
  materials?: string;
  size?: string;
  stock: number;
  featured: boolean;
  isActive: boolean;
  artisanName?: string;
  location?: string;
  tags: string[];
  rating?: number;
  totalReviews?: number;
  createdAt: string;
  updatedAt: string;
}

export const getProducts = async (params: {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  featured?: boolean;
}) => {
  try {
    const response = await axiosInstance.get(API.PRODUCTS.GET_ALL, {
      params,
    });
    return response.data; // response body
  } catch (error: Error | any) {
    throw new Error(
      error?.response?.data?.message || "Failed to fetch products",
    );
  }
};

export const getProductById = async (id: string) => {
  try {
    const response = await axiosInstance.get(API.PRODUCTS.GET_BY_ID(id));
    return response.data; // response body
  } catch (error: Error | any) {
    throw new Error(
      error?.response?.data?.message || "Failed to fetch product",
    );
  }
};

export const getFeaturedProducts = async (limit?: number) => {
  try {
    const response = await axiosInstance.get(API.PRODUCTS.GET_FEATURED, {
      params: { limit },
    });
    return response.data; // response body
  } catch (error: Error | any) {
    throw new Error(
      error?.response?.data?.message || "Failed to fetch featured products",
    );
  }
};

export const getProductImageUrl = (path: string) =>
  (process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8088") + path;

export const getProductCategories = async () => {
  try {
    const response = await axiosInstance.get(API.PRODUCTS.GET_CATEGORIES);
    return response.data; // response body
  } catch (error: Error | any) {
    throw new Error(
      error?.response?.data?.message || "Failed to fetch categories",
    );
  }
};
