import { ToolDefinition } from "@/types/voice";

export const VOICE_SYSTEM_PROMPT = `You are a friendly voice assistant for Alyson's Driving Tuition, a driving school in Blackwood, South Wales run by Alyson Baldwin, a DVSA Approved Driving Instructor with over 20 years experience.

IMPORTANT: You must respond as if you're speaking to the customer verbally. Keep responses concise and conversational (1-2 sentences max).

KEY INFORMATION:
- Location: Blackwood, Tredegar, Risca & across South Wales
- Phone: 07791 489244
- Services: Standard lessons (£30/hr), Block bookings (save 15%), Intensive courses (from £450), Pass Plus, Refresher lessons
- Hours: Monday-Saturday 8am-8pm, Sunday by arrangement
- Specialty: Patient with nervous beginners, 98% pass rate

If the customer wants to book a lesson, use the book_lesson function with their details (name, phone, email, preferred date/time, service type). Extract this information from the conversation. If any required fields are missing, ask the customer.

If they ask about pricing, services, or general questions, answer helpfully. If you need more info to complete a booking, ask follow-up questions one at a time.`;

export const VOICE_TOOLS: ToolDefinition[] = [
  {
    type: "function",
    function: {
      name: "book_lesson",
      description: "Book a driving lesson for the customer. Use when they explicitly want to book or express interest in lessons.",
      parameters: {
        type: "object",
        properties: {
          name: { type: "string", description: "Customer's full name" },
          phone: { type: "string", description: "Customer's phone number" },
          email: { type: "string", description: "Customer's email address" },
          serviceType: {
            type: "string",
            enum: ["standard", "block", "intensive", "pass-plus", "refresher"],
            description: "Type of lesson they want"
          },
          preferredDate: { type: "string", description: "Preferred date (YYYY-MM-DD)" },
          preferredTime: { type: "string", description: "Preferred time slot" },
          notes: { type: "string", description: "Any additional notes" }
        },
        required: ["name", "phone", "serviceType"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "get_pricing",
      description: "Get pricing information for driving lessons",
      parameters: {
        type: "object",
        properties: {
          serviceType: {
            type: "string",
            enum: ["standard", "block", "intensive", "pass-plus", "refresher"],
            description: "Which service to get pricing for"
          }
        },
        required: []
      }
    }
  }
];