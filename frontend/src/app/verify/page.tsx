"use client";

import { Suspense, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AppShell } from "@/components/ui/AppShell";
import { Brand } from "@/components/ui/Brand";
import { Button } from "@/components/ui/Button";
import { api, setToken } from "@/lib/api";

function VerifyContent() {
  const router = useRouter();
  const params = useSearchParams();
  const email = params.get("email") ?? "";
  const devCode = params.get("code") ?? "";

  const [digits, setDigits] = useState(["", "", "", ""]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const inputs = useRef<Array<HTMLInputElement | null>>([]);

  function setDigit(index: number, value: string) {
    const v = value.replace(/\D/g, "").slice(-1);
    const next = [...digits];
    next[index] = v;
    setDigits(next);
    if (v && index < 3) inputs.current[index + 1]?.focus();
  }

  function handleKeyDown(index: number, e: React.KeyboardEvent) {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  }

  async function handleContinue() {
    setError("");
    setLoading(true);
    try {
      const { token } = await api.verify(email, digits.join(""));
      setToken(token);
      router.push("/home");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Verification failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AppShell>
      <div className="flex flex-1 flex-col px-7 pb-8">
        <Brand className="mt-4" />

        <div className="mt-10">
          <h1 className="text-[28px] font-semibold leading-tight">
            Verification Code
          </h1>
          <p className="mt-2 text-[14px] leading-relaxed text-muted">
            Enter the 4 Digit Verification code that has been sent to{" "}
            {email || "your Email"}.
          </p>
        </div>

        {devCode && (
          <p className="mt-4 rounded-xl bg-surface px-4 py-3 text-[13px] text-cream ring-1 ring-white/5">
            Dev mode: your code is <span className="font-semibold">{devCode}</span>{" "}
            (email delivery not configured yet)
          </p>
        )}

        <div className="mt-8 flex justify-center gap-4">
          {digits.map((d, i) => (
            <input
              key={i}
              ref={(el) => {
                inputs.current[i] = el;
              }}
              inputMode="numeric"
              maxLength={1}
              value={d}
              onChange={(e) => setDigit(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              className="h-16 w-16 rounded-2xl bg-surface text-center text-2xl font-semibold text-white ring-1 ring-white/5 focus:outline-none focus:ring-coral/60"
              aria-label={`Digit ${i + 1}`}
            />
          ))}
        </div>

        {error && (
          <p className="mt-4 text-center text-[13px] text-coral">{error}</p>
        )}

        <div className="mt-8 space-y-3">
          <Button
            fullWidth
            disabled={digits.some((d) => !d) || loading}
            onClick={handleContinue}
          >
            {loading ? "Verifying..." : "Continue"}
          </Button>
          <Button variant="ghost" fullWidth onClick={() => router.back()}>
            Go Back
          </Button>
        </div>

        <p className="mt-auto pt-8 text-center text-[13px] text-muted">
          Didn&apos;t Receive A Code?{" "}
          <button type="button" className="font-semibold text-coral">
            Resend
          </button>
        </p>
      </div>
    </AppShell>
  );
}

export default function VerifyPage() {
  return (
    <Suspense fallback={<AppShell />}>
      <VerifyContent />
    </Suspense>
  );
}
