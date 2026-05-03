import { useEffect, useState } from "react";
import api from "../api/axios";
import type { Task } from "../types/task";

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get("/tasks");
        setTasks(res.data || []);
      } catch {
        setError("Не удалось загрузить задачи");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const addTask = async (data: { title: string; description: string; priority: string }) => {
    const res = await api.post("/tasks", data);
    setTasks((prev) => [res.data, ...prev]);
    return res.data as Task;
  };

  const deleteTask = async (id: string) => {
    await api.delete(`/tasks/${id}`);
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const editTask = async (id: string, data: Partial<Task>) => {
    const res = await api.put(`/tasks/${id}`, data);
    setTasks((prev) => prev.map((t) => (t.id === id ? res.data : t)));
    return res.data as Task;
  };

  const moveTask = async (id: string, newStatus: string) => {
    const prevTasks = [...tasks];
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: newStatus } : t))
    );
    try {
      await api.put(`/tasks/${id}`, { status: newStatus });
    } catch {
      setTasks(prevTasks);
    }
  };

  const getByStatus = (status: string) =>
    tasks.filter((t) => t.status === status);

  const stats = {
    total: tasks.length,
    todo: tasks.filter((t) => t.status === "TODO").length,
    inProgress: tasks.filter((t) => t.status === "IN_PROGRESS").length,
    done: tasks.filter((t) => t.status === "DONE").length,
    low: tasks.filter((t) => t.priority === "LOW").length,
    medium: tasks.filter((t) => t.priority === "MEDIUM").length,
    high: tasks.filter((t) => t.priority === "HIGH").length,
    completionRate:
      tasks.length > 0
        ? Math.round((tasks.filter((t) => t.status === "DONE").length / tasks.length) * 100)
        : 0,
  };

  return { tasks, loading, error, addTask, deleteTask, editTask, moveTask, getByStatus, stats };
}
