"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AppShell } from "@/components/ui/AppShell";
import { Button } from "@/components/ui/Button";
import { TextField } from "@/components/ui/TextField";
import { BackIcon } from "@/components/icons";
import { formatRp, getSpace } from "@/lib/data";

function PaymentContent() {
  const router = useRouter();
  const params = useSearchParams();
  const space = getSpace(params.get("space") ?? "");
  const nights = Math.max(1, Number(params.get("nights") ?? 1));

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    members: "2 Member",
    idCard: "",
  });

  const total = space ? space.pricePerNight * nights : 0;

  function update(key: keyof typeof form, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    router.push(`/booking/confirmation?space=${space?.id ?? ""}`);
  }

  return (
    <AppShell>
      <form onSubmit={handleSubmit} className="flex flex-1 flex-col px-6 pb-6">
        <header className="mt-3 flex items-center gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="grid h-10 w-10 place-items-center rounded-full bg-surface ring-1 ring-white/5"
            aria-label="Go back"
          >
            <BackIcon />
          </button>
          <h1 className="text-[20px] font-semibold">Payment Method</h1>
        </header>

        <div className="mt-6 space-y-4">
          <TextField
            label="Full Name"
            placeholder="Hasbi Kinclaid"
            value={form.fullName}
            onChange={(e) => update("fullName", e.target.value)}
            required
          />
          <TextField
            label="Active Phone Number"
            type="tel"
            placeholder="+62 85711180040"
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            required
          />
          <div>
            <span className="mb-2 block text-[13px] font-medium text-muted">
              How Much Member
            </span>
            <select
              value={form.members}
              onChange={(e) => update("members", e.target.value)}
              className="w-full rounded-2xl bg-surface px-4 py-3.5 text-[15px] text-white ring-1 ring-white/5 focus:outline-none focus:ring-coral/60"
            >
              {["1 Member", "2 Member", "3 Member", "4 Member"].map((m) => (
                <option key={m} value={m} className="bg-surface">
                  {m}
                </option>
              ))}
            </select>
          </div>
          <TextField
            label="ID Card Number"
            inputMode="numeric"
            placeholder="349812470598137"
            value={form.idCard}
            onChange={(e) => update("idCard", e.target.value)}
            required
          />
        </div>

        <div className="mt-auto pt-6">
          <div className="mb-4 flex items-end justify-between rounded-2xl bg-surface px-4 py-3.5 ring-1 ring-white/5">
            <span className="text-[13px] text-muted">total</span>
            <span className="text-[20px] font-semibold text-cream">
              {formatRp(total)}
            </span>
          </div>
          <Button type="submit" fullWidth>
            Payment Method
          </Button>
        </div>
      </form>
    </AppShell>
  );
}

export default function PaymentPage() {
  return (
    <Suspense fallback={<AppShell />}>
      <PaymentContent />
    </Suspense>
  );
}
