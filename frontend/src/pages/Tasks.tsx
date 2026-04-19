import { useEffect, useState } from "react";
import api from "../api/axios";
import bg from "../assets/bg.jpg";

import {
  DragDropContext,
  Droppable,
  Draggable,
} from "@hello-pangea/dnd";

import TaskForm from "../components/TaskForm";
import TaskCard from "../components/TaskCard";

import type { Task } from "../types/task";

const columns = ["TODO", "IN_PROGRESS", "DONE"];

export default function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  // LOAD
  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get("/tasks");
        setTasks(res.data || []);
      } catch (err) {
        console.log("LOAD ERROR:", err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  // CREATE
  const addTask = async (data: any) => {
    try {
      const res = await api.post("/tasks", data);
      setTasks((prev) => [res.data, ...prev]);
    } catch (err) {
      console.log("CREATE ERROR:", err);
    }
  };

  // DELETE
  const deleteTask = async (id: string) => {
    try {
      await api.delete(`/tasks/${id}`);
      setTasks((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      console.log("DELETE ERROR:", err);
    }
  };

  // EDIT
  const editTask = async (id: string, data: any) => {
    try {
      const res = await api.put(`/tasks/${id}`, data);

      setTasks((prev) =>
        prev.map((t) => (t.id === id ? res.data : t))
      );
    } catch (err) {
      console.log("EDIT ERROR:", err);
    }
  };

  // 🔥 DRAG (FIXED WITHOUT LAG)
  const onDragEnd = async (result: any) => {
    if (!result.destination) return;

    const { draggableId, destination } = result;
    const newStatus = destination.droppableId;

    // 👉 сохраняем старый state (для отката)
    const prevTasks = [...tasks];

    // 🔥 1. мгновенно обновляем UI
    setTasks((prev) =>
      prev.map((t) =>
        t.id === draggableId ? { ...t, status: newStatus } : t
      )
    );

    try {
      // 🔥 2. отправляем на сервер
      await api.put(`/tasks/${draggableId}`, {
        status: newStatus,
      });
    } catch (err) {
      console.log("DND ERROR:", err);

      // ❗ если ошибка → откат
      setTasks(prevTasks);
    }
  };

  const getTasksByStatus = (status: string) =>
    tasks.filter((t) => t.status === status);

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>📌 Tasks Board</h1>

      <TaskForm onAdd={addTask} />

      {loading ? (
        <p style={styles.info}>Loading...</p>
      ) : (
        <DragDropContext onDragEnd={onDragEnd}>
          <div style={styles.board}>
            {columns.map((col) => (
              <Droppable droppableId={col} key={col}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    style={styles.column}
                  >
                    <h3 style={styles.columnTitle}>{col}</h3>

                    {getTasksByStatus(col).map((task, index) => (
                      <Draggable
                        key={task.id}
                        draggableId={task.id}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={{
                              ...provided.draggableProps.style,
                              transform: snapshot.isDragging
                                ? provided.draggableProps.style?.transform +
                                  " scale(1.03)"
                                : provided.draggableProps.style?.transform,
                              boxShadow: snapshot.isDragging
                                ? "0 10px 20px rgba(0,0,0,0.3)"
                                : "none",
                            }}
                          >
                            <TaskCard
                              task={task}
                              onDelete={deleteTask}
                              onStatus={async (id, status) => {
                                // тоже делаем без лага
                                setTasks((prev) =>
                                  prev.map((t) =>
                                    t.id === id ? { ...t, status } : t
                                  )
                                );

                                await api.put(`/tasks/${id}`, { status });
                              }}
                              onEdit={editTask}
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}

                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            ))}
          </div>
        </DragDropContext>
      )}
    </div>
  );
}

const styles: any = {
  page: {
    minHeight: "100vh",
    backgroundImage: `
      linear-gradient(rgba(2,6,23,0.85), rgba(2,6,23,0.9)),
      url(${bg})
    `,
    backgroundSize: "cover",
    padding: "40px",
    color: "white",
  },

  title: {
    fontSize: "36px",
    marginBottom: "20px",
  },

  board: {
    display: "flex",
    gap: "20px",
    marginTop: "20px",
  },

  column: {
    flex: 1,
    background: "#1e293b",
    padding: "15px",
    borderRadius: "12px",
    minHeight: "400px",
  },

  columnTitle: {
    marginBottom: "10px",
  },

  info: {
    color: "#94a3b8",
  },
};