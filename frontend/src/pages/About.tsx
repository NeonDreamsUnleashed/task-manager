export default function Info() {
  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>ℹ️ Project Information</h1>

        <p style={styles.text}>
          Это учебное full-stack приложение — Task Manager с Kanban-доской.
          Проект создан для изучения современных веб-технологий и архитектуры
          клиент-серверных приложений.
        </p>

        <div style={styles.section}>
          <h2 style={styles.subtitle}>⚙️ Tech Stack</h2>
          <ul style={styles.list}>
            <li>⚛️ React + TypeScript</li>
            <li>🟢 Node.js + Express backend</li>
            <li>🔗 REST API архитектура</li>
            <li>📦 Axios для запросов</li>
            <li>🎯 Drag & Drop (Kanban board)</li>
          </ul>
        </div>

        <div style={styles.section}>
          <h2 style={styles.subtitle}>🚀 Features</h2>
          <ul style={styles.list}>
            <li>Создание / редактирование / удаление задач</li>
            <li>Перетаскивание задач между статусами</li>
            <li>Фильтрация по статусу</li>
            <li>Оптимистичное обновление UI</li>
          </ul>
        </div>

        <div style={styles.footer}>
          <span>Version: 1.0.0</span>
          <span style={styles.dot}>•</span>
          <span>Frontend Project</span>
        </div>
      </div>
    </div>
  );
}

const styles: any = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #0f172a, #020617)",
    color: "white",
    padding: "40px",
    fontFamily: "Inter, Arial",
  },

  card: {
    maxWidth: "700px",
    background: "#1e293b",
    padding: "30px",
    borderRadius: "16px",
    border: "1px solid #334155",
    boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
  },

  title: {
    fontSize: "28px",
    marginBottom: "15px",
  },

  text: {
    color: "#cbd5e1",
    lineHeight: "1.6",
    marginBottom: "20px",
  },

  section: {
    marginTop: "20px",
  },

  subtitle: {
    fontSize: "18px",
    marginBottom: "10px",
  },

  list: {
    paddingLeft: "20px",
    color: "#94a3b8",
    lineHeight: "1.8",
  },

  footer: {
    marginTop: "25px",
    display: "flex",
    gap: "10px",
    color: "#64748b",
    fontSize: "13px",
  },

  dot: {
    opacity: 0.5,
  },
};