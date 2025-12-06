import React from "react";
import TaskCard from "./TaskCard";
import type { ITask } from "../types";

interface TaskListProps {
  tasks: ITask[];
  onEditTask: (task: ITask) => void;
  onDeleteTask: (taskId: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onEditTask,
  onDeleteTask,
}) => {
  if (tasks.length === 0) {
    return (
      <div className="flex items-center justify-center h-40 text-muted-foreground">
        No tasks found.
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {tasks.map((task) => (
        <TaskCard
          key={task._id}
          task={task}
          onEditTask={onEditTask}
          onDeleteTask={onDeleteTask}
        />
      ))}
    </div>
  );
};

export default TaskList;
