"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Button from "@/components/shared/ui/Button";
import Field, { fieldControl } from "@/components/shared/ui/Field";

const messengers = ["Telegram", "Viber", "WhatsApp", "Дзвінок"];

type Status = "idle" | "sending" | "success" | "error";
type Errors = Partial<Record<"name" | "phone" | "consent", string>>;

/** Shared form: home, /contacts, /size-guide. Delivers to Telegram via /api/contact. */
export default function ContactForm({
  defaultTopic,
  messagePlaceholder = "Ваше питання: зріст і вік дитини, модель, що цікавить…",
  submitDecor,
}: {
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
      topic: defaultTopic ?? "",
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
        <p className="u-display text-[20px]">Дякуємо!</p>
        <p className="u-body mt-5">
          Ми отримали ваше повідомлення й зв&apos;яжемося найближчим часом у
          зручному для вас месенджері.
        </p>
        <Button variant="text-link" onClick={() => setStatus("idle")} className="mt-9">
          Надіслати ще одне
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="grid gap-4 sm:grid-cols-2">
      <Field label="Ім'я" error={errors.name}>
        <input
          name="name"
          autoComplete="given-name"
          aria-invalid={Boolean(errors.name)}
          className={fieldControl({ invalid: Boolean(errors.name) })}
        />
      </Field>

      <Field label="Телефон" error={errors.phone}>
        <input
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="+380"
          aria-invalid={Boolean(errors.phone)}
          className={fieldControl({ invalid: Boolean(errors.phone) })}
        />
      </Field>

      <fieldset className="sm:col-span-2">
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

      <Field label="Питання" className="sm:col-span-2">
        <textarea
          name="message"
          rows={4}
          placeholder={messagePlaceholder}
          className={fieldControl({ className: "resize-y" })}
        />
      </Field>

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
        <Button type="submit" disabled={status === "sending"}>
          {status === "sending" ? "Надсилаємо…" : "Надіслати"}
        </Button>
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
