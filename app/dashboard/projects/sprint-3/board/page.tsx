"use client";

import { useState } from "react";
import { 
  ChevronRight, 
  SlidersHorizontal, 
  LayoutList, 
  PlusCircle,
  MoreHorizontal,
  Calendar,
  GitPullRequest,
  Plus,
  GitCommit,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import {
  Sheet,
  SheetContent,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  DropdownMenu, 
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

// --- TYPES & CONSTANTS ---

const PRIORITIES = {
  urgent: "#E24B4A",
  high: "#EF9F27",
  normal: "#71717A", // zinc-500
};

const ASSIGNEE_COLORS: Record<string, string> = {
  "MV": "bg-amber-600",
  "RK": "bg-blue-600",
  "DK": "bg-green-600",
  "SA": "bg-red-600",
  "PL": "bg-purple-600",
  "RS": "bg-indigo-600",
};

type Priority = keyof typeof PRIORITIES;

interface Task {
  id: string;
  title: string;
  priority: Priority;
  assignee: { name: string; initials: string };
  labels?: string[];
  dueDate?: string;
  dueToday?: boolean;
  overdue?: boolean;
  pr?: string;
  reviewers?: { name: string; initials: string }[];
  inProgress?: boolean;
  points?: number;
}

const SAMPLE_TASKS: Record<string, Task[]> = {
  "Backlog": [
    { id: "HS-038", title: "Kanban column CRUD endpoints", priority: "normal", assignee: { name: "Robert S.", initials: "RS" } },
    { id: "HS-035", title: "Supabase RLS policies for memberships", priority: "high", assignee: { name: "Meera V.", initials: "MV" } },
    { id: "HS-033", title: "Rate limiting on API gateway", priority: "normal", assignee: { name: "David K.", initials: "DK" } },
  ],
  "Todo": [
    { id: "HS-041", title: "Invite token expiry edge cases", priority: "high", assignee: { name: "Ryan K.", initials: "RK" }, labels: ["Bug"], dueDate: "Apr 12" },
    { id: "HS-040", title: "Email notification templates", priority: "normal", assignee: { name: "Peter L.", initials: "PL" }, labels: ["Backend"] },
  ],
  "In Progress": [
    { id: "HS-044", title: "STOMP WebSocket chat broadcast", priority: "urgent", assignee: { name: "Meera V.", initials: "MV" }, labels: ["Backend", "Chat"], pr: "PR #82", dueDate: "Apr 15", inProgress: true, points: 5 },
    { id: "HS-042", title: "Tiptap editor setup + auto-save", priority: "high", assignee: { name: "Robert S.", initials: "RS" }, labels: ["Docs"], dueDate: "Apr 14" },
  ],
  "Review": [
    { id: "HS-039", title: "GitHub webhook HMAC validation", priority: "normal", assignee: { name: "Sarah A.", initials: "SA" }, labels: ["GitHub"], reviewers: [{ name: "Meera V.", initials: "MV" }, { name: "David K.", initials: "DK" }] },
    { id: "HS-037", title: "Org invite flow end-to-end", priority: "high", assignee: { name: "Ryan K.", initials: "RK" }, labels: ["Auth"] },
  ],
  "Done": [
    { id: "HS-033", title: "Supabase Auth setup + JWT middleware", priority: "normal", assignee: { name: "Meera V.", initials: "MV" } },
    { id: "HS-031", title: "Org + workspace CRUD REST APIs", priority: "normal", assignee: { name: "David K.", initials: "DK" } },
    { id: "HS-029", title: "Spring Boot project scaffold", priority: "normal", assignee: { name: "Robert S.", initials: "RS" } },
  ]
};

const COLUMNS = [
  { name: "Backlog", tasks: SAMPLE_TASKS["Backlog"], count: 6 },
  { name: "Todo", tasks: SAMPLE_TASKS["Todo"], count: 4 },
  { name: "In Progress", tasks: SAMPLE_TASKS["In Progress"], count: 3, accent: true },
  { name: "Review", tasks: SAMPLE_TASKS["Review"], count: 2 },
  { name: "Done", tasks: SAMPLE_TASKS["Done"], count: 8, muted: true },
];

export default function SprintThreeBoardPage() {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [editedTitle, setEditedTitle] = useState("");

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setEditedTitle(task.title);
  };

  return (
    <div className="flex h-screen flex-col bg-[#0E0E10] text-[#E5E1E4] overflow-hidden font-sans">
      
      {/* --- TOP BREADCRUMB BAR --- */}
      <header className="sticky top-0 z-30 flex h-[44px] shrink-0 items-center justify-between border-b border-zinc-800/50 bg-[#0E0E10]/80 px-6 backdrop-blur-sm">
        
        {/* Left: Breadcrumbs */}
        <div className="flex items-center gap-2 flex-1">
          <span className="text-xs text-zinc-400">Hivespace</span>
          <span className="text-zinc-600">/</span>
          <span className="text-xs text-zinc-400">Engineering</span>
          <span className="text-zinc-600">/</span>
          <span className="text-xs font-medium text-white">Sprint 3</span>
          
          <div className="ml-3 flex items-center rounded-md bg-zinc-800 px-2 py-0.5 text-[10px] text-zinc-400 font-medium">
            Sprint 3 · Apr 1–15
          </div>
        </div>

        {/* Center: Tabs */}
        <nav className="flex h-full items-center gap-6">
          <button className="flex h-full items-center px-1 text-sm font-medium text-zinc-500 hover:text-zinc-300 transition-colors">
            Overview
          </button>
          <button className="relative flex h-full items-center px-1 text-sm font-medium text-white">
            Board
            <div className="absolute bottom-0 left-0 h-[2px] w-full bg-[#7C5CFC]" />
          </button>
          <button className="flex h-full items-center px-1 text-sm font-medium text-zinc-500 hover:text-zinc-300 transition-colors">
            List
          </button>
          <button className="flex h-full items-center px-1 text-sm font-medium text-zinc-500 hover:text-zinc-300 transition-colors">
            Timeline
          </button>
          <button className="flex h-full items-center px-1 text-sm font-medium text-zinc-500 hover:text-zinc-300 transition-colors">
            Backlog
          </button>
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center justify-end gap-2 flex-1">
          <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400 hover:text-[#E5E1E4] hover:bg-zinc-800 rounded-md">
            <SlidersHorizontal strokeWidth={1.5} className="h-3.5 w-3.5" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400 hover:text-[#E5E1E4] hover:bg-zinc-800 rounded-md">
            <LayoutList strokeWidth={1.5} className="h-3.5 w-3.5" />
          </Button>
          
          <div className="flex items-center ml-2 mr-2">
            {["MV", "RK", "PL", "RS"].map((initials, i) => (
              <Avatar key={initials} className={`h-6 w-6 ring-2 ring-[#0E0E10] -ml-1.5 first:ml-0 bg-zinc-800 border border-zinc-700/50`}>
                <AvatarFallback className="bg-zinc-800 text-[9px] text-zinc-300 font-medium">{initials}</AvatarFallback>
              </Avatar>
            ))}
          </div>

          <Button className="h-7 bg-[linear-gradient(145deg,#CABEFF,#947DFF)] text-zinc-950 font-bold border-none hover:opacity-90 transition-opacity text-[10px] uppercase tracking-wider rounded-md px-3">
            <PlusCircle strokeWidth={1.5} className="mr-1.5 h-3.5 w-3.5" />
            New Task
          </Button>
        </div>
      </header>

      {/* --- CONTENT AREA --- */}
      <div className="flex-1 flex flex-col min-h-0 bg-[#201F21]">
        
        {/* Sprint Progress Bar */}
        <div className="flex flex-col px-8 py-5 shrink-0 gap-2.5">
          <div className="flex items-baseline gap-3">
            <h1 className="text-sm font-medium text-[#E5E1E4]">Sprint 3</h1>
            <span className="text-xs text-zinc-400">Apr 1 – Apr 15, 2026</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative h-1.5 flex-1 max-w-[400px] bg-zinc-700 rounded-full overflow-hidden">
              <div className="absolute top-0 left-0 h-full bg-[#7C5CFC] rounded-full transition-all" style={{ width: '68%' }} />
            </div>
            <span className="text-[10px] font-medium text-zinc-400">17/25 tasks complete</span>
          </div>
        </div>

        {/* --- KANBAN BOARD --- */}
        <ScrollArea className="flex-1 w-full whitespace-nowrap px-8 pb-8">
          <div className="flex gap-4 h-full min-h-[calc(100vh-160px)]" style={{ width: 'max-content' }}>
            {COLUMNS.map((col) => (
              <div key={col.name} className="flex flex-col w-[280px] shrink-0 bg-[#1B1B1D] rounded-lg h-full overflow-hidden">
                
                {/* Column Header */}
                <div className="flex items-center justify-between p-3 shrink-0">
                  <div className="flex items-center">
                    <span className={`text-sm font-medium ${col.name === 'In Progress' ? 'text-violet-400' : col.accent ? 'text-[#7C5CFC]' : 'text-[#E5E1E4]'}`}>
                      {col.name}
                    </span>
                    <span className="text-xs text-zinc-500 ml-2">{col.count}</span>
                  </div>
                  <div className="flex items-center gap-0.5">
                    <Button variant="ghost" size="icon" className="h-6 w-6 text-zinc-500 hover:text-white hover:bg-zinc-800 rounded-md">
                      <Plus strokeWidth={1.5} className="h-3.5 w-3.5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-6 w-6 text-zinc-500 hover:text-white hover:bg-zinc-800 rounded-md">
                      <MoreHorizontal strokeWidth={1.5} className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>

                {/* Task List */}
                <div className="flex flex-col gap-2 p-2 pt-0 min-h-0 overflow-y-auto">
                  {col.tasks.map((task) => (
                    <TaskCard 
                      key={task.id} 
                      task={task} 
                      isMuted={col.muted} 
                      onClick={() => handleTaskClick(task)} 
                    />
                  ))}
                </div>
              </div>
            ))}

            {/* Add Column Button */}
            <button className="flex h-10 w-48 shrink-0 items-center justify-center gap-2 rounded-lg border border-dashed border-zinc-700 text-xs text-zinc-500 hover:border-zinc-600 hover:text-zinc-400 transition-all mt-2.5">
              <Plus className="h-3.5 w-3.5" />
              <span>Add column</span>
            </button>
          </div>
          <ScrollBar orientation="horizontal" className="bg-zinc-900/50" />
        </ScrollArea>
      </div>

      {/* --- TASK DETAIL SHEET --- */}
      <Sheet open={!!selectedTask} onOpenChange={(open) => !open && setSelectedTask(null)}>
        <SheetContent side="right" className="w-[380px] p-0 bg-[#1B1B1D] border-l border-zinc-800/50 shadow-2xl flex flex-col gap-0 outline-none">
          <ScrollArea className="flex-1">
            <div className="p-6 flex flex-col gap-6">
              
              {/* Header Info */}
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-zinc-500 tracking-tight">{selectedTask?.id}</span>
                <Select defaultValue="in-progress">
                  <SelectTrigger className="w-auto h-7 text-xs bg-zinc-800/50 border-none text-[#E5E1E4] focus:ring-0 shadow-none px-2 rounded-md hover:bg-zinc-800 transition-colors">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-[#7C5CFC]" />
                      <SelectValue placeholder="Status" />
                    </div>
                  </SelectTrigger>
                  <SelectContent className="bg-[#201F21] border-zinc-800 text-[#E5E1E4] rounded-md">
                    <SelectItem value="todo">Todo</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="review">Review</SelectItem>
                    <SelectItem value="done">Done</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Editable Title */}
              <input 
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                className="text-lg font-medium bg-transparent border-none text-[#E5E1E4] focus:outline-none focus:ring-1 focus:ring-zinc-800 rounded px-1 -ml-1 hover:bg-zinc-800/20 transition-colors w-full cursor-text"
              />

              {/* Metadata Table */}
              <div className="flex flex-col text-[13px]">
                <MetadataRow label="Owner">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-5 w-5 bg-zinc-800 border border-zinc-700/50">
                      <AvatarFallback className="text-[9px] uppercase">{selectedTask?.assignee.initials}</AvatarFallback>
                    </Avatar>
                    <span className="text-[#E5E1E4]">{selectedTask?.assignee.name}</span>
                  </div>
                </MetadataRow>
                
                <MetadataRow label="Collaborators">
                  <div className="flex items-center">
                    {["RK", "PL"].map((initials, i) => (
                      <Avatar key={initials} className="h-5 w-5 ring-2 ring-[#1B1B1D] -ml-1.5 first:ml-0 bg-zinc-800 border border-zinc-700/50">
                        <AvatarFallback className="text-[8px] font-medium">{initials}</AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                </MetadataRow>

                <MetadataRow label="Priority">
                  <div className="flex items-center gap-2">
                    <div className={`h-1.5 w-1.5 rounded-full ${selectedTask?.priority === 'urgent' ? 'bg-[#E24B4A]' : 'bg-zinc-500'}`} />
                    <span className="text-[#E5E1E4] capitalize">{selectedTask?.priority}</span>
                  </div>
                </MetadataRow>

                <MetadataRow label="Due date">
                  <div className="flex items-center gap-2 text-zinc-300">
                    <Calendar className="h-3.5 w-3.5 text-zinc-500" strokeWidth={1.5} />
                    <span>{selectedTask?.dueDate || "None"}</span>
                  </div>
                </MetadataRow>

                <MetadataRow label="Sprint">
                  <span className="text-[#7C5CFC] font-medium cursor-pointer hover:underline underline-offset-2 transition-all">Sprint 3</span>
                </MetadataRow>

                <MetadataRow label="Labels">
                  <div className="flex flex-wrap gap-1.5">
                    {selectedTask?.labels?.map(label => (
                      <Badge key={label} className="bg-zinc-800 text-zinc-400 border-zinc-700/50 h-5 px-1.5 font-normal text-[10px] rounded-sm hover:bg-zinc-800">
                        {label}
                      </Badge>
                    ))}
                  </div>
                </MetadataRow>

                <MetadataRow label="Estimate">
                  <span className="text-[#E5E1E4]">{selectedTask?.points ? `${selectedTask.points} points` : "Unestimated"}</span>
                </MetadataRow>
              </div>

              {/* GitHub Section */}
              <div className="mt-2 flex flex-col gap-3">
                <span className="text-[10px] font-bold text-zinc-500 tracking-widest uppercase">Development</span>
                <div className="flex flex-col bg-[#272629]/50 rounded-md border border-zinc-800/50 p-3 gap-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <GitPullRequest className="h-4 w-4 text-emerald-500" strokeWidth={1.5} />
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs text-[#E5E1E4]">PR #82</span>
                          <span className="bg-emerald-500/10 text-emerald-500 text-[10px] px-1 rounded-sm border-none font-medium h-4 flex items-center">OPEN</span>
                        </div>
                        <span className="text-xs text-zinc-400">feat/stomp-broadcast</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 pl-6 text-zinc-500">
                    <GitCommit className="h-3.5 w-3.5" strokeWidth={1.5} />
                    <span className="font-mono text-[11px]">a4f2e91</span>
                    <span className="text-[11px] text-zinc-400 truncate">Add STOMP broker config</span>
                  </div>
                </div>
              </div>

              {/* Activity Section */}
              <div className="mt-2 flex flex-col gap-4">
                <span className="text-[10px] font-bold text-zinc-500 tracking-widest uppercase">Activity</span>
                <div className="relative pl-7 flex flex-col gap-6">
                  <div className="absolute left-3 top-2 bottom-0 w-[1px] bg-zinc-800" />
                  <div className="relative flex flex-col gap-1">
                    <Avatar className="absolute -left-7 top-0 h-6 w-6 ring-4 ring-[#1B1B1D]">
                      <AvatarFallback className="bg-zinc-800 text-[9px]">DK</AvatarFallback>
                    </Avatar>
                    <div className="flex items-start justify-between">
                      <p className="text-xs text-zinc-300 leading-tight">
                        <span className="font-semibold text-white">David K.</span> identified the leak in the Hike config
                      </p>
                      <span className="text-[10px] text-zinc-500 shrink-0 ml-4">2d ago</span>
                    </div>
                  </div>

                  <div className="relative flex flex-col gap-1">
                    <Avatar className="absolute -left-7 top-0 h-6 w-6 ring-4 ring-[#1B1B1D]">
                      <AvatarFallback className="bg-zinc-800 text-[9px]">SM</AvatarFallback>
                    </Avatar>
                    <div className="flex items-start justify-between">
                      <p className="text-xs text-zinc-300 leading-tight">
                        <span className="font-semibold text-white">Sarah M.</span> assigned the task to Alex R.
                      </p>
                      <span className="text-[10px] text-zinc-500 shrink-0 ml-4">3d ago</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </ScrollArea>

          {/* Comment Input */}
          <div className="p-4 bg-[#1B1B1D] border-t border-zinc-800/50 shrink-0">
            <div className="relative flex items-center">
              <input 
                type="text" 
                placeholder="Type a comment..." 
                className="w-full bg-[#272629] border border-zinc-800/50 rounded-md px-3 py-2 text-sm text-[#E5E1E4] placeholder:text-zinc-500 focus:outline-none focus:ring-1 focus:ring-[#7C5CFC]/50 transition-all pr-10"
              />
              <button className="absolute right-2 h-6 w-6 flex items-center justify-center bg-[#7C5CFC] text-white rounded hover:opacity-90 transition-opacity">
                <ArrowRight strokeWidth={2} className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

    </div>
  );
}

// --- SUB-COMPONENTS ---

function TaskCard({ task, isMuted, onClick }: { task: Task; isMuted?: boolean; onClick: () => void }) {
  const isDone = isMuted;

  return (
    <div 
      onClick={onClick}
      className={`group relative flex flex-col gap-2.5 bg-[#272629] p-3 rounded-md border border-zinc-800/50 hover:bg-zinc-700/20 cursor-pointer transition-all ${isDone ? 'opacity-50' : ''} ${task.inProgress ? 'border-l-2 border-l-[#7C5CFC]' : ''}`}
    >
      {/* Row 1: Priority & ID */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-1 w-1 rounded-full shrink-0" style={{ backgroundColor: PRIORITIES[task.priority] }} />
          <span className="font-mono text-[10px] text-zinc-500 tracking-tight">{task.id}</span>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="opacity-0 group-hover:opacity-100 h-5 w-5 flex items-center justify-center text-zinc-600 hover:text-zinc-400 transition-all rounded">
              <MoreHorizontal strokeWidth={1.5} className="h-4 w-4" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-[#201F21] border-zinc-800 text-zinc-300">
            <DropdownMenuItem className="focus:bg-zinc-800 focus:text-white">Edit Task</DropdownMenuItem>
            <DropdownMenuItem className="focus:bg-zinc-800 focus:text-white text-red-400">Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Row 2: Title */}
      <p className={`text-sm leading-snug font-medium line-clamp-2 overflow-hidden text-ellipsis ${isDone ? 'line-through text-zinc-500' : 'text-[#E5E1E4]'}`}>
        {task.title}
      </p>

      {/* Row 3: Labels */}
      {task.labels && task.labels.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {task.labels.slice(0, 2).map(label => (
            <Badge key={label} className="bg-zinc-800 text-zinc-400 border border-zinc-700 h-5 px-1.5 py-0.5 font-normal text-xs rounded-sm hover:bg-zinc-800 shadow-none">
              {label}
            </Badge>
          ))}
          {task.labels.length > 2 && (
            <Badge className="bg-zinc-800 text-zinc-400 border border-zinc-700 h-5 px-1.5 py-0.5 font-normal text-xs rounded-sm hover:bg-zinc-800 shadow-none">
              +{task.labels.length - 2} more
            </Badge>
          )}
        </div>
      )}

      {/* Row 4: Bottom Metadata */}
      <div className="flex items-center justify-between mt-1">
        <div className="flex items-center gap-3">
          {task.dueDate && (
            <div className={`flex items-center gap-1 text-[10px] ${task.overdue ? 'text-red-400' : task.dueToday ? 'text-amber-400' : 'text-zinc-500'}`}>
              <Calendar strokeWidth={1.5} className="h-3 w-3" />
              <span className="font-medium">{task.dueDate}</span>
            </div>
          )}
          {task.pr && (
            <div className="flex items-center gap-1 text-[10px] text-zinc-500 hover:text-emerald-500 transition-colors">
              <GitPullRequest strokeWidth={1.5} className="h-3 w-3" />
              <span className="font-mono">{task.pr}</span>
            </div>
          )}
        </div>

        {/* Assignee Avatar - Positioned Bottom Right */}
        <div className="absolute bottom-3 right-3 shrink-0">
          <TooltipProvider delayDuration={200}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Avatar className={`h-6 w-6 rounded-full border-none ${ASSIGNEE_COLORS[task.assignee.initials] || 'bg-zinc-800'}`}>
                  <AvatarFallback className="bg-transparent text-white text-xs font-bold">{task.assignee.initials}</AvatarFallback>
                </Avatar>
              </TooltipTrigger>
              <TooltipContent className="bg-black text-[10px] border-zinc-800">{task.assignee.name}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
}

function MetadataRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center py-2.5">
      <span className="w-28 shrink-0 text-zinc-500 font-normal">{label}</span>
      <div className="flex-1 min-w-0">
        {children}
      </div>
    </div>
  );
}
