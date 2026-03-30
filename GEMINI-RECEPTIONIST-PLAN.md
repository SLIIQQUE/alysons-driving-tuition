# AI Receptionist Integration Plan
## Alyson's Driving Tuition - In-App Gemini Live Voice Agent

---

## Overview

This plan outlines the implementation of an **in-app voice AI receptionist** using Google Gemini Live API. The agent runs directly in the browser (no phone line needed) and will answer business-related questions about driving lessons, pricing, and services, and automatically book lesson slots with email confirmations.

### Scope
- **Interface**: In-app voice (browser-based with microphone)
- **Trigger**: "Call Now" button on website
- **Functionality**: Answer FAQs, provide business info, book lessons automatically
- **Confirmation**: Automated email confirmation to customer
- **Timeline**: 1-2 weeks

---

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Website Visitor                       │
│                     (Browser + Microphone)                   │
└────────────────────────────┬────────────────────────────────┘
                             │
                             │ WebRTC Audio Stream
                             │
┌────────────────────────────▼────────────────────────────────┐
│                     Next.js Frontend                        │
│  ┌─────────────────┐  ┌─────────────────────────────────┐   │
│  │ Voice UI Component │  │ Gemini Live Client (WebRTC)   │   │
│  │ - Mic button     │  │ - Audio capture               │   │
│  │ - Waveform viz   │  │ - Real-time transcription     │   │
│  │ - Status display │  │ - Voice response             │   │
│  └─────────────────┘  └──────────────┬──────────────────┘   │
└───────────────────────────────────────┼──────────────────────┘
                                        │
                              Audio API Calls
                                        │
┌───────────────────────────────────────▼──────────────────────┐
│                     Next.js API Routes                       │
│  ┌─────────────────┐  ┌─────────────────────────────────┐   │
│  │ /api/voice     │  │ /api/book                      │   │
│  │ (Gemini proxy) │  │ (save booking + email)         │   │
│  └────────┬────────┘  └──────────────┬──────────────────┘   │
└───────────┼───────────────────────────┼──────────────────────┘
            │                           │
┌───────────▼───────────┐  ┌───────────▼──────────────────────┐
│   Gemini Live API     │  │   Booking Store + Email          │
│   (Voice AI)         │  │   (JSON file + Resend)           │
└──────────────────────┘  └──────────────────────────────────┘
```

---

## Business Knowledge Base

### Information the Agent Must Know

1. **Business Details**
   - Name: Alyson's Driving Tuition
   - Instructor: Alyson Baldwin (ADI, Grade A, 20+ years)
   - Location: Blackwood, South Wales
   - Phone: 01234 567890
   - Email: hello@alysonsdrivingtuition.co.uk

2. **Services & Pricing**
   - Standard Lesson: £40/hour
   - 10 Block Booking: £380 (£38/hr savings)
   - Intensive Course: From £600-£1200 depending on duration
   - Pass Plus: £200
   - Refresher Lessons: £40/hour

3. **Service Areas**
   - Blackwood, Tredegar, Risca, Newport, and surrounding South Wales areas

4. **Availability**
   - Mon-Fri: 9am - 6pm
   - Sat: 9am - 2pm
   - Sun: Closed

5. **Booking Process**
   - Collect: Name, phone, email, preferred date/time, service type
   - Confirm booking via email

---

## Implementation Steps

### Phase 1: Setup & Configuration (Day 1-2)

#### 1.1 Install Dependencies
```bash
pnpm add @google/generative-ai resend
pnpm add -D @types/node
```

#### 1.2 Environment Variables
Create `.env.local`:
```env
# Gemini (v1 API for Live Audio)
GEMINI_API_KEY=your_gemini_api_key

# Email (Resend - free tier available)
RESEND_API_KEY=re_xxxxxxxxxxxx
```

#### 1.3 Gemini Client Setup
```typescript
// src/lib/gemini-client.ts
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-exp",
  systemInstruction: `You are the friendly receptionist for Alyson's Driving Tuition...`,
});
```

---

### Phase 2: Voice UI Component (Day 2-4)

#### 2.1 Voice Button Component
```tsx
// src/components/VoiceAssistant.tsx
"use client";

import { useState, useRef, useEffect } from "react";

export default function VoiceAssistant() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [response, setResponse] = useState("");
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    
    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        audioChunksRef.current.push(event.data);
      }
    };

    mediaRecorder.onstop = async () => {
      const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
      await sendAudioToGemini(audioBlob);
    };

    mediaRecorderRef.current = mediaRecorder;
    mediaRecorder.start(100); // Collect in 100ms chunks
    setIsListening(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setIsListening(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Call Button */}
      <button
        onClick={isListening ? stopRecording : startRecording}
        className="w-16 h-16 bg-gradient-to-br from-amber-500 to-red-500 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
      >
        {isListening ? (
          <span className="animate-pulse">🎤</span>
        ) : (
          <span>📞</span>
        )}
      </button>
    </div>
  );
}
```

#### 2.2 Audio Processing
```typescript
// src/lib/audio-handler.ts

