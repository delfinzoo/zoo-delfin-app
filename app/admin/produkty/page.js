
"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const categories = [
  "Psy",
  "Koty",
  "Gryzonie",
  "Ptaki",
  "Akwarystyka",
  "Terrarystyka",
  "Inne",
];

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("Ładowanie produktów...");
  const [savingId, setSavingId] = useState(null);

  useEffect(() => {
    async function loadProducts() {
      const { data: authData } = await supabase.auth.getUser();

      if (!authData.user) {
        window.location.href = "/admin";
        return;
      }

      const { data: admin, error: adminError } = await supabase
        .from("admin_users")
        .select("user_id")
        .eq("user_id", authData.user.id)
        .maybeSingle();

      if (adminError || !admin) {
        await supabase.auth.signOut();
        window.location.href = "/admin";
        return;
      }

      const { data, error } = await supabase
        .from("products")
        .select("id, name, category, price, stock")
        .order("name")
        .limit(1000);

      if (error) {
        setMessage("Nie udało się pobrać produktów: " + error.message);
        return;
      }

      setProducts(data || []);
      setMessage("");
    }

    loadProducts();
  }, []);

  async function saveCategory(product) {
    setSavingId(product.id);
    setMessage("");

    const { data: authData } = await supabase.auth.getUser();

    if (!authData.user) {
      window.location.href = "/admin";
      return;
    }

    const { data: admin, error: adminError } = await supabase
      .from("admin_users")
      .select("user_id")
      .eq("user_id", authData.user.id)
      .maybeSingle();

    if (adminError || !admin) {
      setMessage("Brak uprawnień administratora.");
      setSavingId(null);
      return;
    }

    const { error } = await supabase
      .from("products")
      .update({ category: product.category })
      .eq("id", product.id);

    if (error) {
      setMessage("Nie udało się zapisać kategorii. Sprawdzimy uprawnienia bazy.");
    } else {
      setMessage("Zapisano kategorię produktu.");
    }

    setSavingId(null);
  }

  const filteredProducts = products.filter((product) =>
    (product.name || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main style={styles.page}>
      <header style={styles.header}>
        <h1 style={{ margin: 0 }}>🐾 ZOO DELFIN</h1>
        <p style={{ marginBottom: 0 }}>Panel zarządzania produktami</p>
      </header>

      <section style={styles.content}>
        <h2>Przypisywanie kategorii</h2>
        <p>
          Wyszukaj produkt, wybierz kategorię i kliknij „Zapisz”.
        </p>

        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Szukaj produktu po nazwie..."
          style={styles.search}
        />

        <p>
          Wyświetlono {filteredProducts.length} z {products.length} produktów
        </p>

        {message && <p role="status">{message}</p>}

        <div style={styles.list}>
          {filteredProducts.map((product) => (
            <article key={product.id} style={styles.card}>
              <strong>{product.name}</strong>
              <p style={styles.details}>
                Cena: {product.price ?? "—"} zł · Stan: {product.stock ?? "—"}
              </p>

              <label htmlFor={"category-" + product.id}>
                Kategoria
              </label>
              <select
                id={"category-" + product.id}
                value={product.category || ""}
                onChange={(event) =>
                  setProducts((current) =>
                    current.map((item) =>
                      item.id === product.id
                        ? { ...item, category: event.target.value }
                        : item
                    )
                  )
                }
                style={styles.select}
              >
                <option value="">Wybierz kategorię</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>

              <button
                onClick={() => saveCategory(product)}
                disabled={!product.category || savingId === product.id}
                style={styles.button}
              >
                {savingId === product.id ? "Zapisywanie..." : "Zapisz"}
              </button>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f2f6fa",
    fontFamily: "Arial, sans-serif",
    color: "#17324d",
  },
  header: {
    background: "#17324d",
    color: "white",
    padding: "24px 18px",
  },
  content: {
    maxWidth: 850,
    margin: "0 auto",
    padding: 18,
  },
  search: {
    boxSizing: "border-box",
    width: "100%",
    padding: 14,
    fontSize: 16,
    border: "1px solid #cbd5e1",
    borderRadius: 10,
    margin: "10px 0",
  },
  list: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: 14,
  },
  card: {
    background: "white",
    padding: 16,
    borderRadius: 12,
    border: "1px solid #e2e8f0",
  },
  details: {
    color: "#64748b",
    fontSize: 14,
  },
  select: {
    display: "block",
    boxSizing: "border-box",
    width: "100%",
    padding: 12,
    margin: "8px 0 12px",
    border: "1px solid #cbd5e1",
    borderRadius: 8,
    background: "white",
    fontSize: 16,
  },
  button: {
    width: "100%",
    padding: 13,
    border: "none",
    borderRadius: 8,
    background: "#17324d",
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
};
