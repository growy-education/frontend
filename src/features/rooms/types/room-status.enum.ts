export enum RoomStatus {
  COMPLETED = "COMPLETED",
  SCHEDULED = "SCHEDULED",
  CANCELLED = "CANCELLED",
}

export const RoomStatuses = [
  RoomStatus.COMPLETED,
  RoomStatus.SCHEDULED,
  RoomStatus.CANCELLED,
];

export const getRoomStatusText = (status: RoomStatus) => {
  if (status === RoomStatus.CANCELLED) {
    return "開催中止";
  }
  if (status === RoomStatus.COMPLETED) {
    return "開催済み";
  }
  if (status === RoomStatus.SCHEDULED) {
    return "開催予定";
  }
  let _status: never;
  return _status;
};
