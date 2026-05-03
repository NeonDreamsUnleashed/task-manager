import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { showToast } from "../components/Toast";

type Theme = "dark" | "light";
type AccentColor = "violet" | "blue" | "emerald" | "rose";

const accentColors: { key: AccentColor; hex: string; label: string }[] = [
  { key: "violet",  hex: "#7c3aed", label: "Violet" },
  { key: "blue",    hex: "#2563eb", label: "Blue"   },
  { key: "emerald", hex: "#059669", label: "Emerald" },
  { key: "rose",    hex: "#e11d48", label: "Rose"   },
];

export default function Settings() {
  const { logout } = useAuth();
  const [theme, setTheme] = useState<Theme>(() =>
    (localStorage.getItem("theme") as Theme) || "dark"
  );
  const [accent, setAccent] = useState<AccentColor>(() =>
    (localStorage.getItem("accent") as AccentColor) || "violet"
  );
  const [compactMode, setCompactMode] = useState(() =>
    localStorage.getItem("compact") === "true"
  );

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("accent", accent);
    document.documentElement.setAttribute("data-accent", accent);
    const hex = accentColors.find((c) => c.key === accent)?.hex || "#7c3aed";
    document.documentElement.style.setProperty("--accent", hex);
  }, [accent]);

  useEffect(() => {
    localStorage.setItem("compact", String(compactMode));
    document.documentElement.setAttribute("data-compact", String(compactMode));
  }, [compactMode]);

  const clearData = () => {
    showToast("Данные сохранены в браузере, очищены настройки UI", "info");
    localStorage.removeItem("compact");
    localStorage.removeItem("accent");
    localStorage.removeItem("theme");
    setTheme("dark");
    setAccent("violet");
    setCompactMode(false);
  };

  return (
    <div className="page-settings">
      <div className="page-header">
        <h1 className="page-title">Настройки</h1>
        <p className="page-sub">Управление интерфейсом</p>
      </div>

      <div className="settings-grid">
        {/* THEME */}
        <div className="dash-card">
          <h3 className="dash-card-title">🎨 Тема</h3>
          <p className="setting-desc">Выберите цветовую схему интерфейса</p>
          <div className="theme-btns">
            <button
              className={"theme-btn" + (theme === "dark" ? " theme-btn-active" : "")}
              onClick={() => { setTheme("dark"); showToast("Тёмная тема", "info"); }}
            >
              🌙 Dark
            </button>
            <button
              className={"theme-btn" + (theme === "light" ? " theme-btn-active" : "")}
              onClick={() => { setTheme("light"); showToast("Светлая тема", "info"); }}
            >
              ☀ Light
            </button>
          </div>
        </div>

        {/* ACCENT */}
        <div className="dash-card">
          <h3 className="dash-card-title">✦ Акцентный цвет</h3>
          <p className="setting-desc">Цвет кнопок и выделений</p>
          <div className="accent-swatches">
            {accentColors.map((c) => (
              <button
                key={c.key}
                className={"accent-swatch" + (accent === c.key ? " accent-swatch-active" : "")}
                style={{ background: c.hex }}
                onClick={() => { setAccent(c.key); showToast(c.label + " акцент", "info"); }}
                title={c.label}
              />
            ))}
          </div>
        </div>

        {/* COMPACT */}
        <div className="dash-card">
          <h3 className="dash-card-title">🧩 Интерфейс</h3>
          <div className="setting-toggle-row">
            <div>
              <div className="setting-toggle-label">Компактный режим</div>
              <div className="setting-desc">Уменьшает размер карточек задач</div>
            </div>
            <button
              className={"toggle" + (compactMode ? " toggle-on" : "")}
              onClick={() => setCompactMode((p) => !p)}
            >
              <span className="toggle-thumb" />
            </button>
          </div>
        </div>

        {/* DANGER */}
        <div className="dash-card settings-danger">
          <h3 className="dash-card-title">⚠ Опасная зона</h3>
          <div className="danger-actions">
            <div>
              <div className="setting-toggle-label">Сбросить настройки UI</div>
              <div className="setting-desc">Вернуть тему и цвета к значениям по умолчанию</div>
            </div>
            <button className="btn-danger" onClick={clearData}>Сбросить</button>
          </div>
          <div className="danger-actions" style={{ marginTop: 16 }}>
            <div>
              <div className="setting-toggle-label">Выйти из аккаунта</div>
              <div className="setting-desc">Завершить сессию</div>
            </div>
            <button className="btn-danger" onClick={logout}>Выйти</button>
          </div>
        </div>
      </div>
    </div>
  );
}
