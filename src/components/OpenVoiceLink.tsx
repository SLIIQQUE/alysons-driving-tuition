"use client";

export function OpenVoiceLink({ className }: { className?: string }) {
  return (
    <button
      onClick={() => window.dispatchEvent(new CustomEvent("openVoiceAssistant"))}
      className={className}
    >
      Chat now for instant answers
    </button>
  );
}