export async function sendAudioToGemini(audioBlob: Blob): Promise<string> {
  const formData = new FormData();
  formData.append("audio", audioBlob, "audio.webm");

  const response = await fetch("/api/voice", {
    method: "POST",
    body: formData,
  });

  const data = await response.json();
  return data.response;
}

export async function playAudioResponse(audioUrl: string) {
  const audio = new Audio(audioUrl);
  await audio.play();
}
```

---

### Phase 3: Gemini Live API Integration (Day 3-5)

#### 3.1 System Prompt
```typescript
const SYSTEM_PROMPT = `You are the friendly, professional receptionist for Alyson's Driving Tuition in South Wales.

KEY INFORMATION:
- Instructor: Alyson Baldwin, DVSA Approved, Grade A, 20+ years experience
- Location: Blackwood, South Wales
- Services: Standard lessons (£40/hr), Block bookings (£380/10hrs), Intensive courses (£600-£1200), Pass Plus (£200)
- Areas: Blackwood, Tredegar, Risca, Newport
- Hours: Mon-Fri 9am-6pm, Sat 9am-2pm

RESPONSE STYLE:
- Warm, conversational, professional
- Keep answers concise for voice (15-25 words)
- Confirm understanding by repeating key details
- Always offer to book a lesson

BOOKING PROCESS:
1. Ask for: name, phone number, email, preferred date/time, service type
2. Repeat booking details for confirmation
3. Say "I'll send you a confirmation email now"
4. End with: "See you soon for your lesson!"

NEVER:
- Discuss pricing negotiations
- Give specific test dates (DVSA controls this)
- Make up information you don't know

If asked something you don't know: "That's a great question - let me transfer you to Alyson directly."`;
```

#### 3.2 Voice API Route
```typescript
// src/app/api/voice/route.ts
import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const audioFile = formData.get("audio") as File;

  if (!audioFile) {
    return NextResponse.json(
      { error: "No audio file provided" },
      { status: 400 }
    );
  }

  try {
    // Convert audio to base64
    const arrayBuffer = await audioFile.arrayBuffer();
    const base64Audio = Buffer.from(arrayBuffer).toString("base64");

    // Initialize Gemini Live session
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash-exp",
    });

    // Send audio and get response
    const result = await model.generateContent([
      {
        inlineData: {
          mimeType: audioFile.type || "audio/webm",
          data: base64Audio,
        },
      },
      {
        text: SYSTEM_PROMPT,
      },
    ]);

    const responseText = result.response.text();

    return NextResponse.json({ response: responseText });
  } catch (error) {
    console.error("Gemini API error:", error);
    return NextResponse.json(
      { error: "Failed to process audio" },
      { status: 500 }
    );
  }
}
```

---

### Phase 4: Booking System (Day 5-7)

#### 4.1 Booking Schema
```typescript
// src/types/booking.ts
export interface Booking {
  id: string;
  customerName: string;
  phone: string;
  email: string;
  serviceType: "standard" | "block" | "intensive" | "pass-plus" | "refresher";
  preferredDate: string;
  preferredTime: string;
  notes?: string;
  status: "pending" | "confirmed" | "cancelled";
  createdAt: Date;
}
```

#### 4.2 Simple Booking Store (MVP)
```typescript
// src/lib/bookings.ts
import fs from "fs";
import path from "path";

const BOOKINGS_FILE = path.join(process.cwd(), "data", "bookings.json");

