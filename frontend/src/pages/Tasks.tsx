import { useEffect, useState } from "react";
import api from "../api/axios";

type Task = {
  id: string;
  title: string;
  description?: string;
  priority: string;
  status: string;
};

export default function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  // CREATE
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("LOW");

  // FILTER
  const [filter, setFilter] = useState("ALL");

  // EDIT
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editPriority, setEditPriority] = useState("LOW");

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
  const addTask = async () => {
    if (!title.trim()) return;

    try {
      const res = await api.post("/tasks", {
        title,
        description,
        priority,
      });

      setTasks((prev) => [res.data, ...prev]);

      setTitle("");
      setDescription("");
      setPriority("LOW");
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

  // STATUS UPDATE
  const changeStatus = async (id: string, status: string) => {
    try {
      await api.put(`/tasks/${id}`, { status });

      setTasks((prev) =>
        prev.map((t) => (t.id === id ? { ...t, status } : t))
      );
    } catch (err) {
      console.log("STATUS ERROR:", err);
    }
  };

  // START EDIT
  const startEdit = (task: Task) => {
    setEditingId(task.id);
    setEditTitle(task.title);
    setEditDescription(task.description || "");
    setEditPriority(task.priority);
  };

  // SAVE EDIT
  const saveEdit = async (id: string) => {
    try {
      const res = await api.put(`/tasks/${id}`, {
        title: editTitle,
        description: editDescription,
        priority: editPriority,
      });

      setTasks((prev) =>
        prev.map((t) => (t.id === id ? res.data : t))
      );

      setEditingId(null);
    } catch (err) {
      console.log("EDIT ERROR:", err);
    }
  };

  // FILTER (FIXED)
  const filteredTasks =
    filter === "ALL"
      ? tasks
      : tasks.filter((t) => t.status === filter);

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.title}>📌 Tasks Board</h1>

        {/* CREATE */}
        <div style={styles.form}>
          <input
            style={styles.input}
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            style={styles.input}
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <select
            style={styles.select}
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="LOW">LOW</option>
            <option value="MEDIUM">MEDIUM</option>
            <option value="HIGH">HIGH</option>
          </select>

          <button style={styles.button} onClick={addTask}>
            + Add
          </button>
        </div>

        {/* FILTER (FIXED - setFilter USED) */}
        <div style={styles.filters}>
          {["ALL", "TODO", "IN_PROGRESS", "DONE"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                ...styles.filterBtn,
                background: filter === f ? "#22c55e" : "#334155",
              }}
            >
              {f}
            </button>
          ))}
        </div>

        {/* LIST */}
        {loading ? (
          <p style={styles.info}>Loading...</p>
        ) : (
          <div style={styles.grid}>
            {filteredTasks.map((t) => (
              <div key={t.id} style={styles.card}>
                {/* EDIT MODE */}
                {editingId === t.id ? (
                  <>
                    <input
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                    />

                    <input
                      value={editDescription}
                      onChange={(e) => setEditDescription(e.target.value)}
                    />

                    <select
                      value={editPriority}
                      onChange={(e) => setEditPriority(e.target.value)}
                    >
                      <option value="LOW">LOW</option>
                      <option value="MEDIUM">MEDIUM</option>
                      <option value="HIGH">HIGH</option>
                    </select>

                    <button onClick={() => saveEdit(t.id)}>Save</button>
                    <button onClick={() => setEditingId(null)}>Cancel</button>
                  </>
                ) : (
                  <>
                    <div style={styles.cardTop}>
                      <h3>{t.title}</h3>

                      <div>
                        <button onClick={() => startEdit(t)}>✏️</button>
                        <button onClick={() => deleteTask(t.id)}>✕</button>
                      </div>
                    </div>

                    <p style={styles.desc}>{t.description}</p>

                    <div style={styles.row}>
                      <span style={styles.badge}>{t.priority}</span>

                      <select
                        value={t.status}
                        onChange={(e) =>
                          changeStatus(t.id, e.target.value)
                        }
                      >
                        <option value="TODO">TODO</option>
                        <option value="IN_PROGRESS">IN_PROGRESS</option>
                        <option value="DONE">DONE</option>
                      </select>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const styles: any = {
  page: {
    minHeight: "100vh",
    background: "#0f172a",
    padding: "40px",
    fontFamily: "Arial",
    color: "white",
  },
  container: { maxWidth: "1000px", margin: "0 auto" },
  title: { fontSize: "32px", marginBottom: "20px" },

  form: { display: "flex", gap: "10px", marginBottom: "15px" },
  input: { flex: 1, padding: "10px", borderRadius: "8px", border: "none" },
  select: { padding: "10px", borderRadius: "8px" },

  button: {
    background: "#22c55e",
    border: "none",
    padding: "10px 15px",
    borderRadius: "8px",
    cursor: "pointer",
  },

  filters: { display: "flex", gap: "10px", marginBottom: "20px" },

  filterBtn: {
    border: "none",
    padding: "6px 10px",
    borderRadius: "6px",
    color: "white",
    cursor: "pointer",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: "15px",
  },

  card: {
    background: "#1e293b",
    padding: "15px",
    borderRadius: "12px",
  },

  cardTop: {
    display: "flex",
    justifyContent: "space-between",
  },

  deleteBtn: {
    background: "transparent",
    border: "none",
    color: "red",
    cursor: "pointer",
  },

  desc: {
    fontSize: "14px",
    color: "#cbd5e1",
    margin: "10px 0",
  },

  row: {
    display: "flex",
    justifyContent: "space-between",
  },

  badge: {
    background: "#334155",
    padding: "4px 8px",
    borderRadius: "6px",
  },

  info: {
    color: "#94a3b8",
  },
};