import { Type } from "class-transformer";
import { JobStatus } from "./job-status.enum";

export class Job {
  id: string;

  @Type(() => Date)
  createdAt: Date;

  @Type(() => Date)
  updatedAt: Date;

  status: JobStatus;

  @Type(() => Date)
  scheduledTime: Date;

  @Type(() => Date)
  executedTime: Date | null;

  schedulerJobName: string;

  deleted: boolean;
}
