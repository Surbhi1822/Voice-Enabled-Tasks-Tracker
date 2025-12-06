import mongoose, { Schema, Document } from "mongoose";
import { ITask } from "../interfaces/task.interface";

export interface TaskDocument extends ITask, Document {}

const TaskSchema = new Schema<TaskDocument>(
  {
    title: { type: String, required: true },
    description: { type: String, default: "" },
    priority: {
      type: String,
      enum: ["urgent", "high", "medium", "low"],
      default: "medium",
    },
    status: {
      type: String,
      enum: ["todo", "in-progress", "done"],
      default: "todo",
    },
    dueDate: { type: Date, default: null },
  },
  { timestamps: true }
);

export const Task = mongoose.model<TaskDocument>("Task", TaskSchema);
