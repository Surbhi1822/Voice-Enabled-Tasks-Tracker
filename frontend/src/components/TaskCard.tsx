import React from "react";
import { motion } from "framer-motion";
import { Pencil, Trash2 } from "lucide-react";
import type { ITask } from "../types";

interface TaskCardProps {
  task: ITask;
  onEditTask: (task: ITask) => void;
  onDeleteTask: (taskId: string) => void;
}

const getPriorityColor = (priority: ITask["priority"]) => {
  switch (priority) {
    case "low":
      return "bg-blue-500/20 text-blue-300";
    case "medium":
      return "bg-yellow-500/20 text-yellow-300";
    case "high":
      return "bg-red-500/20 text-red-300";
    case "urgent":
      return "bg-purple-500/20 text-purple-300";
    default:
      return "bg-muted text-muted-foreground";
  }
};

const TaskCard: React.FC<TaskCardProps> = ({ task, onEditTask, onDeleteTask }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="glass rounded-xl p-4 border border-ring-white hover:border-primary transition-all cursor-pointer"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <h3 className="text-lg font-semibold leading-snug">
            {task.title}
          </h3>

          {task.description && (
            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
              {task.description}
            </p>
          )}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => onEditTask(task)}
            className="p-2 hover:bg-secondary/50 rounded-md transition border-2 border-white-100"
          >
            <Pencil className="h-4 w-4 text-white" />
          </button>

          <button
            onClick={() => onDeleteTask(task._id)}
            className="p-2 hover:bg-destructive/50 rounded-md transition border-2 border-white-100"
          >
            <Trash2 className="h-4 w-4 text-destructive" />
          </button>
        </div>
      </div>

      <div className="mt-4 flex justify-between items-center">
        <span
          className={`px-2 py-1 text-xs rounded-md uppercase tracking-wide font-medium ${getPriorityColor(
            task.priority
          )}`}
        >
          {task.priority}
        </span>

        {task.dueDate && (
          <span className="text-xs text-muted-foreground font-mono">
            {new Date(task.dueDate).toLocaleDateString()}
          </span>
        )}
      </div>
    </motion.div>
  );
};

export default TaskCard;
