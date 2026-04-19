import { useState } from "react";

export default function TaskForm({ onAdd }: any) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("LOW");

  const handleSubmit = () => {
    if (!title.trim()) return;

    onAdd({ title, description, priority });

    setTitle("");
    setDescription("");
    setPriority("LOW");
  };

  return (
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

      <button style={styles.button} onClick={handleSubmit}>
        + Add
      </button>
    </div>
  );
}

const styles: any = {
  form: { display: "flex", gap: "10px", marginBottom: "20px" },
  input: { flex: 1, padding: "10px", borderRadius: "8px" },
  select: { padding: "10px", borderRadius: "8px" },
  button: { padding: "10px", borderRadius: "8px" },
};