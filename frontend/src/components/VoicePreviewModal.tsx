import React, { useState } from "react";
import { motion } from "framer-motion";
import { Check, Calendar, AlertCircle, X } from "lucide-react";
import type { ITask } from "../types";

interface ParsedTask {
  rawTranscript: string;
  title: string;
  description?: string;
  priority: ITask["priority"];
  status: ITask["status"];
  dueDate?: string | null;
}

interface VoicePreviewProps {
  transcript: string;
  parsedTask: ParsedTask;
  onClose: () => void;
  onSave: (task: Partial<ITask>) => void;
}

const normalizeDate = (d: string | null): string => {
  if (!d) return "";
  if (d.includes("T")) return d.split("T")[0];
  return d;
};

interface LocalTaskState {
  title: string;
  description: string;
  priority: ITask["priority"];
  status: ITask["status"];
  dueDate: string;
}

const VoicePreviewModal: React.FC<VoicePreviewProps> = ({
  transcript,
  parsedTask,
  onClose,
  onSave,
}) => {
  const [taskData, setTaskData] = useState<LocalTaskState>({
    title: parsedTask.title ?? "",
    description: parsedTask.description ?? "",
    priority: parsedTask.priority ?? "medium",
    status: parsedTask.status ?? "todo",
    dueDate: normalizeDate(parsedTask.dueDate ?? null),
  });

  const handleSave = () => {
    onSave({
      title: taskData.title,
      description: taskData.description,
      priority: taskData.priority,
      status: taskData.status,
      dueDate: taskData.dueDate
        ? new Date(taskData.dueDate).toISOString()
        : undefined,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        onClick={(e) => e.stopPropagation()}
        className="relative glass rounded-2xl p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-visible"
      >
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-heading font-bold mb-2">
            Review Your Task
            </h2>
            <button onClick={onClose} className="p-2 hover:bg-destructive/60 rounded-md">
              <X className="h-5 w-5" />
            </button>
          </div>
          <p className="text-sm text-muted-foreground">
            Edit the details before saving
          </p>
        </div>

        <div className="mb-6 p-4 bg-gray-600/60 rounded-lg border border-border">
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle className="h-4 w-4 text-primary" />
            <span className="text-xs font-mono text-muted-foreground">
              Your Voice Input
            </span>
          </div>
          <p className="text-sm italic">"{transcript}"</p>
        </div>

        <div className="space-y-4">
          
          <div>
            <label className="text-sm font-medium mb-2 block">Title *</label>
            <input
              type="text"
              value={taskData.title}
              onChange={(e) =>
                setTaskData({ ...taskData, title: e.target.value })
              }
              placeholder="Task title"
              className="w-full px-3 py-2 bg-background border border-border rounded-md text-sm focus:border-primary focus:outline-none"
            />
          </div>

          
          <div>
            <label className="text-sm font-medium mb-2 block">
              Description
            </label>
            <textarea
              rows={3}
              value={taskData.description}
              onChange={(e) =>
                setTaskData({ ...taskData, description: e.target.value })
              }
              placeholder="Task description"
              className="w-full px-3 py-2 bg-background border border-border rounded-md text-sm focus:border-primary focus:outline-none resize-none"
            />
          </div>

          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Priority</label>
              <select
                value={taskData.priority}
                onChange={(e) =>
                  setTaskData({
                    ...taskData,
                    priority: e.target.value as ITask["priority"],
                  })
                }
                className="w-full px-3 py-2 bg-background border border-border rounded-md text-sm focus:border-primary focus:outline-none"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Status</label>
              <select
                value={taskData.status}
                onChange={(e) =>
                  setTaskData({
                    ...taskData,
                    status: e.target.value as ITask["status"],
                  })
                }
                className="w-full px-3 py-2 bg-background border border-border rounded-md text-sm focus:border-primary focus:outline-none"
              >
                <option value="todo">To Do</option>
                <option value="in-progress">In Progress</option>
                <option value="done">Done</option>
              </select>
            </div>
          </div>

          
          <div>
            <label className="text-sm font-medium mb-2 block">Due Date</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="date"
                value={taskData.dueDate || ""}
                onChange={(e) =>
                  setTaskData({ ...taskData, dueDate: e.target.value })
                }
                className="w-full pl-10 px-3 py-2 bg-background border border-border rounded-md text-sm focus:border-primary focus:outline-none"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 mt-8">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-border rounded-md hover:bg-destructive/50"
          >
            Cancel
          </button>

          <button
            disabled={!taskData.title}
            onClick={handleSave}
            className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <Check className="h-4 w-4" /> Create Task
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default VoicePreviewModal;
