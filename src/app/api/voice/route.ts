import { NextRequest, NextResponse } from "next/server";
import { model, SYSTEM_PROMPT } from "@/lib/gemini";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message, history = [] } = body;

    if (!message) {
      return NextResponse.json(
        { error: "No message provided" },
        { status: 400 }
      );
    }

    // Build conversation history for context
    const conversationHistory = history.map(
      (msg: { role: string; content: string }) =>
        `${msg.role === "user" ? "User" : "Assistant"}: ${msg.content}`
    );

    const fullPrompt = `${SYSTEM_PROMPT}

Conversation so far:
${conversationHistory.join("\n")}

User: ${message}

Assistant:`;

    // Generate response
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: fullPrompt }] }],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 500,
      },
    });

    const responseText = result.response.text();

    return NextResponse.json({
      response: responseText,
      success: true,
    });
  } catch (error) {
    console.error("Gemini API error:", error);
    return NextResponse.json(
      { error: "Failed to process message", details: String(error) },
      { status: 500 }
    );
  }
}
