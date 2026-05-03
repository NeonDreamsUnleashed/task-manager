import { useTasks } from "../hooks/useTasks";

export default function Dashboard() {
  const { stats, loading, tasks } = useTasks();

  const recent = [...tasks]
    .sort((a, b) => (a.id > b.id ? -1 : 1))
    .slice(0, 5);

  const statCards = [
    { label: "Всего задач",    value: stats.total,          icon: "◈", cls: "stat-total" },
    { label: "К выполнению",   value: stats.todo,           icon: "○", cls: "stat-todo" },
    { label: "В процессе",     value: stats.inProgress,     icon: "◑", cls: "stat-progress" },
    { label: "Завершено",      value: stats.done,           icon: "●", cls: "stat-done" },
  ];

  return (
    <div className="page-dashboard">
      <div className="page-header">
        <div>
          <h1 className="page-title">Dashboard</h1>
          <p className="page-sub">Обзор всех задач и прогресс</p>
        </div>
      </div>

      {loading ? (
        <div className="loading-state"><div className="spinner" /></div>
      ) : (
        <>
          {/* STAT CARDS */}
          <div className="stat-grid">
            {statCards.map((s) => (
              <div key={s.label} className={"stat-card " + s.cls}>
                <div className="stat-icon">{s.icon}</div>
                <div className="stat-value">{s.value}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>

          {/* PROGRESS */}
          <div className="dash-row">
            <div className="dash-card dash-card-wide">
              <h3 className="dash-card-title">Прогресс выполнения</h3>
              <div className="progress-wrap">
                <div className="progress-bar-track">
                  <div
                    className="progress-bar-fill"
                    style={{ width: stats.completionRate + "%" }}
                  />
                </div>
                <span className="progress-pct">{stats.completionRate}%</span>
              </div>
              <p className="progress-hint">
                {stats.done} из {stats.total} задач выполнено
              </p>
            </div>

            {/* PRIORITY BREAKDOWN */}
            <div className="dash-card">
              <h3 className="dash-card-title">По приоритету</h3>
              <div className="prio-list">
                <div className="prio-row">
                  <span className="prio-dot prio-dot-high" />
                  <span className="prio-name">High</span>
                  <span className="prio-val">{stats.high}</span>
                </div>
                <div className="prio-row">
                  <span className="prio-dot prio-dot-medium" />
                  <span className="prio-name">Medium</span>
                  <span className="prio-val">{stats.medium}</span>
                </div>
                <div className="prio-row">
                  <span className="prio-dot prio-dot-low" />
                  <span className="prio-name">Low</span>
                  <span className="prio-val">{stats.low}</span>
                </div>
              </div>
            </div>
          </div>

          {/* RECENT TASKS */}
          <div className="dash-card">
            <h3 className="dash-card-title">Последние задачи</h3>
            {recent.length === 0 ? (
              <p className="empty-hint">Нет задач. Создайте первую на доске!</p>
            ) : (
              <div className="recent-list">
                {recent.map((t) => (
                  <div key={t.id} className="recent-item">
                    <span className={"prio-dot prio-dot-" + t.priority.toLowerCase()} />
                    <span className="recent-title">{t.title}</span>
                    <span className={"status-chip status-" + t.status.toLowerCase()}>
                      {t.status === "TODO" ? "To Do" : t.status === "IN_PROGRESS" ? "In Progress" : "Done"}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
