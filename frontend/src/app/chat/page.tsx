"use client";

import { AppShell } from "@/components/ui/AppShell";
import { BottomNav } from "@/components/ui/BottomNav";
import { ChatIcon } from "@/components/icons";

export default function ChatPage() {
  return (
    <AppShell>
      <div className="flex flex-1 flex-col px-6 pb-4">
        <h1 className="mt-3 text-[24px] font-semibold">Chat</h1>
        <div className="flex flex-1 flex-col items-center justify-center text-center">
          <span className="grid h-24 w-24 place-items-center rounded-full bg-surface text-muted">
            <ChatIcon width={40} height={40} />
          </span>
          <h2 className="mt-6 text-[18px] font-semibold">No messages yet</h2>
          <p className="mt-2 max-w-xs text-[14px] leading-relaxed text-muted">
            When you book a space, conversations with your host will show up
            here.
          </p>
        </div>
      </div>
      <BottomNav />
    </AppShell>
  );
}
