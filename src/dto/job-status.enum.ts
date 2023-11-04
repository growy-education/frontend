export enum JobStatus {
  /**
   * This status job is executed and deleted.
   */
  EXECUTED = "EXECUTED",

  /**
   * This job is waiting for execution.
   */
  PENDING = "PENDING",
  /**
   * This status job is canceled for some reason.
   */
  CANCELED = "CANCELED",
}
