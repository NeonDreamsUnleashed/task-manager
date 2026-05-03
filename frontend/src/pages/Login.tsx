import { useState } from "react";
import api from "../api/axios";
import { useAuth } from "../contexts/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!email || !password) { setError("Заполните все поля"); return; }
    try {
      setLoading(true);
      setError("");

      let userEmail = email;
      let userName = name || email.split("@")[0];

      if (isRegister) {
        await api.post("/auth/register", { name, email, password });
        const res = await api.post("/auth/login", { email, password });
        login(res.data.token, { name: userName, email: userEmail });
      } else {
        const res = await api.post("/auth/login", { email, password });
        login(res.data.token, { name: userName, email: userEmail });
      }
    } catch {
      setError(isRegister ? "Ошибка регистрации. Проверьте данные." : "Неверный email или пароль.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-bg">
        <div className="login-orb login-orb-1" />
        <div className="login-orb login-orb-2" />
      </div>

      <div className="login-card">
        <div className="login-logo">
          <span className="login-logo-icon">⬡</span>
          <span className="login-logo-text">TaskFlow</span>
        </div>

        <h1 className="login-title">
          {isRegister ? "Создать аккаунт" : "Добро пожаловать"}
        </h1>
        <p className="login-sub">
          {isRegister ? "Начните управлять задачами" : "Войдите в свой аккаунт"}
        </p>

        <div className="login-fields">
          {isRegister && (
            <div className="field-group">
              <label className="field-label">Имя</label>
              <input
                className="field-input"
                placeholder="Иван Иванов"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          )}

          <div className="field-group">
            <label className="field-label">Email</label>
            <input
              className="field-input"
              placeholder="you@example.com"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="field-group">
            <label className="field-label">Пароль</label>
            <input
              className="field-input"
              placeholder="••••••••"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            />
          </div>
        </div>

        {error && <div className="login-error">{error}</div>}

        <button
          className="login-btn"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Загрузка..." : isRegister ? "Создать аккаунт" : "Войти"}
        </button>

        <button
          className="login-toggle"
          onClick={() => { setIsRegister(!isRegister); setError(""); }}
        >
          {isRegister ? "Уже есть аккаунт? Войти →" : "Нет аккаунта? Регистрация →"}
        </button>
      </div>
    </div>
  );
}
