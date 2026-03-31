import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

export async function POST() {
  try {
    const apiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "Missing API key" }, { status: 500 });
    }
    
    // Server-side initialization
    const client = new GoogleGenAI({ apiKey });
    const expireTime = new Date(Date.now() + 30 * 60 * 1000).toISOString();
    
    // Create an ephemeral token
    const token = await client.authTokens.create({
      config: {
        uses: 1, 
        expireTime: expireTime,
        newSessionExpireTime: new Date(Date.now() + 1 * 60 * 1000).toISOString(),
        httpOptions: { apiVersion: "v1alpha" },
      }
    });
    
    return NextResponse.json({ token: token.name });
  } catch (error) {
    console.error("Error creating ephemeral token:", error);
    return NextResponse.json({ error: "Failed to create token" }, { status: 500 });
  }
}
