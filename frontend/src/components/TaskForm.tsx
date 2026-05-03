import { useState } from "react";

export default function TaskForm({ onAdd }: { onAdd: (data: { title: string; description: string; priority: string }) => void }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("LOW");
  const [expanded, setExpanded] = useState(false);

  const handleSubmit = () => {
    if (!title.trim()) return;
    onAdd({ title, description, priority });
    setTitle("");
    setDescription("");
    setPriority("LOW");
    setExpanded(false);
  };

  return (
    <div className={"task-form" + (expanded ? " task-form-expanded" : "")}>
      <div className="task-form-row">
        <input
          className="form-input"
          placeholder="+ New task..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onFocus={() => setExpanded(true)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        />
        {!expanded && (
          <button className="btn-add" onClick={handleSubmit}>Add</button>
        )}
      </div>

      {expanded && (
        <>
          <textarea
            className="form-textarea"
            placeholder="Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={2}
          />
          <div className="task-form-footer">
            <select
              className="form-select"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="LOW">🟢 Low</option>
              <option value="MEDIUM">🟡 Medium</option>
              <option value="HIGH">🔴 High</option>
            </select>
            <div className="form-actions">
              <button className="btn-cancel-sm" onClick={() => setExpanded(false)}>Cancel</button>
              <button className="btn-add" onClick={handleSubmit}>Add Task</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
