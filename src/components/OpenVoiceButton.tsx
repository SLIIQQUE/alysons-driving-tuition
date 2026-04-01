"use client";

import { MessageCircle } from "lucide-react";

export function OpenVoiceButton({ className }: { className?: string }) {
  return (
    <button
      onClick={() => window.dispatchEvent(new CustomEvent("openVoiceAssistant"))}
      className={className || ""}
    >
      <MessageCircle className="w-5 h-5" />
      <span>Chat with AI</span>
    </button>
  );
}
