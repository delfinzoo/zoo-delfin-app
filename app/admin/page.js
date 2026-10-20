
"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function AdminPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(event) {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage("Nie udało się zalogować. Sprawdź e-mail i hasło.");
      setLoading(false);
      return;
    }

    const { data: admin, error: adminError } = await supabase
      .from("admin_users")
      .select("user_id")
      .eq("user_id", data.user.id)
      .maybeSingle();

    if (adminError || !admin) {
      await supabase.auth.signOut();
      setMessage("To konto nie ma uprawnień administratora.");
      setLoading(false);
      return;
    }

    window.location.href = "/admin/produkty";
  }

  return (
    <main style={{
      minHeight: "100vh",
      background: "#f2f6fa",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 20,
      fontFamily: "Arial, sans-serif"
    }}>
      <section style={{
        background: "#fff",
        width: "100%",
        maxWidth: 400,
        padding: 28,
        borderRadius: 18,
        boxShadow: "0 8px 30px rgba(0,0,0,0.08)"
      }}>
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

        <form onSubmit={handleLogin}>
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

          <button type="submit" disabled={loading} style={buttonStyle}>
            {loading ? "Logowanie..." : "Zaloguj się"}
          </button>
        </form>

        {message && (
          <p role="alert" style={{ color: "#b42318", marginTop: 16 }}>
            {message}
          </p>
        )}

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
