import { Request, Response } from "express";
import { Task } from "../models/task.model";

export const createTask = async(req: Request, res: Response) =>{
    try{
        const payload = req.body;
        const task = await Task.create(payload);
        res.status(201).json(task);
    }
    catch(err: any){
        res.status(400).json({error: err.message});
    }
};
export const getTasks = async (req: Request, res: Response) => {
  try {
    const { status, priority, search } = req.query as {
      status?: string;
      priority?: string;
      search?: string;
    };

    const filter: any = {};

    if (status && status !== "all") {
      filter.status = status;
    }
    if (priority && priority !== "all") {
      filter.priority = priority;
    }
    if (search && search.trim().length > 0) {
      const s = search.trim();
      filter.$or = [
        { title: { $regex: s, $options: "i" } },
        { description: { $regex: s, $options: "i" } },
      ];
    }

    const tasks = await Task.find(filter).sort({ createdAt: -1 });
    res.json(tasks);

  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getTaskById = async (req: Request, res: Response) => {
    try {
        const task = await Task.findById(req.params.id);
        if(!task)
        {
            return res.status(404).json({error: "Task not found"});
        }
        res.json(task);
    }
    catch(err: any){
        res.status(500).json({error: err.message});
    }
}

export const updateTask = async (req: Request, res: Response) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!task) return res.status(404).json({ error: "Not found" });
    res.json(task);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ error: "Not found" });
    res.json({ message: "Deleted" });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};