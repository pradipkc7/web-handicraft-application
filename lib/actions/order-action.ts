"use server";
import {
  addCartItem,
  CartItemSyncError,
  clearBackendCart,
  createOrder,
  getMyOrders,
  verifyOrderPayment,
  CreateOrderPayload,
} from "@/lib/api/order";
import { CartItem } from "@/lib/contexts/CartContext";

const getErrorMessage = (error: unknown, fallback: string) =>
  error instanceof Error ? error.message : fallback;

export const handlePlaceOrder = async ({
  items,
  shippingLocation,
  paymentMethod,
}: {
  items: CartItem[];
  shippingLocation: string;
  paymentMethod: "cod" | "khalti";
}) => {
  try {
    // The backend builds the order from its own server-side cart, so sync the
    // client (guest-friendly, localStorage) cart into it first.
    try {
      await clearBackendCart();
    } catch (error: unknown) {
      if (error instanceof CartItemSyncError && error.status === 401) {
        return { success: false, message: "Your session has expired. Please log in again." };
      }
      throw error;
    }

    const unavailable: { productId: string; name: string }[] = [];
    for (const item of items) {
      try {
        await addCartItem(item.productId, item.quantity);
      } catch (error: unknown) {
        // Only 404 (product gone) / 409 (out of stock) mean the item is
        // actually unavailable. Other failures (auth, network, 5xx) aren't
        // the item's fault, so don't wipe it from the cart for those.
        const status = error instanceof CartItemSyncError ? error.status : undefined;
        console.error("Cart sync failed for item:", {
          productId: item.productId,
          name: item.name,
          quantity: item.quantity,
          status,
          message: error instanceof Error ? error.message : error,
        });
        if (status === 401) {
          return { success: false, message: "Your session has expired. Please log in again." };
        }
        if (status === 404 || status === 409) {
          unavailable.push({ productId: item.productId, name: item.name });
          continue;
        }
        throw error;
      }
    }

    if (unavailable.length > 0) {
      const names = unavailable.map((i) => i.name).join(", ");
      const verb = unavailable.length > 1 ? "are" : "is";
      return {
        success: false,
        message: `${names} ${verb} no longer available and ${unavailable.length > 1 ? "have" : "has"} been removed from your cart.`,
        unavailableProductIds: unavailable.map((i) => i.productId),
      };
    }

    const payload: CreateOrderPayload = { shippingLocation, paymentMethod };
    const result = await createOrder(payload);
    if (!result.success) {
      return { success: false, message: result.message || "Failed to place order" };
    }

    return {
      success: true,
      order: result.data?.order,
      paymentUrl: result.data?.paymentUrl,
    };
  } catch (error: unknown) {
    return { success: false, message: getErrorMessage(error, "Failed to place order") };
  }
};

export const handleGetMyOrders = async () => {
  try {
    const orders = await getMyOrders();
    return { success: true, orders };
  } catch (error: unknown) {
    return { success: false, message: getErrorMessage(error, "Failed to fetch orders") };
  }
};

export const handleVerifyOrderPayment = async (pidx: string) => {
  try {
    const result = await verifyOrderPayment(pidx);
    if (!result.success) {
      return { success: false, message: result.message || "Failed to verify payment" };
    }
    const order = result.data;
    return {
      success: true,
      paid: order?.paymentStatus === "completed",
      status: order?.paymentStatus,
      order,
    };
  } catch (error: unknown) {
    return { success: false, message: getErrorMessage(error, "Failed to verify payment") };
  }
};
