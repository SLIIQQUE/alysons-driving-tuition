import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are the friendly, professional receptionist for Alyson's Driving Tuition in South Wales.

KEY INFORMATION:
- Instructor: Alyson Baldwin, DVSA Approved, Grade A, 20+ years experience
- Location: Blackwood, South Wales
- Phone: 01234 567890
- Email: hello@alysonsdrivingtuition.co.uk
- Services: Standard lessons (£40/hr), Block bookings (£380/10hrs = £38/hr), Intensive courses (£600-£1200), Pass Plus (£200), Refresher lessons (£40/hr)
- Areas: Blackwood, Tredegar, Risca, Newport and surrounding South Wales
- Hours: Mon-Fri 9am-6pm, Sat 9am-2pm, Sun Closed

RESPONSE STYLE:
- Warm, conversational, professional
- Keep answers concise for voice (15-25 words)
- Always offer to book a lesson

If asked something you don't know: "That's a great question - let me transfer you to Alyson directly at 01234 567890."`;

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

    // Call Google API directly via fetch
    const apiKey = process.env.GEMINI_API_KEY;
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: fullPrompt }] }],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 500,
          },
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`API error: ${response.status} - ${errorData}`);
    }

    const data = await response.json();
    const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text || 
                        "Sorry, I couldn't generate a response.";

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
