"use client";

import { useState, useTransition } from "react";
import { toast } from "react-toastify";
import { handleSendContactMessage } from "@/lib/actions/contact-action";

const fieldClass =
  "h-10 w-full rounded-lg border border-stone-300 bg-white px-3 text-sm text-stone-900 outline-none transition focus:border-amber-700 focus:ring-1 focus:ring-amber-700";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isPending, startTransition] = useTransition();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    startTransition(async () => {
      const result = await handleSendContactMessage({ name, email, message });
      if (!result.success) {
        toast.error(result.message || "Failed to send message");
        return;
      }
      toast.success(result.message || "Message sent successfully");
      setName("");
      setEmail("");
      setMessage("");
    });
  };

  return (
    <form onSubmit={onSubmit} className="mt-6 space-y-4">
      <div>
        <label className="mb-1 block text-xs font-medium text-stone-600">
          Name
        </label>
        <input
          required
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={fieldClass}
          placeholder="Your name"
        />
      </div>
      <div>
        <label className="mb-1 block text-xs font-medium text-stone-600">
          Email
        </label>
        <input
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={fieldClass}
          placeholder="you@example.com"
        />
      </div>
      <div>
        <label className="mb-1 block text-xs font-medium text-stone-600">
          Message
        </label>
        <textarea
          required
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm text-stone-900 outline-none transition focus:border-amber-700 focus:ring-1 focus:ring-amber-700"
          placeholder="How can we help?"
        />
      </div>
      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-lg bg-amber-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-amber-800 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isPending ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}
