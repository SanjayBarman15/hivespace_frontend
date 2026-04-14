"use client";

import { useState } from "react";
import ReactFlow, { 
  Background, 
  Controls, 
  Handle, 
  Position, 
  NodeProps, 
  Edge, 
  Node,
  useNodesState,
  useEdgesState
} from "reactflow";
import "reactflow/dist/style.css";
import { 
  FileText, 
  GitFork, 
  Clock, 
  Share2, 
  MoreHorizontal, 
  ChevronRight, 
  X,
  Plus,
  Trash2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { HivespaceEditor } from "@/components/HivespaceEditor";

// --- MOCK DATA ---

const MOCK_PAGE = {
  title: "Backend Design",
  icon: "📄",
  lastEditedBy: "Rahul S.",
  lastEditedTime: "2 hours ago",
  breadcrumbs: ["Sprint 3", "Architecture", "Backend Design"]
};

const INITIAL_CONTENT = `
  <h1>Backend Design</h1>
  <p>This document covers the core backend architecture decisions for Sprint 3. Last updated after the Apr 8 architecture review.</p>
  <h2>Tech Stack</h2>
  <ul>
    <li>Framework: Spring Boot (Java)</li>
    <li>REST API + WebSocket: Spring MVC + STOMP</li>
    <li>Authentication: JWT via Supabase JWKS endpoint</li>
    <li>Async: Spring @Async thread pool</li>
  </ul>
  <h2>WebSocket Architecture</h2>
  <p>The STOMP protocol is used over WebSockets to provide real-time updates for chat and task status changes. Each sprint has its own topic prefix to manage message propagation.</p>
  <div data-hivespace-task data-task-id="HS-044" data-title="STOMP WebSocket chat broadcast" data-status="In Progress" data-priority="urgent" data-assignee="Meera V."></div>
  <h2>Database Schema</h2>
  <p>Our PostgreSQL schema and migrations are managed via Flyway. Key tables for messaging:</p>
  <pre><code>CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  channel_id UUID REFERENCES channels(id),
  sender_id UUID REFERENCES users(id),
  content TEXT NOT NULL,
  parent_id UUID REFERENCES messages(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);</code></pre>
`;

// --- REACT FLOW HELPERS ---

const PageNode = ({ data }: NodeProps) => {
  return (
    <div className={cn(
      "px-3 py-2 rounded-lg border transition-all min-w-[120px] flex flex-col items-center justify-center",
      data.isActive 
        ? "bg-violet-500/20 border-violet-500 text-white shadow-[0_0_15px_rgba(124,92,252,0.3)]" 
        : data.isHub 
          ? "bg-violet-500/10 border-violet-500/50 text-white" 
          : "bg-zinc-800/80 border-zinc-700 text-zinc-300"
    )}>
      <Handle type="target" position={Position.Top} className="opacity-0" />
      <span className={cn(
        "font-medium whitespace-nowrap",
        data.size === "large" ? "text-sm" : "text-[11px]"
      )}>
        {data.title}
      </span>
      <Handle type="source" position={Position.Bottom} className="opacity-0" />
    </div>
  );
};

const nodeTypes = { page: PageNode };

const INITIAL_NODES: Node[] = [
  { id: "n1", type: "page", position: { x: 250, y: 150 }, data: { title: "Architecture", isHub: true, size: "large" } },
  { id: "n2", type: "page", position: { x: 450, y: 250 }, data: { title: "Backend Design", isActive: true, size: "large" } },
  { id: "n3", type: "page", position: { x: 250, y: 350 }, data: { title: "Database Schema", size: "normal" } },
  { id: "n4", type: "page", position: { x: 50, y: 250 }, data: { title: "API Reference", size: "normal" } },
  { id: "n5", type: "page", position: { x: 450, y: 50 }, data: { title: "ADR-001", size: "normal" } },
  { id: "n6", type: "page", position: { x: 650, y: 350 }, data: { title: "Apr 8 Standup", size: "normal" } },
];

const INITIAL_EDGES: Edge[] = [
  { id: "e1-2", source: "n1", target: "n2", animated: true, style: { stroke: "#7C5CFC", strokeWidth: 2 } },
  { id: "e1-3", source: "n1", target: "n3", style: { stroke: "#3F3F46" } },
  { id: "e1-4", source: "n1", target: "n4", style: { stroke: "#3F3F46" } },
  { id: "e1-5", source: "n1", target: "n5", style: { stroke: "#3F3F46" } },
  { id: "e2-4", source: "n2", target: "n4", style: { stroke: "#3F3F46" } },
  { id: "e2-6", source: "n2", target: "n6", style: { stroke: "#3F3F46" } },
];

// --- DOCS HOME VIEW ---

function DocsHome({ onSelectProject }: { onSelectProject: (id: string) => void }) {
  const projects = [
    { 
      id: "sprint3", 
      name: "Sprint 3", 
      workspace: "Engineering", 
      color: "bg-violet-500", 
      pages: 12,
      recent: [
        { title: "Backend Design", edited: "2h ago" },
        { title: "Database Schema", edited: "5h ago" },
        { title: "Apr 8 Standup", edited: "Yesterday" }
      ]
    },
    { 
      id: "frontend", 
      name: "Frontend Redesign", 
      workspace: "Engineering", 
      color: "bg-blue-500", 
      pages: 8,
      recent: [
        { title: "Style Guide", edited: "1d ago" },
        { title: "Component Library", edited: "3d ago" }
      ]
    },
    { 
      id: "techdebt", 
      name: "Tech Debt", 
      workspace: "Engineering", 
      color: "bg-emerald-500", 
      pages: 4,
      recent: [
        { title: "Security Audit", edited: "1w ago" }
      ]
    }
  ];

  return (
    <div className="flex-1 overflow-y-auto bg-[#201F21] p-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-xl font-semibold text-[#E5E1E4]">Docs</h1>
        <p className="text-sm text-zinc-400 mt-1">Your knowledge bases across all projects</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
          {projects.map((project) => (
            <div 
              key={project.id}
              onClick={() => onSelectProject(project.id)}
              className="bg-[#272629] border border-zinc-800/50 rounded-lg p-4 hover:border-zinc-700 transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className={cn("h-2 w-2 rounded-full", project.color)} />
                  <span className="text-sm font-medium text-[#E5E1E4]">{project.name}</span>
                </div>
                <Badge className="bg-zinc-800 text-zinc-500 border-none font-normal text-[10px]">
                  {project.workspace}
                </Badge>
              </div>

              <div className="space-y-3 mb-6">
                {project.recent.map((page, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <FileText className="h-3 w-3 text-zinc-500" />
                    <span className="text-xs text-zinc-400 group-hover:text-zinc-300 transition-colors">{page.title}</span>
                    <span className="text-[10px] text-zinc-600 ml-auto font-mono">{page.edited}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between mt-auto pt-4 border-t border-zinc-800/50">
                <span className="text-xs text-zinc-500">{project.pages} pages</span>
                <span className="text-xs text-violet-400 font-medium group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                  Open docs <ChevronRight className="h-3 w-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// --- MAIN PAGE COMPONENT ---

export default function KnowledgeBasePage() {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [view, setView] = useState<"editor" | "graph" | "history">("editor");
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [selectedVersionId, setSelectedVersionId] = useState<string | null>(null);
  const [content, setContent] = useState(INITIAL_CONTENT);
  
  // Graph State
  const [nodes, , onNodesChange] = useNodesState(INITIAL_NODES);
  const [edges, , onEdgesChange] = useEdgesState(INITIAL_EDGES);

  if (!selectedProject) {
    return (
      <div className="flex h-screen flex-col bg-[#0E0E10] text-[#E5E1E4] overflow-hidden">
        <header className="flex h-[44px] items-center px-4 border-b border-zinc-800/50 bg-[#0E0E10]">
          <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest">Knowledge Base Home</span>
        </header>
        <DocsHome onSelectProject={setSelectedProject} />
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col bg-[#0E0E10] text-[#E5E1E4] overflow-hidden">
      
      {/* --- TOP BAR --- */}
      <header className="sticky top-0 z-30 flex h-[44px] shrink-0 items-center justify-between bg-[#0E0E10]/80 backdrop-blur-md px-4 border-b border-zinc-800/50">
        <div className="flex items-center gap-0.5">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setSelectedProject(null)}
            className="h-7 text-xs text-zinc-500 hover:text-white px-2 mr-2"
          >
            Home
          </Button>
          <ChevronRight className="h-3 w-3 text-zinc-800 mr-2" />
          {MOCK_PAGE.breadcrumbs.map((crumb, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className={cn(
                "text-[11px] transition-colors cursor-pointer",
                i === MOCK_PAGE.breadcrumbs.length - 1 ? "text-white font-medium" : "text-zinc-500 hover:text-zinc-300"
              )}>
                {crumb}
              </span>
              {i < MOCK_PAGE.breadcrumbs.length - 1 && <ChevronRight className="h-3 w-3 text-zinc-700" />}
            </div>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <div className="flex bg-zinc-800 border border-zinc-700 rounded-md p-0.5 shadow-inner">
            <TooltipProvider>
              <ViewToggle active={view === "editor"} icon={FileText} onClick={() => setView("editor")} label="Editor" />
              <ViewToggle active={view === "graph"} icon={GitFork} onClick={() => setView("graph")} label="Graph" />
              <ViewToggle active={isHistoryOpen} icon={Clock} onClick={() => setIsHistoryOpen(true)} label="History" />
            </TooltipProvider>
          </div>

          <div className="w-px h-4 bg-zinc-800 mx-1" />

          <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400 hover:text-white rounded-md">
            <Share2 className="h-4 w-4" strokeWidth={1.5} />
          </Button>

          <Popover>
            <PopoverTrigger asChild>
               <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400 hover:text-white rounded-md">
                <MoreHorizontal className="h-4 w-4" strokeWidth={1.5} />
              </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="bg-zinc-900 border-zinc-700 text-zinc-200 p-1 w-44">
              <PageAction icon={FileText} label="Duplicate" />
              <PageAction icon={MoreHorizontal} label="Move to" />
              <div className="h-px bg-zinc-800 my-1" />
              <PageAction icon={Trash2} label="Delete" className="text-red-400" />
            </PopoverContent>
          </Popover>
        </div>
      </header>

      {/* --- CONTENT AREA --- */}
      <div className="flex flex-1 overflow-hidden relative">
        
        {view === "graph" ? (
          <div className="flex-1 bg-[#0E0E10] animate-in fade-in duration-500">
            <ReactFlow
              nodes={nodes}
              edges={edges}
              nodeTypes={nodeTypes}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              fitView
              colorMode="dark"
            >
              <Background color="#18181B" gap={20} />
              <Controls className="bg-zinc-800 border-zinc-700 fill-zinc-400" />
              <div className="absolute top-4 left-4 z-10 flex items-center gap-4 bg-zinc-900/50 backdrop-blur border border-zinc-800/80 px-4 py-2 rounded-lg">
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-zinc-200">Knowledge Graph · Sprint 3</span>
                  <span className="text-[10px] text-zinc-500 uppercase tracking-widest">12 pages · 18 connections</span>
                </div>
              </div>
            </ReactFlow>
          </div>
        ) : (
          <>
            <main className="flex-1 bg-[#201F21] overflow-y-auto px-10 py-16 scrollbar-none scroll-smooth">
              <div className="max-w-[700px] mx-auto flex flex-col gap-6">
                
                {/* HEADER */}
                <div className="flex flex-col gap-4">
                  <div className="text-4xl cursor-pointer hover:bg-zinc-800/50 w-fit p-2 rounded-lg transition-colors">
                    {MOCK_PAGE.icon}
                  </div>
                  <input 
                    defaultValue={MOCK_PAGE.title}
                    placeholder="Untitled"
                    className="bg-transparent border-none text-4xl font-semibold text-[#E5E1E4] outline-none placeholder:text-zinc-700 w-full"
                  />
                  <div className="flex items-center gap-2 text-xs text-zinc-500">
                    <span>Last edited by {MOCK_PAGE.lastEditedBy} · {MOCK_PAGE.lastEditedTime}</span>
                  </div>
                </div>

                {/* TIPTAP EDITOR */}
                <div className="mt-4">
                  <HivespaceEditor 
                    initialContent={content} 
                    onUpdate={setContent}
                  />
                </div>

                {/* FOOTER BACKLINKS (Dynamic from editor would be better, but mock for now) */}
                <div className="mt-20 pt-8 border-t border-zinc-800 flex flex-col gap-4">
                  <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">Linked From</span>
                  <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2 group cursor-pointer">
                      <FileText className="h-3.5 w-3.5 text-zinc-500 group-hover:text-violet-400" />
                      <span className="text-sm text-zinc-400 group-hover:text-violet-400 transition-colors">API Reference</span>
                    </div>
                    <div className="flex items-center gap-2 group cursor-pointer">
                      <FileText className="h-3.5 w-3.5 text-zinc-500 group-hover:text-violet-400" />
                      <span className="text-sm text-zinc-400 group-hover:text-violet-400 transition-colors">Apr 8 Standup</span>
                    </div>
                  </div>
                </div>
              </div>
            </main>

            {/* RIGHT PANEL */}
            <aside className="w-[280px] shrink-0 bg-[#1B1B1D] border-l border-zinc-800/50 flex flex-col animate-in slide-in-from-right duration-300 overflow-y-auto">
              <div className="flex flex-col p-6 gap-8">
                
                <section className="flex flex-col gap-4">
                  <h3 className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Page Info</h3>
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-7 w-7 border border-zinc-700">
                        <AvatarFallback className="text-[10px] bg-zinc-800 text-zinc-400">RS</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="text-xs font-medium text-zinc-200">Rahul S.</span>
                        <span className="text-[10px] text-zinc-500">Created Apr 1, 2026</span>
                      </div>
                    </div>
                    <div className="flex justify-between text-[11px] text-zinc-500 bg-zinc-800/20 p-2 rounded-md">
                      <span>Last edited</span>
                      <span className="text-zinc-300">2 hours ago</span>
                    </div>
                  </div>
                </section>

                <section className="flex flex-col gap-4">
                  <h3 className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Table of Contents</h3>
                  <div className="flex flex-col gap-2.5">
                    <a href="#" className="text-xs text-zinc-400 hover:text-violet-400 transition-colors">Tech Stack</a>
                    <a href="#" className="text-xs text-zinc-400 hover:text-violet-400 transition-colors">WebSocket Architecture</a>
                    <a href="#" className="text-xs text-zinc-400 hover:text-violet-400 transition-colors">Database Schema</a>
                  </div>
                </section>
              </div>
            </aside>
          </>
        )}

        {/* --- HISTORY SLIDE-OVER --- */}
        {isHistoryOpen && (
          <div className="absolute inset-0 z-50 flex justify-end">
            <div 
              className="absolute inset-0 bg-black/40 backdrop-blur-xs cursor-pointer animate-in fade-in duration-300"
              onClick={() => setIsHistoryOpen(false)}
            />
            <aside className="relative w-[320px] bg-zinc-900 border-l border-zinc-800 shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
              <header className="flex h-[44px] items-center justify-between px-4 border-b border-zinc-800">
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-[#E5E1E4]">Version History</span>
                  <span className="text-[10px] text-zinc-500">Backend Design</span>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setIsHistoryOpen(false)} className="h-8 w-8 text-zinc-500 hover:text-white">
                  <X className="h-4 w-4" />
                </Button>
              </header>

              <div className="p-3">
                {selectedVersionId && (
                   <div className="flex flex-col gap-2 p-3 bg-amber-500/10 border border-amber-500/30 rounded-md mb-4 animate-in slide-in-from-top-2">
                    <p className="text-[11px] text-amber-300 font-medium">You are viewing a past version.</p>
                    <Button className="h-7 w-full bg-amber-500 hover:bg-amber-600 text-black text-[10px] font-bold uppercase tracking-wider rounded-sm shadow-lg shadow-black/20">
                      Restore this version
                    </Button>
                  </div>
                )}
              </div>

              <div className="flex-1 overflow-y-auto px-2 flex flex-col gap-1">
                <VersionRow 
                  id="v-curr"
                  label="Current version"
                  author="Rahul S."
                  time="2 hours ago"
                  isCurrent
                  isActive={selectedVersionId === null}
                  onClick={() => setSelectedVersionId(null)}
                />
                <div className="h-px bg-zinc-800 my-2 mx-2 opacity-50" />
                {[
                  { id: "v1", date: "Apr 9, 3:42 PM", author: "Meera V.", info: "Added DB schema" },
                  { id: "v2", date: "Apr 9, 2:15 PM", author: "Rahul S." },
                  { id: "v3", date: "Apr 8, 5:30 PM", author: "David K.", info: "Initial draft" },
                ].map(v => (
                  <VersionRow 
                    key={v.id}
                    id={v.id}
                    label={v.date}
                    author={v.author}
                    time={v.info || "No changes recorded"}
                    isActive={selectedVersionId === v.id}
                    onClick={() => setSelectedVersionId(v.id)}
                  />
                ))}
                <span className="text-[10px] text-zinc-600 italic text-center py-8">Showing last 50 versions</span>
              </div>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}

// --- SUB-COMPONENTS ---

function ViewToggle({ active, icon: Icon, onClick, label }: { active: boolean; icon: any; onClick: () => void; label: string }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button 
          onClick={onClick}
          className={cn(
            "h-8 w-9 flex items-center justify-center rounded transition-all",
            active ? "bg-violet-600 text-white shadow shadow-black/20" : "text-zinc-500 hover:text-zinc-300"
          )}
        >
          <Icon className="h-4 w-4" strokeWidth={1.5} />
        </button>
      </TooltipTrigger>
      <TooltipContent side="bottom" className="bg-zinc-900 border-zinc-700 text-zinc-300 text-[10px] py-1">
        {label}
      </TooltipContent>
    </Tooltip>
  );
}

function PageAction({ icon: Icon, label, className }: { icon: any; label: string; className?: string }) {
  return (
    <button className={cn(
      "w-full flex items-center gap-2 px-3 py-2 text-xs text-zinc-400 hover:bg-zinc-800 hover:text-white rounded transition-colors",
      className
    )}>
      <Icon className="h-3.5 w-3.5" strokeWidth={1.5} />
      {label}
    </button>
  );
}

function VersionRow({ id, label, author, time, isCurrent, isActive, onClick }: { id: string; label: string; author: string; time: string; isCurrent?: boolean; isActive: boolean; onClick: () => void }) {
  return (
    <div 
      onClick={onClick}
      className={cn(
        "flex flex-col p-3 cursor-pointer rounded-md transition-all border-l-2",
        isActive ? "bg-zinc-800/60 border-violet-500 text-white" : "border-transparent hover:bg-zinc-800/40 text-zinc-400"
      )}
    >
      <div className="flex justify-between items-center mb-1">
        <span className={cn(
          "text-xs font-medium",
          isCurrent ? "text-violet-400" : "text-zinc-200"
        )}>{label}</span>
      </div>
      <div className="flex items-center gap-2 mt-1">
        <Avatar className="h-4 w-4">
          <AvatarFallback className="text-[7px] bg-zinc-700">{author.split(" ").map(n => n[0]).join("")}</AvatarFallback>
        </Avatar>
        <span className="text-[10px] text-zinc-500">{author}</span>
        <span className="text-[10px] text-zinc-600 ml-auto whitespace-nowrap">{time}</span>
      </div>
    </div>
  );
}
