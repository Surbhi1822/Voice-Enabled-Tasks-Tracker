import { useState, useEffect } from "react";
import { Mic, List, LayoutGrid, Plus, Search, Filter } from "lucide-react";
import { toast } from "sonner";

import KanbanBoard from "../components/KanbanBoard";
import TaskList from "../components/TaskList";
import VoiceRecorder from "../components/VoiceRecorder";
import TaskModal from "../components/TaskModal";

import type { ITask, Priority, Status } from "../types";
import { api } from "../lib/api";

const Dashboard = () => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<ITask[]>([]);

  const [viewMode, setViewMode] = useState<"kanban" | "list">("kanban");
  const [showVoiceRecorder, setShowVoiceRecorder] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [editingTask, setEditingTask] = useState<ITask | null>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<Status | "all">("all");
  const [priorityFilter, setPriorityFilter] = useState<Priority | "all">("all");

  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      const params: Record<string, string> = {};

      if (statusFilter !== "all") params.status = statusFilter;
      if (priorityFilter !== "all") params.priority = priorityFilter;
      if (searchQuery) params.search = searchQuery;

      const response = await api.get("/tasks", { params });

      const data = Array.isArray(response.data) ? response.data : [];

      const normalized = data.map((t: any) => ({
        ...t,
        _id: t._id ?? t.id,
      }));

      setTasks(normalized);
      setFilteredTasks(normalized);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      toast.error("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [statusFilter, priorityFilter, searchQuery]);


  const handleCreateTask = () => {
    setEditingTask(null);
    setShowTaskModal(true);
  };

  const handleEditTask = (task: ITask) => {
    setEditingTask(task);
    setShowTaskModal(true);
  };

  const handleSaveTask = async (taskData: Partial<ITask>) => {
    try {
      if (editingTask) {
        await api.put(`/tasks/${editingTask._id}`, taskData);
        toast.success("Task updated successfully");
      } else {
        await api.post("/tasks", taskData);
        toast.success("Task created successfully");
      }

      await fetchTasks();
      setShowTaskModal(false);
      setEditingTask(null);
    } catch (error) {
      console.error("Error saving task:", error);
      toast.error("Failed to save task");
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      await api.delete(`/tasks/${taskId}`);
      toast.success("Task deleted successfully");
      await fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
      toast.error("Failed to delete task");
    }
  };

  const handleVoiceTaskCreated = async () => {
    await fetchTasks();
  };

  return (
    <div className="min-h-screen bg-background">

      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">

          <div>
            <h1 className="text-3xl font-heading font-bold">Voice Task Tracker</h1>
            <p className="text-sm text-muted-foreground font-mono">Speak your tasks into existence</p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setViewMode(viewMode === "kanban" ? "list" : "kanban")}
              className="p-2 border border-border rounded-md hover:bg-secondary/50 transition-colors"
            >
              {viewMode === "kanban" ? <List className="h-4 w-4" /> : <LayoutGrid className="h-4 w-4" />}
            </button>

            <button
              onClick={handleCreateTask}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors flex items-center gap-2"
            >
              <Plus className="h-4 w-4" /> New Task
            </button>
          </div>
        </div>
      </header>

      <div className="border-b border-border bg-card/30">
        <div className="container mx-auto px-6 py-4 flex flex-wrap items-center gap-4">

          <div className="flex-1 min-w-[200px] relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search tasks…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 px-3 py-2 bg-background border rounded-md text-sm focus:border-primary focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-2 px-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as Status | "all")}
              className="px-3 py-2 bg-background rounded-md text-sm border focus:border-primary focus:outline-none"
            >
              <option value="all">All Status</option>
              <option value="todo">To Do</option>
              <option value="in-progress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </div>

          <div className="flex items-center gap-2 px-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value as Priority | "all")}
              className="px-3 py-2 bg-background rounded-md text-sm border focus:border-primary focus:outline-none"
            >
              <option value="all">All Priority</option>
              <option value="urgent">Urgent</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-6 py-8">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <p className="text-muted-foreground">Loading tasks…</p>
          </div>
        ) : viewMode === "kanban" ? (
          <KanbanBoard
            tasks={filteredTasks}
            onEditTask={handleEditTask}
            onDeleteTask={handleDeleteTask}
          />
        ) : (
          <TaskList
            tasks={filteredTasks}
            onEditTask={handleEditTask}
            onDeleteTask={handleDeleteTask}
          />
        )}
      </main>

      <div className="fixed bottom-8 right-8 z-50">
        <button
          onClick={() => setShowVoiceRecorder(true)}
          className="h-16 w-16 rounded-full bg-primary text-primary-foreground neon-glow hover:scale-105 transition-transform flex items-center justify-center"
        >
          <Mic className="h-6 w-6" />
        </button>
      </div>

      {showVoiceRecorder && (
        <VoiceRecorder
          onClose={() => setShowVoiceRecorder(false)}
          onTaskCreated={handleVoiceTaskCreated}
        />
      )}

      {showTaskModal && (
        <TaskModal
          task={editingTask}
          onClose={() => {
            setShowTaskModal(false);
            setEditingTask(null);
          }}
          onSave={handleSaveTask}
        />
      )}
    </div>
  );
};

export default Dashboard;
