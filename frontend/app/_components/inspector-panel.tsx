"use client";

import {
  Activity as ActivityIcon,
  Check,
  Clock3,
  Database,
  GitBranch,
  Globe2,
  Mail,
  MessageSquare,
  PenTool,
  Plug,
  Rocket,
  Search,
  ShieldCheck,
  Workflow,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";
import type { Activity, IconComponent, Plugin } from "./mock-data";

type InspectorPanelProps = {
  view: "plugins" | "activity";
  plugins: Plugin[];
  selectedPlugin: Plugin;
  activities: Activity[];
  onViewChange: (view: "plugins" | "activity") => void;
  onSelectPlugin: (id: string) => void;
  onTogglePlugin: (id: string) => void;
};

const pluginIcons: Record<string, IconComponent> = {
  github: GitBranch,
  browser: Globe2,
  figma: PenTool,
  mail: Mail,
  slack: MessageSquare,
  rocket: Rocket,
  shield: ShieldCheck,
  database: Database,
};

const statusLabels: Record<Plugin["status"], string> = {
  connected: "Connected",
  available: "Available",
  syncing: "Syncing",
};

const statusClasses: Record<Plugin["status"], string> = {
  connected: "bg-[#e5f2ea] text-[#1f6d48]",
  available: "bg-[#f0eee8] text-[#6f6a61]",
  syncing: "bg-[#fff4db] text-[#8a5b14]",
};

export function InspectorPanel({
  view,
  plugins,
  selectedPlugin,
  activities,
  onViewChange,
  onSelectPlugin,
  onTogglePlugin,
}: InspectorPanelProps) {
  return (
    <aside className="flex w-full shrink-0 flex-col border-t border-[#dedbd2] bg-[#f4f1e9] lg:h-full lg:min-h-0 lg:w-[372px] lg:overflow-hidden lg:border-l lg:border-t-0">
      <div className="flex shrink-0 items-center justify-between border-b border-[#dedbd2] px-4 py-3">
        <div>
          <div className="text-sm font-semibold text-[#22211e]">Inspector</div>
          <div className="text-xs text-[#706b62]">Plugins, activity, and permissions</div>
        </div>
        <div className="flex rounded-lg border border-[#d3d0c7] bg-[#ebe8df] p-1">
          <button
            type="button"
            onClick={() => onViewChange("plugins")}
            className={`grid size-8 place-items-center rounded-md ${
              view === "plugins" ? "bg-white text-[#22211e] shadow-sm" : "text-[#6b655c]"
            }`}
            title="Plugins"
          >
            <Plug size={16} />
          </button>
          <button
            type="button"
            onClick={() => onViewChange("activity")}
            className={`grid size-8 place-items-center rounded-md ${
              view === "activity" ? "bg-white text-[#22211e] shadow-sm" : "text-[#6b655c]"
            }`}
            title="Activity"
          >
            <ActivityIcon size={16} />
          </button>
        </div>
      </div>

      {view === "plugins" ? (
        <PluginDirectory
          plugins={plugins}
          selectedPlugin={selectedPlugin}
          onSelectPlugin={onSelectPlugin}
          onTogglePlugin={onTogglePlugin}
        />
      ) : (
        <ActivityPanel activities={activities} plugins={plugins} />
      )}
    </aside>
  );
}

function PluginDirectory({
  plugins,
  selectedPlugin,
  onSelectPlugin,
  onTogglePlugin,
}: {
  plugins: Plugin[];
  selectedPlugin: Plugin;
  onSelectPlugin: (id: string) => void;
  onTogglePlugin: (id: string) => void;
}) {
  const [query, setQuery] = useState("");
  const [source, setSource] = useState<Plugin["source"] | "All">("All");

  const sources: Array<Plugin["source"] | "All"> = ["All", "Curated", "Workspace", "Created"];
  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();

    return plugins.filter((plugin) => {
      const matchesSource = source === "All" || plugin.source === source;
      const matchesTerm =
        !term ||
        plugin.name.toLowerCase().includes(term) ||
        plugin.description.toLowerCase().includes(term) ||
        plugin.skills.some((skill) => skill.toLowerCase().includes(term));

      return matchesSource && matchesTerm;
    });
  }, [plugins, query, source]);

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
      <div className="shrink-0 space-y-3 border-b border-[#dedbd2] px-4 py-4">
        <label className="flex h-9 items-center gap-2 rounded-md border border-[#d3d0c7] bg-white px-3 text-[#6d685f]">
          <Search size={15} />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="min-w-0 flex-1 bg-transparent text-sm text-[#22211e] outline-none placeholder:text-[#8a847a]"
            placeholder="Search plugins"
            type="search"
          />
        </label>
        <div className="grid grid-cols-4 gap-1 rounded-lg border border-[#d3d0c7] bg-[#ebe8df] p-1">
          {sources.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setSource(item)}
              className={`h-8 rounded-md text-xs font-medium ${
                source === item ? "bg-white text-[#22211e] shadow-sm" : "text-[#6b655c] hover:bg-[#e2ded3]"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="min-h-0 flex-1 space-y-2 overflow-y-auto px-4 py-4">
        {filtered.map((plugin) => {
          const Icon = pluginIcons[plugin.icon] ?? Workflow;
          const active = plugin.id === selectedPlugin.id;

          return (
            <button
              key={plugin.id}
              type="button"
              onClick={() => onSelectPlugin(plugin.id)}
              className={`w-full rounded-lg border p-3 text-left transition ${
                active
                  ? "border-[#bdb6a9] bg-white shadow-sm"
                  : "border-[#d9d5cb] bg-[#fbfaf7] hover:border-[#c7c1b5]"
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="grid size-9 shrink-0 place-items-center rounded-md bg-[#ece8de] text-[#3f3a33]">
                  <Icon size={18} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="truncate text-sm font-semibold text-[#22211e]">{plugin.name}</span>
                    <span className={`shrink-0 rounded-md px-2 py-1 text-xs font-medium ${statusClasses[plugin.status]}`}>
                      {statusLabels[plugin.status]}
                    </span>
                  </div>
                  <p className="mt-1 line-clamp-2 text-xs leading-5 text-[#6d685f]">{plugin.description}</p>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {plugin.skills.slice(0, 3).map((skill) => (
                      <span key={skill} className="rounded-md bg-[#f0eee8] px-2 py-1 text-xs text-[#625c52]">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <PluginDetails plugin={selectedPlugin} onTogglePlugin={onTogglePlugin} />
    </div>
  );
}

function PluginDetails({
  plugin,
  onTogglePlugin,
}: {
  plugin: Plugin;
  onTogglePlugin: (id: string) => void;
}) {
  const Icon = pluginIcons[plugin.icon] ?? Workflow;
  const isConnected = plugin.status === "connected";

  return (
    <div className="shrink-0 border-t border-[#dedbd2] bg-[#fbfaf7] px-4 py-4">
      <div className="flex items-start gap-3">
        <div className="grid size-10 shrink-0 place-items-center rounded-md bg-[#22211e] text-white">
          <Icon size={19} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <div>
              <div className="text-sm font-semibold text-[#22211e]">{plugin.name}</div>
              <div className="text-xs text-[#6d685f]">{plugin.source} plugin</div>
            </div>
            <button
              type="button"
              onClick={() => onTogglePlugin(plugin.id)}
              className={`flex h-9 items-center gap-2 rounded-md px-3 text-sm font-semibold ${
                isConnected
                  ? "border border-[#cfcac0] bg-white text-[#4d4840] hover:bg-[#f4f1e9]"
                  : "bg-[#22211e] text-white hover:bg-[#34332f]"
              }`}
            >
              {isConnected ? <X size={15} /> : <Check size={15} />}
              {isConnected ? "Disconnect" : "Connect"}
            </button>
          </div>
          <div className="mt-3 grid gap-2">
            {plugin.permissions.map((permission) => (
              <div key={permission} className="flex items-center gap-2 text-xs text-[#5d584f]">
                <Check size={13} className="text-[#1f7a4d]" />
                {permission}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ActivityPanel({ activities, plugins }: { activities: Activity[]; plugins: Plugin[] }) {
  const connected = plugins.filter((plugin) => plugin.status === "connected");

  return (
    <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4">
      <div className="mb-4 rounded-lg border border-[#d9d5cb] bg-white p-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-semibold text-[#22211e]">Current run</div>
            <div className="mt-1 text-xs text-[#6d685f]">Auto context and local tools enabled</div>
          </div>
          <div className="grid size-9 place-items-center rounded-md bg-[#e5f2ea] text-[#1f6d48]">
            <ActivityIcon size={18} />
          </div>
        </div>
        <div className="mt-4 h-2 overflow-hidden rounded-md bg-[#ece8de]">
          <div className="h-full w-[68%] rounded-md bg-[#2f7551]" />
        </div>
        <div className="mt-2 flex justify-between text-xs text-[#6d685f]">
          <span>Context budget</span>
          <span>68%</span>
        </div>
      </div>

      <div className="space-y-3">
        {activities.map((activity) => (
          <div key={activity.id} className="flex gap-3 rounded-lg border border-[#d9d5cb] bg-[#fbfaf7] p-3">
            <div
              className={`mt-1 grid size-7 shrink-0 place-items-center rounded-md ${
                activity.state === "done"
                  ? "bg-[#e5f2ea] text-[#1f6d48]"
                  : activity.state === "active"
                    ? "bg-[#fff4db] text-[#8a5b14]"
                    : "bg-[#f0eee8] text-[#6d685f]"
              }`}
            >
              {activity.state === "queued" ? <Clock3 size={14} /> : <Check size={14} />}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-3">
                <span className="truncate text-sm font-semibold text-[#22211e]">{activity.label}</span>
                <span className="text-xs text-[#827c72]">{activity.time}</span>
              </div>
              <p className="mt-1 text-xs leading-5 text-[#6d685f]">{activity.detail}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 rounded-lg border border-[#d9d5cb] bg-white p-4">
        <div className="text-sm font-semibold text-[#22211e]">Connected tools</div>
        <div className="mt-3 flex flex-wrap gap-2">
          {connected.map((plugin) => {
            const Icon = pluginIcons[plugin.icon] ?? Workflow;

            return (
              <span key={plugin.id} className="flex h-8 items-center gap-2 rounded-md bg-[#f0eee8] px-2 text-xs text-[#4f4940]">
                <Icon size={14} />
                {plugin.name}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}
