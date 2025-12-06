import React from "react";
import TaskCard from "./TaskCard";
import type { ITask, Status } from "../types";

interface KanbanBoardProps {
  tasks: ITask[] | null | undefined;
  onEditTask: (task: ITask) => void;
  onDeleteTask: (taskId: string) => void;
}
const STATUS_COLUMNS: Status[] = ["todo", "in-progress", "done"];

const STATUS_LABELS: Record<Status, string> = {
  "todo": "To Do",
  "in-progress": "In Progress",
  "done": "Done",
};

const KanbanBoard: React.FC<KanbanBoardProps> = ({
  tasks,
  onEditTask,
  onDeleteTask,
}) => {
  const safeTasks: ITask[] = Array.isArray(tasks) ? tasks : [];

  const getTasksByStatus = (status: Status) =>
    safeTasks.filter((task) => task.status === status);

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {STATUS_COLUMNS.map((status) => {
        const columnTasks = getTasksByStatus(status);

        return (
          <div
            key={status}
            className="glass rounded-xl p-4 border border-white/5"
          >
            
            <div className="bg-secondary/50 shadow-md shadow-secondary/40 pl-10">
              <h2 className="text-lg font-heading font-bold mb-4 text-gray">
                {STATUS_LABELS[status]}
              </h2>
            </div>

            <div className="space-y-4">
              {columnTasks.map((task) => (
                <TaskCard
                  key={task._id}
                  task={task}
                  onEditTask={onEditTask}
                  onDeleteTask={onDeleteTask}
                />
              ))}

              
              {columnTasks.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No tasks.
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default KanbanBoard;
