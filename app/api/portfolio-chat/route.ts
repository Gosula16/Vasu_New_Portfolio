import { NextResponse } from "next/server";
import {
  achievements,
  blogPosts,
  certifications,
  education,
  experience,
  personal,
  projects,
  services,
  siteConfig,
  skillCategories,
  stats,
} from "@/lib/data";

export const runtime = "nodejs";

const GEMINI_MODEL = "gemini-2.5-flash";
const GEMINI_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

type GeminiPart = {
  text?: string;
};

type GeminiResponse = {
  candidates?: Array<{
    content?: {
      parts?: GeminiPart[];
    };
    finishReason?: string;
  }>;
  error?: {
    message?: string;
  };
};

const portfolioContext = JSON.stringify(
  {
    site: siteConfig,
    personal,
    education,
    stats,
    skills: skillCategories,
    projects,
    experience,
    certifications,
    achievements,
    services,
    blogPosts,
  },
  null,
  2
);

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

  const { message } = body as Record<string, unknown>;
  if (typeof message !== "string" || message.trim().length < 2) {
    return NextResponse.json({ ok: false, error: "Ask a longer question." }, { status: 400 });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      {
        ok: false,
        error: "Gemini is not configured yet. Add GEMINI_API_KEY to the deployment environment.",
      },
      { status: 503 }
    );
  }

  const prompt = [
    "You are the portfolio assistant for Gosula Venkata Vasu.",
    "Answer only using the portfolio facts below. If the user asks for something unrelated, politely steer back to Vasu's portfolio, skills, projects, education, contact, resume, certifications, or experience.",
    "Keep replies friendly, direct, and concise. Use first person as Vasu when natural. Do not invent facts.",
    "",
    "Portfolio facts:",
    portfolioContext,
    "",
    `Visitor question: ${message.trim()}`,
  ].join("\n");

  try {
    const response = await fetch(GEMINI_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": apiKey,
      },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [{ text: prompt }],
          },
        ],
        generationConfig: {
          temperature: 0.35,
          maxOutputTokens: 220,
        },
      }),
    });

    const data = (await response.json()) as GeminiResponse;
    if (!response.ok) {
      return NextResponse.json(
        {
          ok: false,
          error: data.error?.message ?? "Gemini request failed.",
        },
        { status: response.status }
      );
    }

    const answer = data.candidates?.[0]?.content?.parts
      ?.map((part) => part.text ?? "")
      .join("")
      .trim();

    if (!answer) {
      return NextResponse.json(
        { ok: false, error: "Gemini returned an empty response." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true, answer });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Unable to reach Gemini right now." },
      { status: 502 }
    );
  }
}
