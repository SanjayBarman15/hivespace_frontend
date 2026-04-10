"use client";

import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetFooter 
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { X, Plus, Trash2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ManageTeamSheetProps {
  trigger: React.ReactNode;
}

export function ManageTeamSheet({ trigger }: ManageTeamSheetProps) {
  return (
    <Sheet>
      {trigger}
      <SheetContent className="w-[420px] bg-[#1B1B1D] border-zinc-800 text-[#E5E1E4] p-0 shadow-2xl flex flex-col">
        <SheetHeader className="p-6 border-b border-zinc-800/50">
          <SheetTitle className="text-[#E5E1E4] font-semibold text-lg">Manage Backend Team</SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto p-6 space-y-8 pb-20">
          {/* TEAM DETAILS */}
          <section className="space-y-4">
            <h3 className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Team Details</h3>
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs text-zinc-500 font-medium">Team Name</label>
                <Input defaultValue="Backend Team" className="bg-[#0E0E10] border-zinc-800 focus:border-violet-500/50 focus:ring-0 text-sm h-9" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs text-zinc-500 font-medium">Description</label>
                <Textarea 
                  defaultValue="Responsible for all server-side infrastructure, APIs, WebSocket, and GitHub integrations." 
                  className="bg-[#0E0E10] border-zinc-800 focus:border-violet-500/50 focus:ring-0 text-sm min-h-[100px] resize-none"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs text-zinc-500 font-medium">Team Lead</label>
                <Select defaultValue="mv">
                  <SelectTrigger className="bg-[#0E0E10] border-zinc-800 h-9 text-sm">
                    <SelectValue placeholder="Select Team Lead" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1B1B1D] border-zinc-800 text-[#E5E1E4]">
                    <SelectItem value="mv">Meera V.</SelectItem>
                    <SelectItem value="rk">Rahul K.</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </section>

          {/* MEMBERS */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Members</h3>
              <Button variant="ghost" className="h-6 text-[10px] text-violet-400 hover:text-violet-300 gap-1 px-0">
                <Plus className="h-3 w-3" />
                Add Member
              </Button>
            </div>
            <div className="space-y-3">
              {[
                { name: "Meera V.", role: "Lead", initials: "MV" },
                { name: "Rahul K.", role: "Member", initials: "RK" },
                { name: "Sanjay A.", role: "Member", initials: "SA" }
              ].map((member) => (
                <div key={member.name} className="flex items-center justify-between group">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-7 w-7 border border-zinc-700/50">
                      <AvatarFallback className="bg-zinc-800 text-zinc-400 text-[10px]">{member.initials}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-zinc-300">{member.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Select defaultValue={member.role === "Lead" ? "lead" : "member"}>
                      <SelectTrigger className="w-24 h-7 text-[10px] bg-transparent border-zinc-800">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-[#1B1B1D] border-zinc-800 text-[#E5E1E4]">
                        <SelectItem value="lead">Lead</SelectItem>
                        <SelectItem value="member">Member</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="ghost" size="icon" className="h-7 w-7 text-zinc-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity">
                      <X className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* PROJECTS */}
          <section className="space-y-4">
            <h3 className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Active Projects</h3>
            <div className="space-y-2">
               {[
                { name: "Frontend Redesign", color: "bg-blue-500" },
                { name: "Sprint 3", color: "bg-violet-500" }
              ].map(project => (
                <div key={project.name} className="flex items-center justify-between px-2 py-1.5 rounded-md hover:bg-zinc-800/30">
                  <div className="flex items-center gap-2">
                    <div className={cn("h-1.5 w-1.5 rounded-sm", project.color)} />
                    <span className="text-xs text-zinc-400">{project.name}</span>
                  </div>
                  <Button variant="ghost" className="h-6 text-[10px] text-zinc-600 hover:text-white px-1">Remove</Button>
                </div>
              ))}
            </div>
          </section>

          {/* DANGER ZONE */}
          <section className="space-y-4 bg-red-500/5 border border-red-500/10 rounded-md p-4">
            <div className="space-y-1">
              <h3 className="text-xs font-semibold text-red-400">Danger Zone</h3>
              <p className="text-[11px] text-zinc-500">This will not delete tasks or projects. Members will remain in the workspace.</p>
            </div>
            <Button variant="outline" className="w-full h-8 text-xs border-red-400/30 text-red-400 hover:bg-red-400 hover:text-white transition-colors">
              Delete Team
            </Button>
          </section>
        </div>

        <div className="p-6 border-t border-zinc-800/50 bg-[#1B1B1D] mt-auto">
          <Button className="w-full bg-gradient-to-br from-violet-500 to-violet-600 hover:from-violet-600 hover:to-violet-700 text-white font-bold text-xs uppercase tracking-wider py-5 rounded-md shadow-lg shadow-violet-500/20 transition-all duration-300">
            Save Changes
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
