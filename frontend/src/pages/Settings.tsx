import { useEffect, useState } from "react";

type Theme = "dark" | "light";

export default function Settings() {
  const [theme, setTheme] = useState<Theme>(() => {
    return (localStorage.getItem("theme") as Theme) || "dark";
  });

  const [compactMode, setCompactMode] = useState<boolean>(() => {
    return localStorage.getItem("compact") === "true";
  });

  // 🎨 theme sync
  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // 🧩 compact sync
  useEffect(() => {
    localStorage.setItem("compact", String(compactMode));
    document.documentElement.setAttribute(
      "data-compact",
      String(compactMode)
    );
  }, [compactMode]);

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        {/* HEADER */}
        <div style={styles.header}>
          <h1 style={styles.title}>⚙️ Settings</h1>
          <p style={styles.subtitle}>
            Управление интерфейсом и поведением приложения
          </p>
        </div>

        {/* GRID */}
        <div style={styles.grid}>
          {/* THEME CARD */}
          <div style={styles.card}>
            <h3>🎨 Theme</h3>
            <p style={styles.text}>Выбор светлой или тёмной темы</p>

            <div style={styles.row}>
              <button
                onClick={() => setTheme("dark")}
                style={{
                  ...styles.button,
                  background:
                    theme === "dark" ? "#22c55e" : "#334155",
                }}
              >
                Dark
              </button>

              <button
                onClick={() => setTheme("light")}
                style={{
                  ...styles.button,
                  background:
                    theme === "light" ? "#22c55e" : "#334155",
                }}
              >
                Light
              </button>
            </div>
          </div>

          {/* UI CARD */}
          <div style={styles.card}>
            <h3>🧩 Interface</h3>

            <div style={styles.toggleRow}>
              <span>Compact mode</span>

              <input
                type="checkbox"
                checked={compactMode}
                onChange={() => setCompactMode((p) => !p)}
              />
            </div>

            <p style={styles.hint}>
              Уменьшает размер карточек задач
            </p>
          </div>

          {/* INFO CARD */}
          <div style={styles.cardFull}>
            <h3>ℹ️ About project</h3>

            <div style={styles.chips}>
              <span style={styles.chip}>React</span>
              <span style={styles.chip}>TypeScript</span>
              <span style={styles.chip}>Node.js</span>
              <span style={styles.chip}>REST API</span>
              <span style={styles.chip}>Drag & Drop</span>
            </div>

            <p style={styles.footerText}>
              Task Manager v1.0 — учебный проект Kanban системы
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
const styles: any = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0f172a, #020617)",
    color: "white",
    padding: "40px",
    fontFamily: "Inter, Arial",
  },

  container: {
    maxWidth: "900px",
    margin: "0 auto",
  },

  header: {
    marginBottom: "25px",
  },

  title: {
    fontSize: "36px",
    marginBottom: "6px",
  },

  subtitle: {
    color: "#94a3b8",
    fontSize: "14px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "16px",
  },

  card: {
    background: "#1e293b",
    padding: "18px",
    borderRadius: "14px",
    border: "1px solid #334155",
  },

  cardFull: {
    gridColumn: "1 / -1",
    background: "#1e293b",
    padding: "18px",
    borderRadius: "14px",
    border: "1px solid #334155",
  },

  text: {
    color: "#94a3b8",
    fontSize: "13px",
    marginBottom: "12px",
  },

  row: {
    display: "flex",
    gap: "10px",
  },

  button: {
    padding: "8px 14px",
    border: "none",
    borderRadius: "10px",
    color: "white",
    cursor: "pointer",
    transition: "0.2s",
  },

  toggleRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  hint: {
    fontSize: "12px",
    color: "#64748b",
    marginTop: "8px",
  },

  chips: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
    marginTop: "10px",
  },

  chip: {
    background: "#334155",
    padding: "6px 10px",
    borderRadius: "20px",
    fontSize: "12px",
  },

  footerText: {
    marginTop: "12px",
    fontSize: "12px",
    color: "#94a3b8",
  },
};