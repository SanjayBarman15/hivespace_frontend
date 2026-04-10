"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  ChevronDown, 
  Plus, 
  Users, 
  ExternalLink, 
  Palette,
  Check
} from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function WorkspaceSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed top-0 left-[56px] z-40 flex h-full w-[220px] flex-col bg-[#1B1B1D]">
      
      {/* 1. WORKSPACE HEADER */}
      <Popover>
        <PopoverTrigger asChild>
          <div className="flex h-[48px] w-full cursor-pointer items-center justify-between px-4 hover:bg-zinc-800/50 transition-colors">
            <div className="flex flex-col justify-center">
              <span className="text-sm font-medium text-[#E5E1E4] leading-tight">Engineering</span>
              <span className="text-xs text-zinc-500 leading-tight">Hivespace</span>
            </div>
            <ChevronDown className="h-4 w-4 text-zinc-400" strokeWidth={1.5} />
          </div>
        </PopoverTrigger>
        <PopoverContent align="start" className="w-[200px] ml-4 bg-[#18181B]/95 backdrop-blur-xl border border-zinc-800 text-[#E5E1E4] p-1 rounded-md shadow-lg shadow-black/40">
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between px-2 py-1.5 cursor-pointer hover:bg-zinc-800/50 rounded-sm border-l-2 border-violet-500 bg-zinc-800/30">
              <span className="text-sm font-medium text-white">Engineering</span>
              <Check className="h-4 w-4 text-[#7C5CFC]" strokeWidth={1.5} />
            </div>
            <div className="flex items-center px-2.5 py-1.5 cursor-pointer hover:bg-zinc-800/50 rounded-sm text-zinc-400 border-l-2 border-transparent">
              <span className="text-sm">Design</span>
            </div>
            <div className="flex items-center px-2.5 py-1.5 cursor-pointer hover:bg-zinc-800/50 rounded-sm text-zinc-400 border-l-2 border-transparent">
              <span className="text-sm">Marketing</span>
            </div>
            <div className="h-px bg-zinc-800 my-1 mx-2" />
            <div className="flex items-center px-2 py-1.5 cursor-pointer hover:bg-zinc-800/50 rounded-sm text-zinc-400">
              <Plus className="h-4 w-4 mr-2" strokeWidth={1.5} />
              <span className="text-sm">Create Workspace</span>
            </div>
          </div>
        </PopoverContent>
      </Popover>

      <div className="flex-1 overflow-y-auto overflow-x-hidden p-3 flex flex-col gap-6 scrollbar-none pb-8">
        
        {/* 2. + New Project Button */}
        <Button variant="ghost" className="w-full justify-start text-xs text-zinc-400 hover:text-[#E5E1E4] hover:bg-zinc-800/50 h-8 px-2 rounded-md border border-zinc-700/15">
          <Plus strokeWidth={1.5} className="mr-2 h-3.5 w-3.5" />
          New Project
        </Button>

        {/* 3. PROJECTS */}
        <div className="flex flex-col">
          <span className="px-2 mb-2 text-xs font-semibold text-zinc-600 tracking-widest uppercase">Projects</span>
          
          <div className="flex flex-col gap-0.5">
            {[
              { name: "Frontend Redesign", color: "bg-blue-500", path: "/dashboard/projects/frontend-redesign", unread: false },
              { name: "Sprint 3", color: "bg-violet-500", path: "/dashboard/projects/sprint-3", unread: true },
              { name: "Tech Debt", color: "bg-emerald-500", path: "/dashboard/projects/tech-debt", unread: false }
            ].map(project => {
              const isActive = pathname === project.path;
              return (
                <Link 
                  href={project.path}
                  key={project.name}
                  className={`group flex h-8 items-center justify-between cursor-pointer rounded-r-md px-2 ${
                    isActive 
                      ? "border-l-2 border-violet-500 bg-zinc-800/50 text-white" 
                      : "border-l-2 border-transparent text-zinc-400 hover:bg-zinc-800/30 hover:text-zinc-200"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div className={`h-1.5 w-1.5 rounded-sm ${project.color}`} />
                    <span className="text-sm truncate w-[130px] font-medium">{project.name}</span>
                  </div>
                  {project.unread && (
                    <div className="h-1.5 w-1.5 rounded-full bg-[#f95b4e]" />
                  )}
                </Link>
              );
            })}
          </div>
        </div>

        {/* 4. TEAMS */}
        <div className="flex flex-col">
          <span className="px-2 mb-2 text-xs font-semibold text-zinc-600 tracking-widest uppercase">Teams</span>
          
          <div className="flex flex-col gap-0.5">
             {[
              { name: "Backend Team", path: "/dashboard/teams/backend" },
              { name: "Frontend Team", path: "/dashboard/teams/frontend" }
            ].map(team => {
              const isActive = pathname === team.path;
              return (
                <Link 
                  href={team.path}
                  key={team.name}
                  className={cn(
                    "group flex h-8 items-center justify-between cursor-pointer rounded-r-md px-2 border-l-2 transition-colors",
                    isActive 
                      ? "border-violet-500 bg-zinc-800/50 text-white" 
                      : "border-transparent text-zinc-400 hover:bg-zinc-800/30 hover:text-zinc-200"
                  )}
                >
                  <div className="flex items-center gap-2">
                    <Users className="h-[14px] w-[14px] text-zinc-500 group-hover:text-zinc-400" />
                    <span className="text-sm truncate">{team.name}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* 5. CHANNELS */}
        <div className="flex flex-col">
          <span className="px-2 mb-2 text-xs font-semibold text-zinc-600 tracking-widest uppercase">Channels</span>
          
          <div className="flex flex-col gap-0.5">
             {[
              { name: "backend-ops", unreadCount: 4 },
              { name: "design-sync", unreadCount: 0 },
              { name: "general", unreadCount: 0 }
            ].map(channel => {
              const path = `/dashboard/chat/${channel.name}`;
              const isActive = pathname === path;
              return (
                <Link 
                  href={path}
                  key={channel.name}
                  className={cn(
                    "flex h-8 items-center justify-between cursor-pointer rounded-r-md px-2 border-l-2",
                    isActive 
                      ? "border-violet-500 bg-zinc-800/50 text-white" 
                      : "border-transparent text-zinc-400 hover:bg-zinc-800/30 hover:text-zinc-200"
                  )}
                >
                  <div className="flex items-center gap-2 truncate">
                    <span className="text-zinc-500 font-light text-lg leading-none mb-0.5">#</span>
                    <span className="text-sm truncate">{channel.name}</span>
                  </div>
                  {channel.unreadCount > 0 && !isActive && (
                    <div className="h-1.5 w-1.5 rounded-full bg-[#f95b4e]" />
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* 6. RESOURCES (Bottom) */}
      <div className="flex flex-col gap-1 p-3 mt-auto border-t border-zinc-800/50">
        <div className="flex items-center gap-2 cursor-pointer px-2 py-1.5 text-zinc-500 hover:text-zinc-300 transition-colors">
          <ExternalLink className="h-[14px] w-[14px]" />
          <span className="text-xs">API Docs</span>
        </div>
        <div className="flex items-center gap-2 cursor-pointer px-2 py-1.5 text-zinc-500 hover:text-zinc-300 transition-colors">
          <Palette className="h-[14px] w-[14px]" />
          <span className="text-xs">Design Kit</span>
        </div>
      </div>

    </aside>
  );
}
