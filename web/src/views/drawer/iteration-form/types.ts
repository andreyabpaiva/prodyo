import type {
  Iteration,
  IterationStatus,
} from "@/services/requests/iterations/types";
import type { DrawerFormProps } from "../types";

export interface IterationFormProps extends DrawerFormProps {
  projectId: string;
  source?: Iteration;
  nextIncrement: number;
}

export interface IterationFormValues {
  goal: string;
  startDate: string;
  endDate: string;
  status: IterationStatus;
}
