import { useEffect, useState } from "react";

export interface ToastData {
  id: number;
  message: string;
  type: "success" | "error" | "info";
}

let toastId = 0;
let globalSetToasts: ((fn: (prev: ToastData[]) => ToastData[]) => void) | null = null;

export function showToast(message: string, type: ToastData["type"] = "info") {
  if (globalSetToasts) {
    const id = ++toastId;
    globalSetToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      globalSetToasts?.((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  }
}

export function ToastContainer() {
  const [toasts, setToasts] = useState<ToastData[]>([]);
  useEffect(() => {
    globalSetToasts = setToasts;
    return () => { globalSetToasts = null; };
  }, []);

  return (
    <div className="toast-container">
      {toasts.map((t) => (
        <div key={t.id} className={`toast toast-${t.type}`}>
          <span className="toast-icon">
            {t.type === "success" ? "✓" : t.type === "error" ? "✕" : "ℹ"}
          </span>
          {t.message}
        </div>
      ))}
    </div>
  );
}
