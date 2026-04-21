export default function Info() {
  return (
    <div style={styles.page}>
      <div style={styles.container}>

        {/* HEADER */}
        <div style={styles.hero}>
          <h1 style={styles.title}>📌 Task Manager</h1>
          <p style={styles.subtitle}>
            Modern Kanban-based productivity system for task tracking and workflow management
          </p>
        </div>

        {/* ABOUT */}
        <div style={styles.card}>
          <h2>ℹ️ About project</h2>
          <p style={styles.text}>
            Это full-stack учебный проект, который имитирует реальные SaaS системы управления задачами
            (аналог Trello / Jira / Linear). Основная цель — изучение архитектуры, API и UI/UX паттернов.
          </p>

          <div style={styles.badges}>
            <span style={styles.badge}>Kanban System</span>
            <span style={styles.badge}>REST API</span>
            <span style={styles.badge}>SPA</span>
            <span style={styles.badge}>Full-stack</span>
          </div>
        </div>

        {/* STACK */}
        <div style={styles.card}>
          <h2>⚙️ Tech Stack</h2>

          <div style={styles.grid}>
            <div>⚛️ React + TypeScript</div>
            <div>🟢 Node.js + Express</div>
            <div>📡 Axios (HTTP client)</div>
            <div>🧠 REST Architecture</div>
            <div>🎯 Drag & Drop (DND)</div>
            <div>💾 Local State + API sync</div>
          </div>
        </div>

        {/* FEATURES */}
        <div style={styles.card}>
          <h2>🚀 Features</h2>

          <ul style={styles.list}>
            <li>✔ Create / update / delete tasks</li>
            <li>✔ Drag & drop between columns</li>
            <li>✔ Optimistic UI updates</li>
            <li>✔ Filtering by status</li>
            <li>✔ Real-time UI sync with backend</li>
            <li>✔ Editable task cards</li>
          </ul>
        </div>

        {/* FUN BLOCK */}
        <div style={styles.cardAccent}>
          <h2>💡 Did you know?</h2>
          <p style={styles.text}>
            Kanban система была создана в Toyota для оптимизации производства.
            Сегодня она используется в Jira, Trello, Linear и тысячах SaaS продуктов.
          </p>
        </div>

        {/* FOOTER */}
        <div style={styles.footer}>
          <span>v1.0.0</span>
          <span>•</span>
          <span>Frontend Learning Project</span>
          <span>•</span>
          <span>2026</span>
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

  hero: {
    marginBottom: "20px",
  },

  title: {
    fontSize: "36px",
    marginBottom: "6px",
  },

  subtitle: {
    color: "#94a3b8",
    fontSize: "14px",
  },

  card: {
    background: "#1e293b",
    padding: "18px",
    borderRadius: "14px",
    border: "1px solid #334155",
    marginTop: "15px",
  },

  cardAccent: {
    background: "linear-gradient(135deg, #1e293b, #0f172a)",
    padding: "18px",
    borderRadius: "14px",
    border: "1px solid #22c55e",
    marginTop: "15px",
  },

  text: {
    color: "#cbd5e1",
    lineHeight: "1.6",
    fontSize: "14px",
  },

  badges: {
    display: "flex",
    gap: "8px",
    marginTop: "10px",
    flexWrap: "wrap",
  },

  badge: {
    background: "#334155",
    padding: "6px 10px",
    borderRadius: "20px",
    fontSize: "12px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "10px",
    marginTop: "10px",
    color: "#cbd5e1",
  },

  list: {
    paddingLeft: "18px",
    color: "#cbd5e1",
    lineHeight: "1.8",
  },

  footer: {
    marginTop: "20px",
    display: "flex",
    gap: "10px",
    fontSize: "12px",
    color: "#64748b",
    justifyContent: "center",
  },
};