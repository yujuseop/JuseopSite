"use client";

import { useState } from "react";
import { post } from "@/utils/apiClient";

interface FormState {
  name: string;
  email: string;
  message: string;
}

export default function ContactForm() {
  const [form, setForm] = useState<FormState>({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    try {
      await post("/api/contact", form);
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "전송 중 오류가 발생했습니다.");
    }
  };

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-green-200 bg-green-50 dark:bg-green-500/10 dark:border-green-500/20 p-8 text-center space-y-2">
        <p className="text-2xl">✉️</p>
        <p className="font-semibold text-green-700 dark:text-green-400">메시지가 전송되었습니다!</p>
        <p className="text-sm text-muted-foreground">빠른 시일 내에 답변 드리겠습니다.</p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-4 text-sm text-blue-600 underline"
        >
          다시 보내기
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-1">
          이름 <span className="text-red-500">*</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          maxLength={100}
          value={form.name}
          onChange={handleChange}
          placeholder="홍길동"
          className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-1">
          이메일 <span className="text-red-500">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          maxLength={200}
          value={form.email}
          onChange={handleChange}
          placeholder="example@email.com"
          className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-1">
          메시지 <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          maxLength={2000}
          rows={6}
          value={form.message}
          onChange={handleChange}
          placeholder="전하고 싶은 내용을 자유롭게 작성해 주세요."
          className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />
        <p className="text-right text-xs text-muted-foreground mt-1">
          {form.message.length} / 2000
        </p>
      </div>

      {errorMsg && <p className="text-sm text-red-500">{errorMsg}</p>}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full rounded-full bg-blue-600 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"
      >
        {status === "loading" ? "전송 중..." : "메시지 보내기"}
      </button>
    </form>
  );
}
