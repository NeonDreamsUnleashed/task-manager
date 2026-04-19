import { useState } from "react";
import type { Task } from "../types/task";

export default function TaskCard({
  task,
  onDelete,
  onStatus,
  onEdit,
}: {
  task: Task;
  onDelete: (id: string) => void;
  onStatus: (id: string, status: string) => void;
  onEdit: (id: string, data: any) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || "");
  const [priority, setPriority] = useState(task.priority);

  const save = () => {
    onEdit(task.id, { title, description, priority });
    setEditing(false);
  };

  return (
    <div style={styles.card}>
      {editing ? (
        <>
          <input value={title} onChange={(e) => setTitle(e.target.value)} />
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="LOW">LOW</option>
            <option value="MEDIUM">MEDIUM</option>
            <option value="HIGH">HIGH</option>
          </select>

          <div style={styles.actions}>
            <button onClick={save}>Save</button>
            <button onClick={() => setEditing(false)}>Cancel</button>
          </div>
        </>
      ) : (
        <>
          <div style={styles.top}>
            <h3>{task.title}</h3>

            <div>
              <button onClick={() => setEditing(true)}>✏️</button>
              <button onClick={() => onDelete(task.id)}>✕</button>
            </div>
          </div>

          <p>{task.description}</p>

          <div style={styles.row}>
            <span>{task.priority}</span>

            <select
              value={task.status}
              onChange={(e) => onStatus(task.id, e.target.value)}
            >
              <option value="TODO">TODO</option>
              <option value="IN_PROGRESS">IN_PROGRESS</option>
              <option value="DONE">DONE</option>
            </select>
          </div>
        </>
      )}
    </div>
  );
}

const styles: any = {
  card: {
    background: "#1e293b",
    padding: "16px",
    borderRadius: "12px",
  },
  top: { display: "flex", justifyContent: "space-between" },
  row: { display: "flex", justifyContent: "space-between" },
  actions: { marginTop: "10px", display: "flex", gap: "10px" },
};