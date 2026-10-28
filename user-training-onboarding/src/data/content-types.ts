/**
 * Types for the training content. Every policy/workflow mention in content is a
 * typed reference, validated by content-integrity.spec.ts against the live
 * registries (POL-10.6: training stays consistent with the policy framework).
 */

/** A policy identifier, e.g. "POL-2.3" — must exist in policies/registry.json. */
export type PolicyRef = `POL-${number}.${number}`;

/** A workflow identifier, e.g. "WF-FEATURE" — must exist in workflows/registry.json. */
export type WorkflowRef = `WF-${string}`;

export interface Lesson {
  /** Unique within the whole catalog, kebab-case. */
  id: string;
  title: string;
  /**
   * Lesson body. Minimal formatting: blank-line-separated paragraphs;
   * lines starting with "- " render as list items.
   */
  body: string;
  /** Policies this lesson teaches — rendered as live links into the policy browser. */
  policyRefs: PolicyRef[];
  workflowRefs?: WorkflowRef[];
}

export interface QuizQuestion {
  id: string;
  prompt: string;
  options: string[];
  /** Index into options. */
  correctIndex: number;
  /** Shown after answering — explains WHY, citing the policy. */
  explanation: string;
  policyRef?: PolicyRef;
}

export interface TrainingModule {
  /** Kebab-case module id, used in routes and progress keys. */
  id: string;
  title: string;
  /** One-line description shown on the home page card. */
  summary: string;
  lessons: Lesson[];
  quiz: QuizQuestion[];
}
