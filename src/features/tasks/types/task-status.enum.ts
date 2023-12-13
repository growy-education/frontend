export enum TaskStatus {
  /**
   * This status task is completed and cannot be modified.
   */
  COMPLETED = "COMPLETED",
  /**
   * This status task requrires reviewing by admin
   */
  REVIEWING = "REVIEWING",
  /**
   * This status task is started by and in progress by teacher.
   */
  IN_PROGRESS = "IN_PROGRESS",
  /**
   * This status task is already confirmed by and assigned to the teacher.
   */
  ASSIGNED = "ASSIGNED",
  /**
   * This status task is pending for a confirmation by the selected teacher.
   */
  PENDING = "PENDING",
  /**
   * This status task is already confirmed and rejected by the selected teacher.
   */
  REJECTED = "REJECTED",
  /**
   * This status task is canceled by the customer or admin
   */
  CANCELED = "CANCELED",
}
