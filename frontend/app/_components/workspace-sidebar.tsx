import {
  Bell,
  Cloud,
  FolderGit2,
  MessageSquareText,
  PanelLeft,
  Plus,
  Search,
  Settings,
} from "lucide-react";
import type { Session } from "./mock-data";

type WorkspaceSidebarProps = {
  sessions: Session[];
  activeSessionId: string;
  connectedCount: number;
  onSelectSession: (id: string) => void;
  onNewThread: () => void;
};

const statusStyles: Record<Session["status"], string> = {
  running: "bg-[#1f7a4d]",
  paused: "bg-[#b77a1b]",
  done: "bg-[#78746b]",
};

export function WorkspaceSidebar({
  sessions,
  activeSessionId,
  connectedCount,
  onSelectSession,
  onNewThread,
}: WorkspaceSidebarProps) {
  return (
    <aside className="flex w-full flex-col border-b border-[#dedbd2] bg-[#ebe8df] lg:min-h-screen lg:w-[286px] lg:border-b-0 lg:border-r">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex min-w-0 items-center gap-3">
          <div className="grid size-8 shrink-0 place-items-center rounded-md bg-[#1d1d1b] text-sm font-semibold text-white">
            C
          </div>
          <div className="min-w-0">
            <div className="truncate text-sm font-semibold text-[#22211e]">Codex</div>
            <div className="truncate text-xs text-[#6d685f]">sahup / epsys</div>
          </div>
        </div>
        <button
          type="button"
          title="Collapse sidebar"
          className="grid size-8 place-items-center rounded-md text-[#5d584f] hover:bg-[#dedbd2] hover:text-[#22211e]"
        >
          <PanelLeft size={17} />
        </button>
      </div>

      <div className="px-3 pb-3">
        <button
          type="button"
          onClick={onNewThread}
          className="flex h-10 w-full items-center justify-center gap-2 rounded-md bg-[#1d1d1b] px-3 text-sm font-medium text-white hover:bg-[#34332f]"
        >
          <Plus size={16} />
          New Thread
        </button>
      </div>

      <div className="px-3 pb-3">
        <label className="flex h-9 items-center gap-2 rounded-md border border-[#d3d0c7] bg-[#f8f6f0] px-3 text-[#6d685f]">
          <Search size={15} />
          <input
            className="min-w-0 flex-1 bg-transparent text-sm text-[#22211e] outline-none placeholder:text-[#8a847a]"
            placeholder="Search threads"
            type="search"
          />
        </label>
      </div>

      <nav className="flex gap-1 overflow-x-auto px-3 pb-3 lg:flex-col lg:overflow-visible">
        {sessions.map((session) => {
          const active = session.id === activeSessionId;

          return (
            <button
              key={session.id}
              type="button"
              onClick={() => onSelectSession(session.id)}
              className={`min-w-[220px] rounded-lg border px-3 py-3 text-left transition lg:min-w-0 ${
                active
                  ? "border-[#c8c3b6] bg-[#f8f6f0] shadow-sm"
                  : "border-transparent hover:border-[#d3d0c7] hover:bg-[#f2efe7]"
              }`}
            >
              <div className="flex items-start gap-2">
                <span className={`mt-1 size-2 rounded-full ${statusStyles[session.status]}`} />
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium text-[#262520]">{session.title}</div>
                  <div className="mt-1 flex items-center gap-2 text-xs text-[#6d685f]">
                    <span className="truncate">{session.project}</span>
                    <span className="shrink-0">{session.updated}</span>
                  </div>
                </div>
              </div>
              <div className="mt-2 text-xs text-[#827c72]">{session.tokens} context</div>
            </button>
          );
        })}
      </nav>

      <div className="mt-auto hidden px-3 py-3 lg:block">
        <div className="space-y-1 border-t border-[#d7d3c8] pt-3">
          <button className="flex h-9 w-full items-center gap-2 rounded-md px-2 text-sm text-[#4e4941] hover:bg-[#dedbd2]" type="button">
            <FolderGit2 size={16} />
            Workspace
          </button>
          <button className="flex h-9 w-full items-center gap-2 rounded-md px-2 text-sm text-[#4e4941] hover:bg-[#dedbd2]" type="button">
            <Cloud size={16} />
            Cloud tasks
          </button>
          <button className="flex h-9 w-full items-center gap-2 rounded-md px-2 text-sm text-[#4e4941] hover:bg-[#dedbd2]" type="button">
            <MessageSquareText size={16} />
            Chats
          </button>
          <button className="flex h-9 w-full items-center gap-2 rounded-md px-2 text-sm text-[#4e4941] hover:bg-[#dedbd2]" type="button">
            <Bell size={16} />
            Notifications
          </button>
          <div className="flex items-center justify-between rounded-md px-2 py-2 text-sm text-[#4e4941]">
            <span>{connectedCount} plugins</span>
            <Settings size={16} />
          </div>
        </div>
      </div>
    </aside>
  );
}
