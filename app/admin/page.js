
"use client";

import { useState } from "react";

export default function AdminPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f2f6fa",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        fontFamily: "Arial, sans-serif",
      }}
    >
      <section
        style={{
          background: "#fff",
          width: "100%",
          maxWidth: 400,
          padding: 28,
          borderRadius: 18,
          boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
        }}
      >
        <div style={{ fontSize: 42, textAlign: "center" }}>🐾</div>

        <h1 style={{ textAlign: "center", color: "#17324d" }}>
          ZOO DELFIN
        </h1>

        <h2 style={{ textAlign: "center", fontSize: 21 }}>
          Panel administratora
        </h2>

        <p style={{ color: "#64748b", textAlign: "center" }}>
          Zaloguj się, aby zarządzać produktami i kategoriami.
        </p>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            alert("Logowanie podłączymy w następnym kroku.");
          }}
        >
          <label htmlFor="email">Adres e-mail</label>
          <input
            id="email"
            type="email"
            autoComplete="username"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Twój e-mail"
            style={inputStyle}
          />

          <label htmlFor="password">Hasło</label>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Hasło administratora"
            style={inputStyle}
          />

          <button type="submit" style={buttonStyle}>
            Zaloguj się
          </button>
        </form>

        <p style={{ textAlign: "center", fontSize: 12, color: "#64748b" }}>
          ZOO DELFIN · Zarządzanie sklepem
        </p>
      </section>
    </main>
  );
}

const inputStyle = {
  display: "block",
  boxSizing: "border-box",
  width: "100%",
  padding: 13,
  marginTop: 7,
  marginBottom: 18,
  border: "1px solid #cbd5e1",
  borderRadius: 9,
  fontSize: 16,
};

const buttonStyle = {
  width: "100%",
  padding: 14,
  background: "#17324d",
  color: "#fff",
  border: "none",
  borderRadius: 9,
  fontSize: 16,
  fontWeight: "bold",
  cursor: "pointer",
};
