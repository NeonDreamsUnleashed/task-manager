import { useState } from "react";
import api from "../api/axios";

export default function Login({ onLogin }: any) {
  const [isRegister, setIsRegister] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError("");

      if (isRegister) {
        await api.post("/auth/register", {
          name,
          email,
          password,
        });

        // после регистрации сразу логиним
        const res = await api.post("/auth/login", {
          email,
          password,
        });
        localStorage.setItem("token", res.data.token); 
        onLogin(res.data.token);
      } else {
        const res = await api.post("/auth/login", {
          email,
          password,
        });

        onLogin(res.data.token);
      }
    } catch (err: any) {
      setError("Ошибка авторизации");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h2 style={styles.title}>
          {isRegister ? "Регистрация" : "Вход"}
        </h2>

        {isRegister && (
          <input
            style={styles.input}
            placeholder="Имя"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        )}

        <input
          style={styles.input}
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          style={styles.input}
          placeholder="Пароль"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <div style={styles.error}>{error}</div>}

        <button
          style={styles.button}
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading
            ? "Загрузка..."
            : isRegister
            ? "Создать аккаунт"
            : "Войти"}
        </button>

        <button
          style={styles.link}
          onClick={() => setIsRegister(!isRegister)}
        >
          {isRegister
            ? "Уже есть аккаунт? Войти"
            : "Нет аккаунта? Регистрация"}
        </button>
      </div>
    </div>
  );
}

const styles: any = {
  wrapper: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f5f7fa",
  },
  card: {
    width: 320,
    padding: 30,
    borderRadius: 12,
    background: "#fff",
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
    gap: 15,
  },
  title: {
    textAlign: "center",
  },
  input: {
    padding: 10,
    borderRadius: 6,
    border: "1px solid #ccc",
  },
  button: {
    padding: 10,
    border: "none",
    borderRadius: 6,
    background: "#4f46e5",
    color: "white",
    cursor: "pointer",
  },
  link: {
    border: "none",
    background: "transparent",
    cursor: "pointer",
    color: "#4f46e5",
  },
  error: {
    color: "red",
    fontSize: 13,
    textAlign: "center",
  },
};