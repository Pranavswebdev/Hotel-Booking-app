"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AppShell } from "@/components/ui/AppShell";
import { Brand } from "@/components/ui/Brand";
import { Button } from "@/components/ui/Button";
import { TextField } from "@/components/ui/TextField";
import { SocialButtons } from "@/components/auth/SocialButtons";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    router.push("/home");
  }

  return (
    <AppShell>
      <div className="flex flex-1 flex-col px-7 pb-8">
        <Brand className="mt-4" />

        <div className="mt-10">
          <h1 className="text-[28px] font-semibold leading-tight">Log In</h1>
          <p className="mt-2 text-[14px] leading-relaxed text-muted">
            Enter to a Jiva Space Account to start discover a bunch of Live
            Spaces waiting for you.
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
          <div className="flex justify-end">
            <Link
              href="/forgot-password"
              className="text-[13px] font-medium text-cream hover:underline"
            >
              Forget Password
            </Link>
          </div>
          <Button type="submit" fullWidth className="mt-2">
            Login
          </Button>
        </form>

        <div className="mt-6">
          <SocialButtons verb="Log In" />
        </div>

        <p className="mt-auto pt-8 text-center text-[13px] text-muted">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="font-semibold text-coral">
            Sign Up
          </Link>
        </p>
      </div>
    </AppShell>
  );
}
