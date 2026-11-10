export interface AdrRecord {
  filename: string;
  title: string;
  content: string;
}

declare module 'claude-code' {
  interface PluginState {
    'agent-board-adr': {
      records: Shaped<AdrRecord[]>;
      selected: string | null;
    };
  }
}
