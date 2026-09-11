"use client";

import { useEffect, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useStore } from "@/lib/store";
import { AppShell } from "@/components/AppShell";

export default function WorkspaceLayout({ children }: { children: ReactNode }) {
  const { ready, authed, invite, logout } = useStore();
  const router = useRouter();
  const path = usePathname();

  useEffect(() => {
    if (!ready) return;
    if (invite && Date.now() >= invite.exp) {
      logout();
      router.replace("/review/ended");
      return;
    }
    if (!authed) router.replace("/login");
  }, [ready, authed, invite, logout, router, path]);

  if (!ready || !authed) {
    return <div style={{ minHeight: "100vh", background: "var(--color-bg)" }} />;
  }

  return <AppShell>{children}</AppShell>;
}
