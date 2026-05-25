"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AppShell } from "@/components/ui/AppShell";
import { BottomNav } from "@/components/ui/BottomNav";
import { Button } from "@/components/ui/Button";
import { TextField } from "@/components/ui/TextField";
import { ProfileIcon } from "@/components/icons";

export default function ProfilePage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "Hasbi Kinclaid",
    phone: "+62 85711180040",
    address: "Jl. Raya Jonggol-Dayeuh, Bogor 16830",
    gender: "Male",
    birth: "29/11/1998",
  });
  const [saved, setSaved] = useState(false);

  function update(key: keyof typeof form, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
    setSaved(false);
  }

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaved(true);
  }

  return (
    <AppShell>
      <form onSubmit={handleSave} className="flex flex-1 flex-col px-6 pb-4">
        <h1 className="mt-3 text-center text-[20px] font-semibold">Profile</h1>

        <div className="mt-6 flex flex-col items-center">
          <span className="grid h-20 w-20 place-items-center rounded-full bg-surface text-cream ring-1 ring-white/10">
            <ProfileIcon width={36} height={36} />
          </span>
          <p className="mt-3 text-[17px] font-semibold">{form.name}</p>
          <span className="mt-1 rounded-pill bg-coral/15 px-3 py-0.5 text-[12px] font-medium text-coral">
            Customer
          </span>
        </div>

        <div className="mt-7 space-y-4">
          <TextField
            label="Your Name"
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
          />
          <TextField
            label="Phone Number"
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
          />
          <TextField
            label="Your Address"
            value={form.address}
            onChange={(e) => update("address", e.target.value)}
          />
          <div>
            <span className="mb-2 block text-[13px] font-medium text-muted">
              Gender
            </span>
            <select
              value={form.gender}
              onChange={(e) => update("gender", e.target.value)}
              className="w-full rounded-2xl bg-surface px-4 py-3.5 text-[15px] text-white ring-1 ring-white/5 focus:outline-none focus:ring-coral/60"
            >
              {["Male", "Female", "Other"].map((g) => (
                <option key={g} value={g} className="bg-surface">
                  {g}
                </option>
              ))}
            </select>
          </div>
          <TextField
            label="Birth Of Date"
            value={form.birth}
            onChange={(e) => update("birth", e.target.value)}
          />
        </div>

        <div className="mt-6 space-y-3">
          <Button type="submit" fullWidth>
            {saved ? "Saved!" : "Save Changes"}
          </Button>
          <Button
            type="button"
            variant="outline"
            fullWidth
            className="border-coral/40 text-coral"
            onClick={() => router.push("/login")}
          >
            Log Out
          </Button>
        </div>
      </form>
      <BottomNav />
    </AppShell>
  );
}
