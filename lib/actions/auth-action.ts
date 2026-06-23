"use server"; // server side api call
import {
  register,
  login,
  updatePassword,
  updateProfile,
  whoami,
} from "@/lib/api/auth";

import {
  LoginFormData,
  RegisterFormData,
} from "@/app/(auth)/_components/schema";
import { clearAuthCookies, setTokenCookie, storeUserData } from "@/lib/cookies";
import { revalidatePath } from "next/cache";
import { redirect, RedirectType } from "next/navigation";
import { UpdatePasswordFormData } from "@/app/dashboard/_components/schema";

const getActionErrorMessage = (error: unknown, fallback: string) =>
  error instanceof Error ? error.message : fallback;

export const handleRegisterUser = async (data: RegisterFormData) => {
  try {
    // how to handle data from component and how to send to component
    const result = await register(data);
    if (result.success) {
      return { success: true, message: result.message, data: result.data };
    } else {
      return {
        success: false,
        message: result.message || "Registration failed",
      };
    }
  } catch (error: unknown) {
    console.error("Register action error:", error);
    return {
      success: false,
      message: getActionErrorMessage(error, "Registration failed"),
    };
  }
};
export const handleLoginUser = async (data: LoginFormData) => {
  try {
    // how to handle data from component and how to send to component
    const result = await login(data);
    // set cookie
    const user = result.data.user;
    const token = result.data.token;
    await setTokenCookie(token);
    await storeUserData(user);

    if (result.success) {
      return { success: true, message: result.message, data: result.data };
    } else {
      return { success: false, message: result.message || "Login failed" };
    }
  } catch (error: unknown) {
    console.error("Login action error:", error);
    return {
      success: false,
      message: getActionErrorMessage(error, "Login failed"),
    };
  }
};
export const handleUserDetails = async () => {
  try {
    const result = await whoami();
    if (result.success) {
      return { success: true, message: result.message, data: result.data };
    } else {
      return {
        success: false,
        message: result.message || "Failed to fetch user details",
      };
    }
  } catch (error: unknown) {
    return {
      success: false,
      message: getActionErrorMessage(error, "Failed to fetch user details"),
    };
  }
};

export const handleUpdateProfile = async (formData: FormData) => {
  try {
    const result = await updateProfile(formData);
    if (result.success) {
      const updatedUser = result.data?.user || result.data;
      if (updatedUser) {
        await storeUserData(updatedUser);
      }
      await revalidatePath("/dashboard/profile"); // Revalidate the profile page after successful update
      return { success: true, message: result.message, data: result.data };
    } else {
      return {
        success: false,
        message: result.message || "Failed to update profile",
      };
    }
  } catch (error: unknown) {
    return {
      success: false,
      message: getActionErrorMessage(error, "Failed to update profile"),
    };
  }
};

export const handleUpdatePassword = async (data: UpdatePasswordFormData) => {
  try {
    const result = await updatePassword(data);
    if (result.success) {
      return { success: true, message: result.message, data: result.data };
    } else {
      return {
        success: false,
        message: result.message || "Failed to update password",
      };
    }
  } catch (error: unknown) {
    return {
      success: false,
      message: getActionErrorMessage(error, "Failed to update password"),
    };
  }
};

export const handleLogout = async () => {
  // Clear cookies or tokens here
  // donot use try/catch, redirect is treated as an exception in nextjs server component
  await clearAuthCookies();
  redirect("/login", RedirectType.replace);
};
