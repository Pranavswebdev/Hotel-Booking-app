"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AppShell } from "@/components/ui/AppShell";
import { Brand } from "@/components/ui/Brand";
import { Button } from "@/components/ui/Button";
import { TextField } from "@/components/ui/TextField";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <AppShell>
      <div className="flex flex-1 flex-col px-7 pb-8">
        <Brand className="mt-4" />

        <div className="mt-10">
          <h1 className="text-[28px] font-semibold leading-tight">
            Reset Password
          </h1>
          <p className="mt-2 text-[14px] leading-relaxed text-muted">
            {sent
              ? "We've sent a reset link to your email. Check your inbox to continue."
              : "Enter the email linked to your Jiva Space account and we'll send you a reset link."}
          </p>
        </div>

        {!sent ? (
          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <TextField
              label="Your Email"
              type="email"
              placeholder="example@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Button type="submit" fullWidth className="mt-2">
              Send Reset Link
            </Button>
          </form>
        ) : (
          <Button
            className="mt-8"
            fullWidth
            onClick={() => router.push("/verify")}
          >
            Continue
          </Button>
        )}

        <p className="mt-auto pt-8 text-center text-[13px] text-muted">
          Remembered it?{" "}
          <Link href="/login" className="font-semibold text-coral">
            Log In
          </Link>
        </p>
      </div>
    </AppShell>
  );
}
