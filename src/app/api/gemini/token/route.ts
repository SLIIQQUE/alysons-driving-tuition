import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

export async function POST() {
  try {
    const apiKey =
      process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "Missing API key" }, { status: 500 });
    }

    // For now, return the API key directly as the token
    // In production, you might want to implement proper token-based auth
    return NextResponse.json({ token: apiKey });
  } catch (error) {
    console.error("Error creating token:", error);
    return NextResponse.json(
      { error: "Failed to create token" },
      { status: 500 },
    );
  }
}
