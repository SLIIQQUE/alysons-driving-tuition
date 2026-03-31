import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

export async function POST(req: Request) {
  try {
    const { messages, systemInstruction } = await req.json();
    const apiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    
    if (!apiKey) {
      return NextResponse.json({ error: "Missing API key" }, { status: 500 });
    }
    
    const client = new GoogleGenAI({ apiKey });
    
    // Convert generic chat messages to Gemini API format
    const contents = messages.map((m: any) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }]
    }));

    const response = await client.models.generateContent({
      model: "gemini-3.0-flash",
      contents,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
        maxOutputTokens: 500,
      }
    });
    
    return NextResponse.json({ text: response.text });
  } catch (error) {
    console.error("Error generating chat response:", error);
    return NextResponse.json({ error: "Failed to generate response" }, { status: 500 });
  }
}
