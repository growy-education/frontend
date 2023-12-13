export enum Subject {
  JAPANESE = "JAPANESE",
  MATHEMATICS = "MATHEMATICS",
  SCIENCE = "SCIENCE",
  SOCIALSTUDIES = "SOCIAL_STUDIES",
}

export function getSubjectText(subject: Subject): string {
  switch (subject) {
    case Subject.JAPANESE:
      return "国語";
    case Subject.MATHEMATICS:
      return "算数";
    case Subject.SCIENCE:
      return "理科";
    case Subject.SOCIALSTUDIES:
      return "社会";
  }
}

export function getSubjectColor(subject: Subject): string {
  switch (subject) {
    case Subject.JAPANESE:
      return "#FF0000";
    case Subject.MATHEMATICS:
      return "#0000FF";
    case Subject.SCIENCE:
      return "#FFA500";
    case Subject.SOCIALSTUDIES:
      return "#008000";
  }
}
