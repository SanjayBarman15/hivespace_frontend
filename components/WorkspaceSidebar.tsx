"use client";

import { 
  ChevronDown, 
  ChevronRight,
  Plus, 
  Users, 
  ExternalLink, 
  Palette,
  Check,
  KanbanSquare,
  FileText,
  MessageSquare,
  Settings
} from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const PROJECTS = [
  { id: "frontend-redesign", name: "Frontend Redesign", color: "bg-blue-500", path: "/dashboard/projects/frontend-redesign", unread: false },
  { id: "sprint-3", name: "Sprint 3", color: "bg-violet-500", path: "/dashboard/projects/sprint-3", unread: true },
  { id: "tech-debt", name: "Tech Debt", color: "bg-emerald-500", path: "/dashboard/projects/tech-debt", unread: false }
];

const ALL_CHANNELS = [
  { name: "backend-ops", unreadCount: 4, projectId: "sprint-3" },
  { name: "design-sync", unreadCount: 0, projectId: "frontend-redesign" },
  { name: "general", unreadCount: 0, projectId: null }
];

export function WorkspaceSidebar() {
  const pathname = usePathname();
  const [expandedProjectId, setExpandedProjectId] = useState<string | null>(null);

  // Auto-expand project if pathname matches
  useEffect(() => {
    const activeProject = PROJECTS.find(p => pathname.startsWith(p.path));
    if (activeProject) {
      setExpandedProjectId(activeProject.id);
    }
  }, [pathname]);

  const toggleExpand = (projectId: string) => {
    setExpandedProjectId(expandedProjectId === projectId ? null : projectId);
  };

  const isProjectLead = true; // Use mock role for now

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

        <div className="flex flex-col">
          <span className="px-2 mb-2 text-xs font-semibold text-zinc-600 tracking-widest uppercase">Projects</span>
          
          <div className="flex flex-col gap-0.5">
            {PROJECTS.map(project => {
              const isActive = pathname.startsWith(project.path);
              const isExpanded = expandedProjectId === project.id;
              
              return (
                <div key={project.id} className="flex flex-col">
                  {/* Project Row */}
                  <Link 
                    href={project.path}
                    onClick={(e) => {
                      // We toggle expansion but still allow the Link to navigate
                      toggleExpand(project.id);
                    }}
                    className={`group flex h-8 items-center justify-between cursor-pointer rounded-r-md px-2 border-l-2 transition-colors ${
                      isActive 
                        ? "border-violet-500 bg-zinc-800/50 text-white" 
                        : "border-transparent text-zinc-400 hover:bg-zinc-800/30 hover:text-zinc-200"
                    }`}
                  >
                    <div className="flex items-center gap-1.5 min-w-0">
                      <div className="flex items-center justify-center w-4">
                        {isExpanded ? (
                          <ChevronDown className="h-3 w-3 text-zinc-500" strokeWidth={2} />
                        ) : (
                          <ChevronRight className="h-3 w-3 text-zinc-500" strokeWidth={2} />
                        )}
                      </div>
                      <div className={`h-1.5 w-1.5 rounded-sm shrink-0 ${project.color}`} />
                      <span className="text-sm truncate font-medium">{project.name}</span>
                    </div>
                    {project.unread && !isExpanded && (
                      <div className="h-1.5 w-1.5 rounded-full bg-[#f95b4e]" />
                    )}
                  </Link>

                  {/* Sub-items */}
                  {isExpanded && (
                    <div className="flex flex-col py-0.5">
                      <SubItem 
                        icon={KanbanSquare} 
                        label="Board" 
                        href={`${project.path}/board`} 
                        isActive={pathname === `${project.path}/board`} 
                      />
                      <SubItem 
                        icon={FileText} 
                        label="Docs" 
                        href="/dashboard/docs" 
                        isActive={pathname.startsWith("/dashboard/docs")} 
                      />
                      <SubItem 
                        icon={MessageSquare} 
                        label="Channels" 
                        href={`/dashboard/chat/${project.id === 'sprint-3' ? 'backend-ops' : 'general'}`} 
                        isActive={pathname.startsWith("/dashboard/chat")} 
                      />
                      {isProjectLead && (
                        <SubItem 
                          icon={Settings} 
                          label="Settings" 
                          href={`${project.path}/settings`} 
                          isActive={pathname === `${project.path}/settings`} 
                        />
                      )}
                    </div>
                  )}
                </div>
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
          <span className="px-2 mb-2 text-[10px] font-bold text-zinc-600 tracking-widest uppercase">
            Channels {expandedProjectId ? `(${PROJECTS.find(p => p.id === expandedProjectId)?.name})` : "(Engineering)"}
          </span>
          
          <div className="flex flex-col gap-0.5">
             {ALL_CHANNELS
              .filter(c => !expandedProjectId || c.projectId === expandedProjectId || c.projectId === null)
              .map(channel => {
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

function SubItem({ icon: Icon, label, href, isActive }: { icon: any; label: string; href: string; isActive: boolean }) {
  return (
    <Link 
      href={href}
      className={cn(
        "flex h-7 items-center gap-2 pl-8 pr-2 transition-colors rounded-md no-underline",
        isActive 
          ? "text-white bg-zinc-800/60" 
          : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40"
      )}
    >
      <Icon className="h-3 w-3 text-zinc-500" strokeWidth={1.5} />
      <span className="text-xs font-normal">{label}</span>
    </Link>
  );
}
