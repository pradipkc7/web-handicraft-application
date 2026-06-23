"use server";

import { cookies } from "next/headers";

const getErrorMessage = (error: unknown) =>
  error instanceof Error ? error.message : "Cookie operation failed";

export const setTokenCookie = async (token: string) => {
  try {
    const cookieStore = await cookies();
    cookieStore.set("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: "/",
    });
    return { success: true };
  } catch (error: unknown) {
    console.error("Error setting token cookie:", error);
    return { success: false, message: getErrorMessage(error) };
  }
};

export const storeUserData = async (user: unknown) => {
  try {
    const cookieStore = await cookies();
    cookieStore.set("userData", JSON.stringify(user), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: "/",
    });
    return { success: true };
  } catch (error: unknown) {
    console.error("Error storing user data:", error);
    return { success: false, message: getErrorMessage(error) };
  }
};

export const getTokenCookie = async () => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("authToken");
    return token?.value || null;
  } catch (error: unknown) {
    console.error("Error getting token cookie:", error);
    return null;
  }
};

export const getUserData = async () => {
  try {
    const cookieStore = await cookies();
    const userData = cookieStore.get("userData");
    return userData?.value ? JSON.parse(userData.value) : null;
  } catch (error: unknown) {
    console.error("Error getting user data:", error);
    return null;
  }
};
export const getUserInfoCookie = async () => {
  const cookieStore = await cookies();
  const userInfoStr = cookieStore.get("user_data")?.value || null;
  return userInfoStr ? JSON.parse(userInfoStr) : null; // convert string back to obj
};

export const clearAuthCookies = async () => {
  try {
    const cookieStore = await cookies();
    cookieStore.delete("authToken");
    cookieStore.delete("userData");
    return { success: true };
  } catch (error: unknown) {
    console.error("Error clearing auth cookies:", error);
    return { success: false, message: getErrorMessage(error) };
  }
};
