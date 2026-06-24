"use client";

import { useMemo, useState } from "react";
import { ChatPanel } from "./chat-panel";
import { InspectorPanel } from "./inspector-panel";
import {
  activities as activitySeed,
  contextFiles,
  initialMessages,
  plugins as pluginSeed,
  sessions,
  type Activity,
  type ChatMessage,
  type Plugin,
} from "./mock-data";
import { WorkspaceSidebar } from "./workspace-sidebar";

type InspectorView = "plugins" | "activity";

export function CodexWorkspace() {
  const [activeSessionId, setActiveSessionId] = useState(sessions[0].id);
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [draft, setDraft] = useState("");
  const [mode, setMode] = useState("Code");
  const [contextEnabled, setContextEnabled] = useState(true);
  const [plugins, setPlugins] = useState<Plugin[]>(pluginSeed);
  const [selectedPluginId, setSelectedPluginId] = useState(pluginSeed[0].id);
  const [inspectorView, setInspectorView] = useState<InspectorView>("plugins");
  const [activities, setActivities] = useState<Activity[]>(activitySeed);

  const selectedPlugin = useMemo(
    () => plugins.find((plugin) => plugin.id === selectedPluginId) ?? plugins[0],
    [plugins, selectedPluginId],
  );

  const connectedCount = useMemo(
    () => plugins.filter((plugin) => plugin.status === "connected").length,
    [plugins],
  );

  function handleNewThread() {
    setMessages([
      {
        id: `new-${Date.now()}`,
        role: "assistant",
        meta: "Codex · new thread",
        content:
          "Fresh workspace ready. Add a task, choose a mode, and Codex will pull from the selected project context and connected plugins.",
      },
    ]);
    setActiveSessionId(sessions[0].id);
  }

  function handleSend() {
    const trimmed = draft.trim();

    if (!trimmed) {
      return;
    }

    const timestamp = Date.now();
    const connectedPlugins = plugins
      .filter((plugin) => plugin.status === "connected")
      .slice(0, 3)
      .map((plugin) => plugin.name)
      .join(", ");

    setMessages((current) => [
      ...current,
      {
        id: `user-${timestamp}`,
        role: "user",
        meta: "You · composer",
        content: trimmed,
      },
      {
        id: `assistant-${timestamp}`,
        role: "assistant",
        meta: `Codex · ${mode.toLowerCase()} mode`,
        content: `I will use ${contextEnabled ? "auto context" : "selected context"} with ${connectedPlugins || "local tools"} and turn that into the next concrete step.`,
      },
    ]);
    setActivities((current) => [
      {
        id: `activity-${timestamp}`,
        label: "Queued prompt",
        detail: trimmed.length > 92 ? `${trimmed.slice(0, 92)}...` : trimmed,
        time: "Now",
        state: "active",
      },
      ...current.map((activity) =>
        activity.state === "active" ? { ...activity, state: "done" as const } : activity,
      ),
    ]);
    setDraft("");
    setInspectorView("activity");
  }

  function handleTogglePlugin(id: string) {
    setPlugins((current) =>
      current.map((plugin) => {
        if (plugin.id !== id) {
          return plugin;
        }

        return {
          ...plugin,
          status: plugin.status === "connected" ? "available" : "connected",
          lastUsed: plugin.status === "connected" ? plugin.lastUsed : "Just now",
        };
      }),
    );
  }

  return (
    <div className="min-h-screen bg-[#f4f1e9] text-[#22211e]">
      <div className="flex min-h-screen flex-col lg:flex-row">
        <WorkspaceSidebar
          sessions={sessions}
          activeSessionId={activeSessionId}
          connectedCount={connectedCount}
          onSelectSession={setActiveSessionId}
          onNewThread={handleNewThread}
        />

        <main className="flex min-h-[72vh] min-w-0 flex-1 flex-col bg-[#fbfaf7] lg:min-h-screen">
          <ChatPanel
            messages={messages}
            draft={draft}
            mode={mode}
            contextEnabled={contextEnabled}
            contextFiles={contextFiles}
            onDraftChange={setDraft}
            onModeChange={setMode}
            onToggleContext={() => setContextEnabled((value) => !value)}
            onSend={handleSend}
            onShowPlugins={() => setInspectorView("plugins")}
            onShowActivity={() => setInspectorView("activity")}
          />
        </main>

        <InspectorPanel
          view={inspectorView}
          plugins={plugins}
          selectedPlugin={selectedPlugin}
          activities={activities}
          onViewChange={setInspectorView}
          onSelectPlugin={setSelectedPluginId}
          onTogglePlugin={handleTogglePlugin}
        />
      </div>
    </div>
  );
}
