export enum LessonStatus {
  /**
   * This status lesson is completed and cannot be modified.
   */
  COMPLETED = "COMPLETED",
  /**
   * This lesson is already confirmed by and assigned to the teacher.
   */
  CONFIRMED = "CONFIRMED",
  /**
   * This status task is pending for a confirmation by the  teacher.
   */
  PENDING = "PENDING",
}
