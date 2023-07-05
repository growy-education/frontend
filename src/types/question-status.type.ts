export enum QuestionStatus {
  // available for customers
  AVAILABLE = "AVAILABLE",
  // waiting check from admin
  CHECKING = "CHECKING",
  // assigned to teacher
  ASSIGNED = "ASSIGNED",
  // waiting assigned to teacher
  PENDING = "PENDING",
  // cancelled by user
  CANCELED = "CANCELED",
}