export async function saveBooking(booking: Booking): Promise<void> {
  const dir = path.dirname(BOOKINGS_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const existing = fs.existsSync(BOOKINGS_FILE)
    ? JSON.parse(fs.readFileSync(BOOKINGS_FILE, "utf-8"))
    : [];

  existing.push(booking);
  fs.writeFileSync(BOOKINGS_FILE, JSON.stringify(existing, null, 2));
}

export async function getBookings(): Promise<Booking[]> {
  if (!fs.existsSync(BOOKINGS_FILE)) return [];
  return JSON.parse(fs.readFileSync(BOOKINGS_FILE, "utf-8"));
}
```

#### 4.3 Booking API Route
```typescript
// src/app/api/book/route.ts
import { NextRequest, NextResponse } from "next/server";
import { saveBooking } from "@/lib/bookings";
import { sendBookingConfirmation } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    const booking = await req.json();

    // Add ID and timestamp
    const newBooking = {
      ...booking,
      id: crypto.randomUUID(),
      status: "confirmed" as const,
      createdAt: new Date().toISOString(),
    };

    // Save booking
    await saveBooking(newBooking);

    // Send confirmation email
    await sendBookingConfirmation(newBooking);

    return NextResponse.json({ success: true, booking: newBooking });
  } catch (error) {
    console.error("Booking error:", error);
    return NextResponse.json(
      { error: "Failed to create booking" },
      { status: 500 }
    );
  }
}
```

#### 4.4 Booking Confirmation Email
```typescript
// src/lib/email.ts
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendBookingConfirmation(booking: any) {
  return resend.emails.send({
    from: "Alyson's Driving Tuition <hello@alysonsdrivingtuition.co.uk>",
    to: booking.email,
    subject: "Lesson Booking Confirmed - Alyson's Driving Tuition",
    html: `
      <h1>Your lesson is confirmed!</h1>
      <p>Hi ${booking.customerName},</p>
      <p>Your driving lesson has been booked. Here are the details:</p>
      <ul>
        <li><strong>Service:</strong> ${booking.serviceType}</li>
        <li><strong>Date:</strong> ${booking.preferredDate}</li>
        <li><strong>Time:</strong> ${booking.preferredTime}</li>
      </ul>
      <p>Alyson will call you the day before to confirm.</p>
      <p>See you soon!</p>
    `,
  });
}
```

---

### Phase 5: Integration & UI Polish (Day 7-10)

#### 5.1 Voice UI Features
- Animated microphone button (pulsing when active)
- Real-time transcription display
- Voice waveform visualization
- Connection status indicator
- End call / start call states

#### 5.2 Placement Options
```tsx
// Option 1: Floating button (bottom-right)
<FloatingVoiceButton />

// Option 2: Dedicated call page
<Link href="/call">Talk to Us</Link>

// Option 3: Contact page integration
<ContactPageWithVoice />
```

#### 5.3 Testing Checklist
- [ ] Microphone permission request works
- [ ] Audio recording captures correctly
- [ ] Gemini understands various accents
- [ ] Voice responses play back
- [ ] Booking flow works end-to-end
- [ ] Email confirmation sends
- [ ] Works on mobile browsers
- [ ] Works on desktop browsers

---

### Phase 6: Production Deployment (Day 10-14)

#### 6.1 Required Checks
- [ ] All environment variables set
- [ ] Domain SSL certified
- [ ] Email sending works (check spam folder)
- [ ] Works on HTTPS (required for getUserMedia)
- [ ] Error logging active

#### 6.2 Fallback Protocol
If voice fails, show a contact form as backup.

---

## Configuration Options

| Option | Default | Description |
|--------|---------|-------------|
| `GEMINI_MODEL` | gemini-2.0-flash-exp | Model to use |
| `AUDIO_CHUNK_MS` | 100 | Audio chunk size |
| `BOOKING_SLOTS` | 9am-6pm Mon-Fri | Available times |
| `OUT_OF_HOURS_MSG` | (configured) | Message when closed |

---

## File Structure

```
src/
├── components/
│   ├── VoiceAssistant.tsx      # Main voice UI
│   ├── VoiceButton.tsx         # Floating call button
│   └── VoiceWaveform.tsx      # Audio visualization
├── app/
│   ├── api/
│   │   ├── voice/
│   │   │   └── route.ts       # Gemini voice handler
│   │   └── book/
│   │       └── route.ts       # Booking handler
│   └── contact/
│       └── page.tsx            # Contact page with voice
├── lib/
│   ├── gemini-client.ts        # Gemini setup
│   ├── bookings.ts             # Booking storage
│   ├── email.ts                # Email confirmations
│   └── audio-handler.ts        # Audio processing
├── types/
│   └── booking.ts              # Booking types
└── data/
    └── bookings.json           # (MVP storage)
```

---

## Cost Estimate

| Service | Estimated Monthly Cost |
|---------|----------------------|
| Gemini API | £20-50 (usage-based) |
| Resend (email) | Free (first 3,000/month) |
| **Total** | **£20-50/month** |

> **Note**: No Twilio or phone costs since this is in-app voice only.

---

## Common Issues & Fixes

1. **Microphone permission denied**
   - Show clear instructions to enable mic
   - Provide alternative (contact form)

2. **Gemini doesn't understand accents**
   - Add training examples to system prompt
   - Suggest user speak clearly

3. **Audio not playing back**
   - Check browser autoplay policies
   - Use Audio element with user gesture

4. **Emails going to spam**
   - Set up proper DKIM/SPF records
   - Use consistent "From" address

5. **Mobile browser issues**
   - Test on iOS Safari and Android Chrome
   - Some WebRTC features limited on mobile

---

## Next Steps

1. **Approve this plan** - Confirm scope and approach
2. **Gather credentials** - Get Gemini API key, Resend API key
3. **Start implementation** - Begin Phase 1 setup

---

## Questions?

- Want to add chat alongside voice?
- Need calendar integration (Google/Outlook)?
- Want to add human handoff option?
