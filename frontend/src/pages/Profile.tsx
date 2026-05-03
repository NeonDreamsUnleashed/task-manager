import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useTasks } from "../hooks/useTasks";
import { showToast } from "../components/Toast";

export default function Profile() {
  const { user, login, token } = useAuth();
  const { stats } = useTasks();
  const [editName, setEditName] = useState(false);
  const [newName, setNewName] = useState(user?.name || "");

  const initials = user?.name
    ? user.name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2)
    : "?";

  const saveName = () => {
    if (!newName.trim()) return;
    // update user in context/localStorage
    login(token!, { name: newName.trim(), email: user?.email || "" });
    setEditName(false);
    showToast("Имя обновлено", "success");
  };

  const achievements = [
    { icon: "🎯", label: "Первая задача",   unlocked: stats.total >= 1 },
    { icon: "🔥", label: "5 задач",          unlocked: stats.total >= 5 },
    { icon: "⚡", label: "10 задач",         unlocked: stats.total >= 10 },
    { icon: "✅", label: "Первое завершение", unlocked: stats.done >= 1 },
    { icon: "🏆", label: "50% выполнено",    unlocked: stats.completionRate >= 50 },
    { icon: "👑", label: "Всё выполнено",    unlocked: stats.completionRate === 100 && stats.total > 0 },
  ];

  return (
    <div className="page-profile">
      <div className="page-header">
        <h1 className="page-title">Профиль</h1>
        <p className="page-sub">Ваш аккаунт и достижения</p>
      </div>

      {/* USER CARD */}
      <div className="profile-card">
        <div className="profile-avatar-lg">{initials}</div>

        <div className="profile-info">
          {editName ? (
            <div className="profile-edit-row">
              <input
                className="field-input"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && saveName()}
                autoFocus
              />
              <button className="btn-add" onClick={saveName}>Сохранить</button>
              <button className="btn-cancel-sm" onClick={() => setEditName(false)}>Отмена</button>
            </div>
          ) : (
            <div className="profile-name-row">
              <h2 className="profile-name">{user?.name || "Пользователь"}</h2>
              <button className="task-btn" onClick={() => setEditName(true)}>✏</button>
            </div>
          )}
          <p className="profile-email">{user?.email}</p>
        </div>
      </div>

      {/* STATS */}
      <div className="profile-stats">
        <div className="profile-stat">
          <span className="ps-value">{stats.total}</span>
          <span className="ps-label">Всего задач</span>
        </div>
        <div className="profile-stat">
          <span className="ps-value">{stats.done}</span>
          <span className="ps-label">Выполнено</span>
        </div>
        <div className="profile-stat">
          <span className="ps-value">{stats.inProgress}</span>
          <span className="ps-label">В процессе</span>
        </div>
        <div className="profile-stat">
          <span className="ps-value">{stats.completionRate}%</span>
          <span className="ps-label">Завершённость</span>
        </div>
      </div>

      {/* ACHIEVEMENTS */}
      <div className="dash-card">
        <h3 className="dash-card-title">Достижения</h3>
        <div className="achievements-grid">
          {achievements.map((a) => (
            <div key={a.label} className={"achievement" + (a.unlocked ? " achievement-unlocked" : "")}>
              <span className="achievement-icon">{a.icon}</span>
              <span className="achievement-label">{a.label}</span>
              {!a.unlocked && <span className="achievement-lock">🔒</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
