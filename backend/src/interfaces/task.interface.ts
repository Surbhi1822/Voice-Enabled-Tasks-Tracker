export type Priority = 'urgent' | 'high' | 'medium' | 'low';
export type Status = 'todo' | 'in-progress' | 'done';

export interface ITask {
  title: string;
  description?: string;
  priority: Priority;
  status: Status;
  dueDate?: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
}
