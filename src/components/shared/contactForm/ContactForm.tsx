"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const messengers = ["Telegram", "Viber", "WhatsApp", "Дзвінок"];

export const contactTopics = [
  "Розмір",
  "Замовлення",
  "Обмін",
  "Співпраця",
  "Інше",
];

type Status = "idle" | "sending" | "success" | "error";
type Errors = Partial<Record<"name" | "phone" | "consent", string>>;

const fieldClass =
  "w-full border border-line bg-surface px-4 py-3.5 text-[14px] outline-none transition placeholder:text-muted/70 focus:border-ink";

/** Shared form: home, /contacts, /size-guide. Delivers to Telegram via /api/contact. */
export default function ContactForm({
  withTopic = false,
  defaultTopic,
  messagePlaceholder = "Ваше питання: зріст і вік дитини, модель, що цікавить…",
  submitDecor,
}: {
  withTopic?: boolean;
  defaultTopic?: string;
  messagePlaceholder?: string;
  submitDecor?: React.ReactNode;
}) {
  const pathname = usePathname();
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    const payload = {
      name: String(data.get("name") ?? "").trim(),
      phone: String(data.get("phone") ?? "").trim(),
      messenger: String(data.get("messenger") ?? ""),
      topic: String(data.get("topic") ?? defaultTopic ?? ""),
      message: String(data.get("message") ?? "").trim(),
      consent: data.get("consent") === "on",
      website: String(data.get("website") ?? ""),
      source: pathname,
    };

    const nextErrors: Errors = {};
    if (payload.name.length < 2) nextErrors.name = "Вкажіть ім'я";
    if (payload.phone.replace(/\D/g, "").length < 10)
      nextErrors.phone = "Вкажіть номер телефону";
    if (!payload.consent) nextErrors.consent = "Потрібна згода";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("sending");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error(String(response.status));
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="border border-line bg-surface p-8 lg:p-10" role="status">
        <p className="u-display text-[28px] leading-[1.15]">Дякуємо!</p>
        <p className="mt-3 text-[13px] leading-relaxed text-muted">
          Ми отримали ваше повідомлення й зв&apos;яжемося найближчим часом у
          зручному для вас месенджері.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="u-label mt-6 border-b border-ink pb-1"
        >
          Надіслати ще одне
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="grid gap-4 sm:grid-cols-2">
      <label className="block">
        <span className="u-label mb-2 block text-muted">Ім&apos;я</span>
        <input
          name="name"
          autoComplete="given-name"
          aria-invalid={Boolean(errors.name)}
          className={cn(fieldClass, errors.name && "border-clay")}
        />
        {errors.name && (
          <span className="mt-1.5 block text-[11px] text-clay">{errors.name}</span>
        )}
      </label>

      <label className="block">
        <span className="u-label mb-2 block text-muted">Телефон</span>
        <input
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="+380"
          aria-invalid={Boolean(errors.phone)}
          className={cn(fieldClass, errors.phone && "border-clay")}
        />
        {errors.phone && (
          <span className="mt-1.5 block text-[11px] text-clay">{errors.phone}</span>
        )}
      </label>

      <fieldset className={cn(!withTopic && "sm:col-span-2")}>
        <legend className="u-label mb-2 block text-muted">Зручний месенджер</legend>
        <div className="flex flex-wrap gap-1.5">
          {messengers.map((messenger, index) => (
            <label key={messenger} className="cursor-pointer">
              <input
                type="radio"
                name="messenger"
                value={messenger}
                defaultChecked={index === 0}
                className="peer sr-only"
              />
              <span className="block border border-line bg-surface px-3.5 py-2.5 text-[12px] leading-none transition peer-checked:border-ink peer-checked:bg-ink peer-checked:text-bg peer-focus-visible:border-ink">
                {messenger}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      {withTopic && (
        <label className="block">
          <span className="u-label mb-2 block text-muted">Тема</span>
          <select
            name="topic"
            defaultValue={defaultTopic ?? contactTopics[0]}
            className={fieldClass}
          >
            {contactTopics.map((topic) => (
              <option key={topic}>{topic}</option>
            ))}
          </select>
        </label>
      )}

      <label className="block sm:col-span-2">
        <span className="u-label mb-2 block text-muted">Питання</span>
        <textarea
          name="message"
          rows={4}
          placeholder={messagePlaceholder}
          className={cn(fieldClass, "resize-y")}
        />
      </label>

      {/* Honeypot: invisible to people, irresistible to bots. */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="absolute -left-[9999px] size-px opacity-0"
      />

      <label className="flex items-start gap-3 text-[12px] leading-relaxed text-muted sm:col-span-2">
        <input
          type="checkbox"
          name="consent"
          className="mt-0.5 size-4 shrink-0 accent-ink"
        />
        <span>
          Погоджуюсь на обробку персональних даних відповідно до{" "}
          <Link href="/privacy" className="text-ink underline underline-offset-2">
            політики конфіденційності
          </Link>
          {errors.consent && (
            <span className="ml-2 text-clay">{errors.consent}</span>
          )}
        </span>
      </label>

      <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
        <button
          type="submit"
          disabled={status === "sending"}
          className="u-label border border-ink bg-ink px-8 py-4 text-bg transition duration-300 hover:bg-transparent hover:text-ink disabled:opacity-60"
        >
          {status === "sending" ? "Надсилаємо…" : "Надіслати"}
        </button>
        {status === "error" && (
          <p className="text-[12px] text-clay" role="alert">
            Не вдалося надіслати. Спробуйте ще раз або напишіть нам у Telegram.
          </p>
        )}
        {submitDecor}
      </div>
    </form>
  );
}
