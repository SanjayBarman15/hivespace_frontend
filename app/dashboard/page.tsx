"use client";

import { 
  PlusCircle, 
  Bell, 
  TrendingUp, 
  Clock, 
  MessageSquare, 
  GitPullRequest,
  Calendar
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";

export default function DashboardPage() {
  return (
    <ScrollArea className="h-screen w-full bg-[#0E0E10] text-[#E5E1E4]">
      {/* TOP BAR */}
      <header className="sticky top-0 z-10 flex h-[72px] items-center justify-between border-b border-zinc-800/50 bg-[#0E0E10]/80 px-8 backdrop-blur-sm">
        <div className="flex flex-col flex-1">
          <h1 className="text-xl font-medium text-[#E5E1E4] tracking-tight">Good morning, Rahul</h1>
          <p className="text-sm text-zinc-400">Here's what needs your attention today.</p>
        </div>
        <div className="flex items-center gap-4">
          <Button className="bg-gradient-to-br from-[#CABEFF] to-[#947DFF] text-zinc-950 font-semibold border-none hover:opacity-90 transition-opacity text-xs uppercase tracking-wider rounded-md">
            <PlusCircle strokeWidth={1.5} className="mr-2 h-4 w-4" />
            New Task
          </Button>
          <Button variant="ghost" size="icon" className="relative text-zinc-400 hover:text-[#E5E1E4] hover:bg-zinc-800 rounded-md">
            <Bell strokeWidth={1.5} className="h-5 w-5" />
            <span className="absolute top-2 right-2.5 flex h-[6px] w-[6px] items-center justify-center rounded-full bg-[#F95B4E]">
              <span className="sr-only">Unread notifications</span>
            </span>
          </Button>
        </div>
      </header>

      <div className="flex flex-col gap-8 p-8 max-w-7xl mx-auto">
        
        {/* STATS ROW */}
        <div className="grid grid-cols-4 gap-4">
          <Card className="bg-[#2A2A2D] border-zinc-800 shadow-none rounded-md">
            <CardContent className="p-6 flex flex-col justify-between h-full">
              <div className="flex justify-between items-start mb-4">
                <span className="text-xs font-medium text-zinc-400 uppercase tracking-widest">My Open Tasks</span>
                <TrendingUp strokeWidth={1.5} className="h-4 w-4 text-zinc-400" />
              </div>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-4xl font-semibold text-[#E5E1E4] tracking-tighter">12</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#2A2A2D] border-zinc-800 shadow-none rounded-md">
            <CardContent className="p-6 flex flex-col justify-between h-full">
              <div className="flex justify-between items-start mb-4">
                <span className="text-xs font-medium text-zinc-400 uppercase tracking-widest">Due Today</span>
                <Clock strokeWidth={1.5} className="h-4 w-4 text-zinc-400" />
              </div>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-4xl font-semibold text-[#E5E1E4] tracking-tighter">3</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#2A2A2D] border-zinc-800 shadow-none rounded-md">
            <CardContent className="p-6 flex flex-col justify-between h-full">
              <div className="flex justify-between items-start mb-4">
                <span className="text-xs font-medium text-zinc-400 uppercase tracking-widest">Unread Messages</span>
                <MessageSquare strokeWidth={1.5} className="h-4 w-4 text-zinc-400" />
              </div>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-4xl font-semibold text-[#E5E1E4] tracking-tighter">8</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#2A2A2D] border-zinc-800 shadow-none rounded-md">
            <CardContent className="p-6 flex flex-col justify-between h-full">
              <div className="flex justify-between items-start mb-4">
                <span className="text-xs font-medium text-zinc-400 uppercase tracking-widest">PRs Awaiting Review</span>
                <GitPullRequest strokeWidth={1.5} className="h-4 w-4 text-zinc-400" />
              </div>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-4xl font-semibold text-[#E5E1E4] tracking-tighter">2</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-10 gap-6 items-start">
          
          {/* LEFT COLUMN (60%) */}
          <div className="col-span-6 flex flex-col gap-6 w-full">
            
            {/* My Tasks */}
            <Card className="bg-[#201F21] border-zinc-800 shadow-none rounded-md overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between py-4 px-5">
                <CardTitle className="text-sm font-medium text-zinc-400 uppercase tracking-wider">My Tasks</CardTitle>
                <Button variant="ghost" size="sm" className="h-8 text-xs text-zinc-400 hover:text-[#E5E1E4] hover:bg-zinc-800 rounded-md">
                  View all
                </Button>
              </CardHeader>
              <div className="flex flex-col pb-2">
                {[
                  { priority: "bg-[#F95B4E]", id: "HS-044", title: "Implement new NavRail component", badge: "Sprint 3 · Engineering", date: "Today", assignee: "RS", isLowPriority: false },
                  { priority: "bg-amber-500", id: "HS-052", title: "Fix layout shift on Workspace switcher", badge: "Sprint 3 · Engineering", date: "Tomorrow", assignee: "RS", isLowPriority: false },
                  { priority: "bg-zinc-500", id: "HS-061", title: "Draft Q3 analytics report", badge: "Planning · Product", date: "Oct 24", assignee: "MV", isLowPriority: true },
                  { priority: "bg-zinc-500", id: "HS-065", title: "Review copy for landing page", badge: "Marketing", date: "Oct 26", assignee: "RS", isLowPriority: true }
                ].map((task) => (
                  <div key={task.id} className="flex flex-col">
                    <div className="flex items-center justify-between py-3 px-5 hover:bg-zinc-800/50 transition-colors cursor-pointer group">
                      <div className="flex items-center gap-4">
                        <div className={`h-2 w-2 rounded-full ${task.priority}`} />
                        <div className="text-xs font-mono text-zinc-500">{task.id}</div>
                        <div className={`text-sm group-hover:text-[#Cabeff] transition-colors font-medium ${task.isLowPriority ? 'text-zinc-400' : 'text-[#E5E1E4]'}`}>
                          {task.title}
                        </div>
                        <Badge variant="outline" className="text-xs font-normal bg-zinc-800 border-zinc-700 text-zinc-400 rounded-sm hover:bg-zinc-800">
                          {task.badge}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-xs text-zinc-400">{task.date}</span>
                        <Avatar className="h-7 w-7 rounded-full">
                          <AvatarFallback className="bg-zinc-800 text-xs text-zinc-300">
                            {task.assignee}
                          </AvatarFallback>
                        </Avatar>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Recent Activity */}
            <Card className="bg-[#201F21] border-zinc-800 shadow-none rounded-md overflow-hidden">
              <CardHeader className="py-4 px-5">
                <CardTitle className="text-sm font-medium text-zinc-400 uppercase tracking-wider">Recent Activity</CardTitle>
              </CardHeader>
              <div className="p-5 pt-0 flex flex-col relative w-full">
                {/* Timeline wrapper to contain borders on items */}
                <div className="flex flex-col gap-0 relative w-full">
                  {[
                    { time: "10m ago", text: "Meera V. opened PR #82 in Sprint 3", initials: "MV" },
                    { time: "2h ago", text: "David dropped a comment on HS-044", initials: "DK" },
                    { time: "Yesterday", text: "Rahul completed task HS-021: Fix search bug", initials: "RS" },
                    { time: "Mon 4:30pm", text: "Meera V. updated status of Sprint 3 to 'In Progress'", initials: "MV" }
                  ].map((activity, i, arr) => (
                    <div key={i} className="flex gap-4 items-start relative w-full">
                      {/* Timeline line - connecting avatars */}
                      {i !== arr.length - 1 && (
                        <div className="absolute left-[13px] top-6 bottom-0 w-px border-l-2 border-zinc-700 h-[calc(100%-2px)]" />
                      )}
                      
                      <Avatar className="h-7 w-7 rounded-full shrink-0 relative z-10 ring-4 ring-[#201F21] mt-0.5">
                        <AvatarFallback className="bg-zinc-800 text-xs text-zinc-300">
                          {activity.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-1 justify-between items-start py-3 w-full min-w-0 pr-1">
                        <p className="text-sm text-[#E5E1E4] leading-relaxed pr-4">{activity.text}</p>
                        <span className="text-xs text-zinc-500 font-mono shrink-0 whitespace-nowrap text-right pt-0.5">{activity.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
            
          </div>

          {/* RIGHT COLUMN (40%) */}
          <div className="col-span-4 flex flex-col gap-6 w-full">
            
            {/* My Projects */}
            <Card className="bg-[#201F21] border-zinc-800 shadow-none rounded-md overflow-hidden">
              <CardHeader className="py-4 px-5">
                <CardTitle className="text-sm font-medium text-zinc-400 uppercase tracking-wider">My Projects</CardTitle>
              </CardHeader>
              <div className="flex flex-col pb-2">
                {[
                  { color: "bg-blue-500", name: "Frontend Redesign", workspace: "Engineering", progress: 65 },
                  { color: "bg-[#7C5CFC]", name: "Sprint 3", workspace: "Engineering", progress: 24 },
                  { color: "bg-emerald-500", name: "Q4 Marketing Strategy", workspace: "Marketing", progress: 8 }
                ].map((project, i) => (
                  <div key={i} className="flex items-center justify-between py-3 px-5 hover:bg-zinc-800/50 transition-colors cursor-pointer">
                    <div className="flex items-center gap-4 min-w-0">
                      <div className={`h-[32px] w-[32px] rounded-md ${project.color} shrink-0`} />
                      <div className="flex flex-col pr-4 min-w-0 truncate">
                        <span className="text-sm font-medium text-[#E5E1E4] truncate">{project.name}</span>
                        <span className="text-xs text-zinc-400 truncate">{project.workspace}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 w-1/3 justify-end shrink-0">
                      <Progress value={project.progress} className="h-1.5 bg-zinc-700 w-full rounded-full" indicatorClassName="bg-[#7C5CFC] rounded-full" />
                      <span className="text-xs text-zinc-400 right-aligned w-8 text-right">{project.progress}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Channels */}
            <Card className="bg-[#201F21] border-zinc-800 shadow-none rounded-md overflow-hidden">
              <CardHeader className="py-4 px-5">
                <CardTitle className="text-sm font-medium text-zinc-400 uppercase tracking-wider">Channels</CardTitle>
              </CardHeader>
              <div className="flex flex-col pb-2">
                {[
                  { name: "engineering", msg: "Are we deploying today?", time: "10:24 AM", unread: 3 },
                  { name: "design", msg: "Updated the figma components...", time: "Yesterday", unread: 0 },
                  { name: "general", msg: "Townhall at 3pm tomorrow.", time: "Monday", unread: 0 }
                ].map((channel, i) => (
                  <div key={i} className="flex items-center justify-between py-3 px-5 hover:bg-zinc-800/50 transition-colors cursor-pointer">
                    <div className="flex flex-col flex-1 gap-1 min-w-0 pr-4">
                      <div className="flex items-center gap-2">
                        <span className="text-zinc-500 text-lg font-light leading-none">#</span>
                        <span className={`text-sm font-medium truncate ${channel.unread ? 'text-[#E5E1E4]' : 'text-[#E5E1E4]'}`}>
                          {channel.name}
                        </span>
                        {channel.unread > 0 && (
                          <Badge className="h-5 rounded-full bg-[#F95B4E] hover:bg-[#F95B4E] px-1.5 py-0 text-[10px] text-white border-none">
                            {channel.unread}
                          </Badge>
                        )}
                      </div>
                      <p className={`text-xs truncate ${channel.unread ? 'text-zinc-300' : 'text-zinc-400'}`}>
                        {channel.msg}
                      </p>
                    </div>
                    <span className="text-xs text-zinc-500 font-mono shrink-0 whitespace-nowrap">{channel.time}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Upcoming */}
            <Card className="bg-[#201F21] border-zinc-800 shadow-none rounded-md overflow-hidden">
              <CardHeader className="py-4 px-5">
                <CardTitle className="text-sm font-medium text-zinc-400 uppercase tracking-wider">Upcoming</CardTitle>
              </CardHeader>
              <div className="flex flex-col pb-2">
                {[
                  { title: "Review staging environment", date: "Tomorrow", badge: "Engineering" },
                  { title: "Design sync with marketing", date: "Oct 25", badge: "Design" },
                  { title: "Submit expenses for Q3", date: "Oct 26", badge: "Admin" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 py-3 px-5 hover:bg-zinc-800/50 transition-colors cursor-pointer w-full">
                    <div className="flex flex-col grow min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline" className="text-[10px] font-normal bg-zinc-800 border-none text-zinc-400 rounded-sm">
                          {item.date}
                        </Badge>
                        <Badge variant="outline" className="text-[10px] font-normal bg-transparent border-none text-zinc-500 rounded-sm px-0">
                          {item.badge}
                        </Badge>
                      </div>
                      <span className="text-sm font-medium text-[#E5E1E4] truncate">{item.title}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

          </div>
        </div>
        
      </div>
    </ScrollArea>
  );
}
