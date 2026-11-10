export type EventType = 'workflowSelected' | 'stageEvent' | 'deviation' | 'workflowCompleted';

export type StageStatus = 'entered' | 'blocked' | 'complete';

export type HumanCheckpoint = 'none' | 'recommended' | 'required';

export type DeviationStatus = 'applied' | 'refused';

export type Lane = 'inProgress' | 'blocked' | 'done';

export interface EventEnvelope {
  schemaVersion: string;
  timestamp: string;
  workItem: string;
  workflowId: string;
  note?: string;
  policyCitations?: string[];
}

export interface WorkflowSelectedEvent extends EventEnvelope {
  eventType: 'workflowSelected';
  workflowVersion?: string;
  chain?: string;
}

export interface StageEvent extends EventEnvelope {
  eventType: 'stageEvent';
  stageId: string;
  role: string;
  status: StageStatus;
  humanCheckpoint: HumanCheckpoint;
  hard?: boolean;
}

export interface DeviationEvent extends EventEnvelope {
  eventType: 'deviation';
  stageId: string;
  deviationStatus: DeviationStatus;
  reason: string;
  approvedBy?: string;
}

export interface WorkflowCompletedEvent extends EventEnvelope {
  eventType: 'workflowCompleted';
  outcome?: string;
  deviationCount?: number;
}

export type BoardEvent = WorkflowSelectedEvent | StageEvent | DeviationEvent | WorkflowCompletedEvent;

export interface WorkItem {
  workItem: string;
  workflowId: string;
  chain: string | null;
  events: BoardEvent[];
  citationCount: number;
  firstTimestamp: string;
  lastTimestamp: string;
  latest: BoardEvent | null;
  lane: Lane;
  latestNote: string;
}

declare module 'claude-code' {
  interface PluginState {
    'agent-board-kanban': { events: Shaped<BoardEvent[]> };
  }
}
