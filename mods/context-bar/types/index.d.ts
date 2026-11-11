export interface ContextUsageSnapshot {
  percent?: number;
  tokens?: number;
  window: number;
}

declare module 'claude-code' {
  interface PluginState {
    'context-bar': {
      usage: ContextUsageSnapshot | null;
      isHidden: boolean;
    };
  }
}
