import { NextResponse } from "next/server";

/**
 * Contact form → Telegram Bot API (`sendMessage`).
 * Needs TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID in the environment.
 */

const clip = (value: unknown, max: number) =>
  typeof value === "string" ? value.trim().slice(0, max) : "";

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // Honeypot filled → pretend success so bots learn nothing.
  if (clip(body.website, 200)) return NextResponse.json({ ok: true });

  const name = clip(body.name, 100);
  const phone = clip(body.phone, 30);
  const messenger = clip(body.messenger, 30);
  const topic = clip(body.topic, 50);
  const message = clip(body.message, 2000);
  const source = clip(body.source, 200);

  if (name.length < 2 || phone.replace(/\D/g, "").length < 10 || body.consent !== true) {
    return NextResponse.json({ error: "Validation failed" }, { status: 422 });
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    console.error("[contact] TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID are not set");
    return NextResponse.json({ error: "Not configured" }, { status: 503 });
  }

  const text = [
    `📩 Нова заявка з сайту${topic ? ` · ${topic}` : ""}`,
    `Ім'я: ${name}`,
    `Телефон: ${phone}`,
    messenger && `Месенджер: ${messenger}`,
    message && `Питання: ${message}`,
    source && `Сторінка: ${source}`,
  ]
    .filter(Boolean)
    .join("\n");

  const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text }),
  });

  if (!response.ok) {
    console.error("[contact] Telegram responded", response.status);
    return NextResponse.json({ error: "Delivery failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
