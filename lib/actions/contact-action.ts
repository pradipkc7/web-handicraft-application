"use server";
import { sendContactMessage } from "@/lib/api/contact";

const getErrorMessage = (error: unknown, fallback: string) =>
  error instanceof Error ? error.message : fallback;

export const handleSendContactMessage = async (data: {
  name: string;
  email: string;
  message: string;
}) => {
  try {
    const result = await sendContactMessage(data);
    if (result.success) {
      return { success: true, message: result.message || "Message sent successfully" };
    }
    return { success: false, message: result.message || "Failed to send message" };
  } catch (error: unknown) {
    return { success: false, message: getErrorMessage(error, "Failed to send message") };
  }
};
