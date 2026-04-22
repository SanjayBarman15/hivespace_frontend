"use client"

import { Search, UserPlus, MoreHorizontal, Mail } from "lucide-react"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { CTAButton } from "@/components/CTAButton"
import { cn } from "@/lib/utils"

const members = [
  { id: 1, name: "JD", fullName: "John Doe", email: "john@acme.com", role: "Org Owner", status: "online", joined: "Jan 12", isYou: true },
  { id: 2, name: "MV", fullName: "Meera Varma", email: "meera@acme.com", role: "Team Lead", status: "online", joined: "Jan 13" },
  { id: 3, name: "RK", fullName: "Rahul Kumar", email: "rahul@acme.com", role: "Member", status: "online", joined: "Jan 14" },
  { id: 4, name: "DK", fullName: "David King", email: "david@acme.com", role: "Member", status: "away", joined: "Jan 15" },
  { id: 5, name: "SA", fullName: "Sanjay Arya", email: "sanjay@acme.com", role: "Member", status: "online", joined: "Jan 16" },
  { id: 6, name: "PL", fullName: "Priya Lakshmi", email: "priya@acme.com", role: "Member", status: "offline", joined: "Jan 17" },
  { id: 7, name: "RS", fullName: "Robert Smith", email: "robert@acme.com", role: "Member", status: "online", joined: "Jan 20" },
  { id: 8, name: "BA", fullName: "Billing Account", email: "billing@acme.com", role: "Billing Admin", status: "offline", joined: "Feb 1" },
]

const pendingInvites = [
  { email: "dev@acme.com", role: "Member", expires: "48h" },
  { email: "pm@acme.com", role: "Project Lead", expires: "12h" },
]

const roleColors: Record<string, string> = {
  "Org Owner": "text-[#7C5CFC] bg-[#7C5CFC]/10 border-[#7C5CFC]/20",
  "Org Admin": "text-blue-400 bg-blue-400/10 border-blue-400/20",
  "Workspace Admin": "text-teal-400 bg-teal-400/10 border-teal-400/20",
  "Team Lead": "text-amber-400 bg-amber-400/10 border-amber-400/20",
  "Member": "text-zinc-400 bg-zinc-800 border-zinc-700",
  "Viewer": "text-zinc-500 bg-zinc-800 border-zinc-700",
  "Billing Admin": "text-green-400 bg-green-400/10 border-green-400/20",
}

import { InviteModal } from "@/components/InviteModal"

export default function MembersSettings() {
  return (
    <div className="max-w-4xl px-8 py-6">
      <header className="mb-6">
        <h1 className="text-xl font-semibold text-[#E5E1E4]">Members</h1>
        <p className="text-sm text-zinc-400 mt-1">24 members in Engineering workspace</p>
      </header>

      <div className="flex flex-wrap items-center gap-3 mb-6">
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
          <Input 
            placeholder="Search members..." 
            className="pl-9 bg-zinc-800 border-zinc-700 h-9 text-sm focus-visible:ring-hs-accent/50"
          />
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-[140px] bg-zinc-800 border-zinc-700 h-9 text-sm text-zinc-300">
            <SelectValue placeholder="All roles" />
          </SelectTrigger>
          <SelectContent className="bg-zinc-900 border-zinc-800 text-zinc-300">
            <SelectItem value="all">All roles</SelectItem>
            <SelectItem value="owner">Org Owner</SelectItem>
            <SelectItem value="admin">Org Admin</SelectItem>
            <SelectItem value="lead">Team Lead</SelectItem>
            <SelectItem value="member">Member</SelectItem>
          </SelectContent>
        </Select>
        <div className="ml-auto">
          <InviteModal trigger={
            <CTAButton className="flex items-center gap-2">
              <UserPlus className="h-3.5 w-3.5" />
              Invite Member
            </CTAButton>
          } />
        </div>
      </div>

      <div className="space-y-1">
        {members.map((member) => (
          <div 
            key={member.id} 
            className="h-14 flex items-center gap-3 px-4 rounded-md transition-colors hover:bg-zinc-800/30 group"
          >
            <div className="relative">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-zinc-800 text-xs text-zinc-400 font-medium">
                  {member.name}
                </AvatarFallback>
              </Avatar>
              <div className={cn(
                "absolute -right-0.5 -bottom-0.5 w-2.5 h-2.5 rounded-full border-2 border-[#201F21]",
                member.status === "online" ? "bg-green-500" : member.status === "away" ? "bg-amber-500" : "bg-zinc-600"
              )} />
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-[#E5E1E4] truncate">{member.fullName}</span>
                {member.isYou && <span className="text-[10px] text-zinc-500 font-medium">(you)</span>}
              </div>
              <span className="text-xs text-zinc-400 truncate">{member.email}</span>
            </div>

            <div className="ml-6">
              <Select defaultValue={member.role}>
                <SelectTrigger className={cn(
                  "h-7 text-[10px] px-2 py-0 min-w-[110px] border font-medium rounded-sm bg-transparent",
                  roleColors[member.role]
                )}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-zinc-900 border-zinc-800 text-zinc-300">
                  <SelectItem value="Org Owner">Org Owner</SelectItem>
                  <SelectItem value="Team Lead">Team Lead</SelectItem>
                  <SelectItem value="Member">Member</SelectItem>
                  <SelectItem value="Billing Admin">Billing Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="ml-auto text-xs text-zinc-500">
              {member.joined}
            </div>

            <button className="p-2 text-zinc-500 hover:text-zinc-200 transition-opacity opacity-0 group-hover:opacity-100">
              <MoreHorizontal className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>

      <div className="mt-10">
        <h3 className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider mb-4 px-4">
          PENDING INVITES
        </h3>
        <div className="space-y-1">
          {pendingInvites.map((invite) => (
            <div key={invite.email} className="h-12 flex items-center gap-3 px-4 rounded-md hover:bg-zinc-800/20 group">
              <div className="h-8 w-8 rounded-md bg-zinc-800 flex items-center justify-center">
                <Mail className="h-4 w-4 text-zinc-500" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-zinc-300">{invite.email}</span>
                <span className="text-[10px] text-zinc-500 mt-0.5">{invite.role}</span>
              </div>
              <div className="ml-auto flex items-center gap-4">
                <span className="text-[10px] text-zinc-600">Expires in {invite.expires}</span>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="text-[10px] text-zinc-400 hover:text-zinc-200 uppercase font-bold tracking-widest px-2 py-1">Resend</button>
                  <button className="text-[10px] text-red-400/70 hover:text-red-400 uppercase font-bold tracking-widest px-2 py-1">Revoke</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
