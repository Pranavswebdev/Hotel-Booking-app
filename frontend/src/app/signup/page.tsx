"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AppShell } from "@/components/ui/AppShell";
import { Brand } from "@/components/ui/Brand";
import { Button } from "@/components/ui/Button";
import { TextField } from "@/components/ui/TextField";
import { SocialButtons } from "@/components/auth/SocialButtons";

export default function SignUpPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }
    setError("");
    router.push("/verify");
  }

  return (
    <AppShell>
      <div className="flex flex-1 flex-col px-7 pb-8">
        <Brand className="mt-4" />

        <div className="mt-8">
          <h1 className="text-[28px] font-semibold leading-tight">Sign Up</h1>
          <p className="mt-2 text-[14px] leading-relaxed text-muted">
            Create a Jiva Space Account to start discover a bunch of Live Spaces
            waiting for you.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <TextField
            label="Your Email"
            type="email"
            placeholder="example@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            label="Your Password"
            type="password"
            placeholder="123@!#"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <TextField
            label="Re-Enter Password"
            type="password"
            placeholder="123@!#"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
          />
          {error && <p className="text-[13px] text-coral">{error}</p>}
          <Button type="submit" fullWidth className="mt-2">
            Sign Up
          </Button>
        </form>

        <div className="mt-6">
          <SocialButtons verb="Sign In" />
        </div>

        <p className="mt-auto pt-8 text-center text-[13px] text-muted">
          Already Has An Account?{" "}
          <Link href="/login" className="font-semibold text-coral">
            Log In
          </Link>
        </p>
      </div>
    </AppShell>
  );
}
