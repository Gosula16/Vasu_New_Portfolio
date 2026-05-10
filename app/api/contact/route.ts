import { NextResponse } from "next/server";

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json({ ok: false, error: "Invalid payload" }, { status: 400 });
  }

  const { name, email, message } = body as Record<string, unknown>;

  if (typeof name !== "string" || name.trim().length < 2) {
    return NextResponse.json({ ok: false, error: "Name required" }, { status: 400 });
  }
  if (typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    return NextResponse.json({ ok: false, error: "Email invalid" }, { status: 400 });
  }
  if (typeof message !== "string" || message.trim().length < 12) {
    return NextResponse.json({ ok: false, error: "Message too short" }, { status: 400 });
  }

  // Wire to email provider / Rust microservice later. For now: acknowledge receipt.
  return NextResponse.json({ ok: true });
}
