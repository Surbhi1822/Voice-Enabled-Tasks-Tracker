export type Priority = "urgent" | "high" | "medium" | "low";
export type Status = "todo" | "in-progress" | "done";

export interface ITask {
  _id: string; 

  title: string;
  description?: string;

  priority: Priority;
  status: Status;

  dueDate?: string | Date | null;

  createdAt?: string | Date;
  updatedAt?: string | Date;
}
export interface IParsedTask {
  rawTranscript: string;
  title: string;
  description?: string;

  priority: Priority;
  status: Status;
  dueDate?: string | null;
}
