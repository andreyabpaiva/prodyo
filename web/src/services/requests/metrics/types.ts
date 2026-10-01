export interface IterationMetrics {
  iteration_id: string;
  velocity: number;
  instability_index: number;
  rework_index: number;
}

export interface ProjectMetrics {
  project_id: string;
  iterations: IterationMetrics[];
}
