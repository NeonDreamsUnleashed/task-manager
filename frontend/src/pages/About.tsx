export default function About() {
  const stack = [
    { icon: "⚛", name: "React 19", desc: "SPA framework" },
    { icon: "🔷", name: "TypeScript", desc: "Type safety" },
    { icon: "🟢", name: "Node.js + Express", desc: "REST API" },
    { icon: "🗃", name: "Prisma + PostgreSQL", desc: "Database ORM" },
    { icon: "🐳", name: "Docker Compose", desc: "Containerization" },
    { icon: "⚡", name: "Vite", desc: "Build tool" },
  ];

  const features = [
    "Kanban-доска с drag & drop",
    "Оптимистичное обновление UI",
    "JWT авторизация",
    "Три уровня приоритета задач",
    "Dashboard с аналитикой",
    "Страница профиля с достижениями",
    "Адаптивный дизайн",
    "Контейнеризация через Docker",
  ];

  return (
    <div className="page-about">
      <div className="page-header">
        <h1 className="page-title">О проекте</h1>
        <p className="page-sub">Full-stack Kanban Task Manager</p>
      </div>

      {/* HERO */}
      <div className="about-hero">
        <div className="about-hero-icon">⬡</div>
        <h2 className="about-hero-title">TaskFlow</h2>
        <p className="about-hero-desc">
          Учебный full-stack проект — система управления задачами в стиле Trello / Linear.
          Цель: изучение архитектуры SPA, REST API, DnD и UI/UX паттернов.
        </p>
        <div className="about-badges">
          {["Kanban", "REST API", "SPA", "Full-stack", "Docker"].map((b) => (
            <span key={b} className="about-badge">{b}</span>
          ))}
        </div>
      </div>

      {/* TECH STACK */}
      <div className="dash-card">
        <h3 className="dash-card-title">⚙ Tech Stack</h3>
        <div className="stack-grid">
          {stack.map((s) => (
            <div key={s.name} className="stack-item">
              <span className="stack-icon">{s.icon}</span>
              <div>
                <div className="stack-name">{s.name}</div>
                <div className="stack-desc">{s.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FEATURES */}
      <div className="dash-card">
        <h3 className="dash-card-title">✦ Возможности</h3>
        <div className="features-grid">
          {features.map((f) => (
            <div key={f} className="feature-item">
              <span className="feature-check">✓</span>
              {f}
            </div>
          ))}
        </div>
      </div>

      {/* DID YOU KNOW */}
      <div className="dash-card about-accent-card">
        <h3 className="dash-card-title">💡 Знаете ли вы?</h3>
        <p className="about-fact">
          Kanban-система была разработана в Toyota в 1940-х для оптимизации производственных процессов.
          Сегодня она лежит в основе Jira, Trello, Linear и тысяч других SaaS-инструментов.
        </p>
      </div>

      <div className="about-footer">
        <span>TaskFlow v2.0</span>
        <span>·</span>
        <span>2026</span>
        <span>·</span>
        <span>Educational Project</span>
      </div>
    </div>
  );
}
