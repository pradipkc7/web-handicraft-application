"use server";
import { revalidatePath } from "next/cache";
import {
  getAllProducts,
  createProduct,
  deleteProduct,
  getProductById,
  updateProduct,
} from "@/lib/api/admin/product";

export const handleCreateProduct = async (data: any) => {
  try {
    const result = await createProduct(data);
    if (result.success) {
      revalidatePath("/admin/products"); // Revalidate the products page after successful creation
      return { success: true, message: result.message, data: result.data };
    }
    return {
      success: false,
      message: result.message || "Product creation failed",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Product creation failed",
    };
  }
};

export const handleGetAllProducts = async ({
  page,
  limit,
  search,
  category,
}: {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
}) => {
  try {
    const currentPage = page ? (page > 0 ? page : 1) : 1;
    const currentLimit = limit ? (limit > 0 ? limit : 10) : 10;
    const currentSearch = search || "";
    const result = await getAllProducts({
      page: currentPage,
      limit: currentLimit,
      search: currentSearch,
      category,
    });
    if (result.success) {
      return {
        success: true,
        message: result.message,
        data: result.data,
        pagination: result.meta,
      }; // meta returned from api contains pagination info
    }
    return {
      success: false,
      message: result.message || "Failed to fetch products",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Failed to fetch products",
    };
  }
};

export const handleGetProductById = async (id: string) => {
  try {
    const result = await getProductById(id);
    if (result.success) {
      return { success: true, message: result.message, data: result.data };
    }
    return {
      success: false,
      message: result.message || "Failed to fetch product",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Failed to fetch product",
    };
  }
};

export const handleUpdateProduct = async (id: string, data: any) => {
  try {
    const result = await updateProduct(id, data);
    if (result.success) {
      revalidatePath("/admin/products");
      return { success: true, message: result.message, data: result.data };
    }
    return {
      success: false,
      message: result.message || "Failed to update product",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Failed to update product",
    };
  }
};

export const handleDeleteProduct = async (id: string) => {
  try {
    const result = await deleteProduct(id);
    if (result.success) {
      revalidatePath("/admin/products");
      return { success: true, message: result.message };
    }
    return {
      success: false,
      message: result.message || "Failed to delete product",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Failed to delete product",
    };
  }
};
