export interface Project {
  id: string;
  name: string;
  description: string;
  tags: string[];
  created_at: string;
  updated_at: string;
}

export interface ProjectRef {
  projectId: string;
}

export interface ProjectPayload {
  name: string;
  description: string;
  tags: string[];
}

export type CreateProjectInput = ProjectPayload;

export interface UpdateProjectInput extends ProjectRef {
  payload: ProjectPayload;
}
