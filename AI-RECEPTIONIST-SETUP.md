# AI Receptionist Setup Guide

## Quick Start

### API Keys Required
- **Gemini API Key**: From [Google AI Studio](https://aistudio.google.com/app/apikey)
- **Resend API Key**: From [Resend](https://resend.com)

### Environment Variables
```env
GEMINI_API_KEY=your_gemini_api_key
RESEND_API_KEY=re_xxxxxxxxxxxx
```

---

## Important: Model Selection

### ❌ Models That DON'T Work
- `gemini-2.0-flash-exp` - Not found
- `gemini-1.5-flash` - Not found (version mismatch)
- `gemini-3.1-flash-live-preview` - Only supports WebSocket (`bidiGenerateContent`), not regular API

### ✅ Working Model
```typescript
// API endpoint: v1/models/gemini-2.5-flash:generateContent
```

This model is:
- Available on both v1 and v1beta APIs
- Supports regular `generateContent` method
- Free tier eligible (with billing enabled)
- Multimodal and fast

---

## API Endpoints

### Voice/Chat API
```
POST /api/voice
Body: { message: string, history?: Message[] }
Response: { response: string, success: boolean }
```

### Booking API
```
POST /api/book
Body: {
  customerName: string,
  phone: string,
  email: string,
  serviceType: "standard" | "block" | "intensive" | "pass-plus" | "refresher",
  preferredDate: string,
  preferredTime: string,
  notes?: string
}
Response: { success: true, booking: Booking }
```

---

## Troubleshooting

### Error: "limit: 0" / Quota Exceeded
**Cause**: API key has no quota (no billing enabled)

**Fix**: 
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Enable billing on your project
3. Or use a different API key with quota

### Error: "models/xxx is not found"
**Cause**: Wrong model name or API version

**Fix**: Use `gemini-2.5-flash` with v1 endpoint:
```
https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent
```

### Error: "models/xxx is not found for API version v1beta"
**Cause**: Model doesn't exist in v1beta

**Fix**: Use v1 endpoint with available model

---

## List Available Models

To see what models are available for your API key:
```bash
curl "https://generativelanguage.googleapis.com/v1/models?key=YOUR_API_KEY"
```

Or v1beta:
```bash
curl "https://generativelanguage.googleapis.com/v1beta/models?key=YOUR_API_KEY"
```

---

## Key Files

| File | Purpose |
|------|---------|
| `src/lib/gemini.ts` | Gemini client setup with system prompt |
| `src/app/api/voice/route.ts` | Chat API endpoint |
| `src/app/api/book/route.ts` | Booking API endpoint |
| `src/components/VoiceAssistant.tsx` | UI component |
| `src/lib/email.ts` | Confirmation emails |
| `src/lib/bookings.ts` | JSON file storage |

---

## Voice Features

### Current Implementation
- **Text input**: Type messages
- **Voice input**: Web Speech API (browser-native)
- **Voice output**: SpeechSynthesis API (browser-native)

### For Full Voice-to-Voice (Real-time)
The current implementation uses browser APIs for voice. For true real-time voice with Gemini Live API:
- Requires WebSocket connection (`bidiGenerateContent`)
- Uses `gemini-3.1-flash-live-preview` via WebSocket
- Needs ephemeral token generation
- More complex setup (partner integrations like LiveKit recommended)

---

## Billing Notes

- **Gemini API**: Requires billing enabled on Google Cloud project
- **Resend**: Free tier (3,000 emails/month)
- **No Twilio needed**: Using in-app voice only

---

## Last Updated
March 30, 2026

**Working Model**: `gemini-2.5-flash`
**API Version**: `v1`
