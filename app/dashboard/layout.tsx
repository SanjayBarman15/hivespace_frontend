"use client";

import { usePathname } from "next/navigation";
import { NavRail } from "@/components/NavRail";
import { WorkspaceSidebar } from "@/components/WorkspaceSidebar";
import { cn } from "@/lib/utils";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isDocs = pathname?.startsWith("/dashboard/docs");

  return (
    <div className="flex min-h-screen bg-[#0E0E10] text-[#E5E1E4]">
      <NavRail />
      {!isDocs && <WorkspaceSidebar />}
      <main className={cn(
        "flex-1 transition-all duration-300", 
        isDocs ? "ml-[56px]" : "ml-[276px]"
      )}>
        {children}
      </main>
    </div>
  );
}
