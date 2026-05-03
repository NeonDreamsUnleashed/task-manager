import { useState } from "react";
import type { Task } from "../types/task";

const priorityConfig: Record<string, { cls: string; label: string }> = {
  LOW:    { cls: "priority-low",    label: "Low" },
  MEDIUM: { cls: "priority-medium", label: "Medium" },
  HIGH:   { cls: "priority-high",   label: "High" },
};

export default function TaskCard({
  task,
  onDelete,
  onStatus,
  onEdit,
}: {
  task: Task;
  onDelete: (id: string) => void;
  onStatus: (id: string, status: string) => void;
  onEdit: (id: string, data: Partial<Task>) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || "");
  const [priority, setPriority] = useState(task.priority);

  const save = () => {
    onEdit(task.id, { title, description, priority });
    setEditing(false);
  };

  const pc = priorityConfig[task.priority] || priorityConfig.LOW;

  if (editing) {
    return (
      <div className="task-card task-card-editing">
        <input
          className="task-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task title"
        />
        <textarea
          className="task-textarea"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          rows={2}
        />
        <select
          className="task-select"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="LOW">Low priority</option>
          <option value="MEDIUM">Medium priority</option>
          <option value="HIGH">High priority</option>
        </select>
        <div className="task-edit-actions">
          <button className="btn-save" onClick={save}>Save</button>
          <button className="btn-cancel" onClick={() => setEditing(false)}>Cancel</button>
        </div>
      </div>
    );
  }

  return (
    <div className="task-card">
      <div className="task-card-header">
        <span className={"priority-badge " + pc.cls}>{pc.label}</span>
        <div className="task-actions">
          <button className="task-btn" onClick={() => setEditing(true)} title="Edit">✏</button>
          <button className="task-btn task-btn-delete" onClick={() => onDelete(task.id)} title="Delete">✕</button>
        </div>
      </div>

      <h4 className="task-title">{task.title}</h4>

      {task.description && (
        <p className="task-desc">{task.description}</p>
      )}

      <div className="task-card-footer">
        <select
          className="task-status-select"
          value={task.status}
          onChange={(e) => onStatus(task.id, e.target.value)}
        >
          <option value="TODO">To Do</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="DONE">Done</option>
        </select>
      </div>
    </div>
  );
}
