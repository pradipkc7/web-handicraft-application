import { NextRequest, NextResponse } from "next/server";

type ChatMessage = { role: "user" | "assistant" | "system"; content: string };

const SYSTEM_PROMPT =
  "You are the customer support assistant for Nepal Handicraft, an online store selling authentic handmade Nepali crafts. Be concise and friendly, and help with product, order, and shipping questions.";

export async function POST(request: NextRequest) {
  const { messages } = (await request.json()) as { messages: ChatMessage[] };

  const apiKey = process.env.CHAT_API_KEY;
  if (!apiKey) {
    return NextResponse.json({
      reply:
        "The chat assistant isn't configured yet — add CHAT_API_KEY in .env to enable it.",
    });
  }

  const apiBase =
    process.env.CHAT_API_URL || "https://generativelanguage.googleapis.com/v1beta";
  const model = process.env.CHAT_MODEL || "gemini-2.5-flash";

  try {
    const response = await fetch(`${apiBase}/models/${model}:generateContent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": apiKey,
      },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
        contents: messages.map((m) => ({
          role: m.role === "assistant" ? "model" : "user",
          parts: [{ text: m.content }],
        })),
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(errText || `Chat API responded with ${response.status}`);
    }

    const data = await response.json();
    const reply: string =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ??
      "Sorry, I couldn't come up with a response just now.";

    return NextResponse.json({ reply });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Chat request failed";
    return NextResponse.json({ reply: `Sorry, something went wrong: ${message}` }, { status: 502 });
  }
}
