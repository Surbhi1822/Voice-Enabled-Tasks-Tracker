import { Priority, Status } from "./task.interface";

export interface IParsedTask {
    rawTranscript: string;
    title: string;
    description?: string;
    priority: Priority;
    status: Status;
    dueDate?: string | null;
}