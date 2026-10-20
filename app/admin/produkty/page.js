
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
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(null);

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
        .select("*")
        .order("name")
        .limit(1000);

      if (error) {
        setMessage("Błąd pobierania produktów: " + error.message);
        return;
      }

      setProducts(data || []);
      setMessage("");
    }

    loadProducts();
  }, []);

  async function saveProduct(event) {
    event.preventDefault();
    if (!editing) return;

    setSaving(true);
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
      setSaving(false);
      return;
    }

    const price = Number(editing.price);
    const stock = Number(editing.stock);

    if (!Number.isFinite(price) || price < 0 ||
        !Number.isInteger(stock) || stock < 0) {
      setMessage("Cena musi być nieujemną liczbą, a stan nieujemną liczbą całkowitą.");
      setSaving(false);
      return;
    }

    const changes = {
      name: editing.name.trim(),
      brand: editing.brand || null,
      category: editing.category || null,
      price,
      stock,
      description: editing.description || null,
      image_url: editing.image_url || null,
      active: editing.active,
      updated_at: new Date().toISOString(),
    };

    if (!changes.name) {
      setMessage("Wpisz nazwę produktu.");
      setSaving(false);
      return;
    }

    const { data, error } = await supabase
      .from("products")
      .update(changes)
      .eq("id", editing.id)
      .select()
      .maybeSingle();

    if (error || !data) {
      setMessage(
        "Nie udało się zapisać. Sprawdź uprawnienia bazy i poprawność danych."
      );
      setSaving(false);
      return;
    }

    setProducts((current) =>
      current.map((item) => item.id === data.id ? data : item)
    );
    setEditing(null);
    setMessage("Zapisano zmiany produktu.");
    setSaving(false);
  }

  const filteredProducts = products.filter((product) =>
    `${product.name || ""} ${product.brand || ""} ${product.ean || ""}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const fieldStyle = {
    display: "block",
    boxSizing: "border-box",
    width: "100%",
    padding: 12,
    margin: "6px 0 14px",
    border: "1px solid #cbd5e1",
    borderRadius: 8,
    fontSize: 16,
    background: "white",
  };

  return (
    <main style={styles.page}>
      <header style={styles.header}>
        <h1 style={{ margin: 0 }}>🐾 ZOO DELFIN</h1>
        <p>Panel administratora · Katalog produktów</p>
      </header>

      <section style={styles.content}>
        <h2>Produkty ({products.length})</h2>
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Szukaj nazwy, marki lub EAN..."
          style={fieldStyle}
        />

        {message && <p role="status">{message}</p>}

        <div style={styles.list}>
          {filteredProducts.map((product) => (
            <article key={product.id} style={styles.card}>
              <strong>{product.name}</strong>
              <p style={styles.details}>
                {product.brand || "Bez marki"} · {product.price ?? "—"} zł ·
                Stan: {product.stock ?? 0}
              </p>
              <p style={styles.details}>
                Kategoria: {product.category || "Nieprzypisana"}
                {" · "}
                {product.active ? "Widoczny w sklepie" : "Ukryty"}
              </p>
              <button
                type="button"
                style={styles.button}
                onClick={() => setEditing({
                  ...product,
                  price: String(product.price ?? 0),
                  stock: String(product.stock ?? 0),
                  name: product.name || "",
                  brand: product.brand || "",
                  category: product.category || "",
                  description: product.description || "",
                  image_url: product.image_url || "",
                  active: product.active !== false,
                })}
              >
                Edytuj produkt
              </button>
            </article>
          ))}
        </div>

        {editing && (
          <div style={styles.overlay}>
            <form onSubmit={saveProduct} style={styles.form}>
              <h2>Edytuj produkt</h2>

              <label>Nazwa produktu</label>
              <input
                required
                value={editing.name}
                onChange={(e) => setEditing({ ...editing, name: e.target.value })}
                style={fieldStyle}
              />

              <label>Marka</label>
              <input
                value={editing.brand}
                onChange={(e) => setEditing({ ...editing, brand: e.target.value })}
                style={fieldStyle}
              />

              <label>Kategoria</label>
              <select
                value={editing.category}
                onChange={(e) => setEditing({ ...editing, category: e.target.value })}
                style={fieldStyle}
              >
                <option value="">Bez kategorii</option>
                {categories.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>

              <label>Cena sprzedaży (zł)</label>
              <input
                type="number"
                min="0"
                step="0.01"
                required
                value={editing.price}
                onChange={(e) => setEditing({ ...editing, price: e.target.value })}
                style={fieldStyle}
              />

              <label>Stan magazynowy (szt.)</label>
              <input
                type="number"
                min="0"
                step="1"
                required
                value={editing.stock}
                onChange={(e) => setEditing({ ...editing, stock: e.target.value })}
                style={fieldStyle}
              />

              <label>Adres zdjęcia (URL)</label>
              <input
                type="url"
                value={editing.image_url}
                onChange={(e) => setEditing({ ...editing, image_url: e.target.value })}
                placeholder="https://..."
                style={fieldStyle}
              />

              <label>Opis produktu</label>
              <textarea
                value={editing.description}
                onChange={(e) => setEditing({ ...editing, description: e.target.value })}
                rows={4}
                style={fieldStyle}
              />

              <label style={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={editing.active}
                  onChange={(e) => setEditing({ ...editing, active: e.target.checked })}
                />
                Produkt widoczny w sklepie
              </label>

              <p style={styles.details}>
                Stan 0 nie ukrywa produktu automatycznie. Produkt może być widoczny jako niedostępny.
              </p>

              <button disabled={saving} type="submit" style={styles.button}>
                {saving ? "Zapisywanie..." : "Zapisz zmiany"}
              </button>
              <button
                type="button"
                onClick={() => setEditing(null)}
                style={styles.cancel}
              >
                Anuluj
              </button>
            </form>
          </div>
        )}
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
    padding: "22px 18px",
  },
  content: {
    maxWidth: 950,
    margin: "0 auto",
    padding: 18,
  },
  list: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
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
  button: {
    width: "100%",
    padding: 13,
    border: "none",
    borderRadius: 8,
    background: "#17324d",
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    cursor: "pointer",
    marginTop: 8,
  },
  cancel: {
    width: "100%",
    padding: 12,
    border: "1px solid #cbd5e1",
    borderRadius: 8,
    background: "white",
    color: "#17324d",
    fontSize: 16,
    marginTop: 8,
  },
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(15, 23, 42, 0.55)",
    zIndex: 10,
    overflowY: "auto",
    padding: 16,
  },
  form: {
    background: "white",
    maxWidth: 560,
    margin: "12px auto",
    padding: 22,
    borderRadius: 14,
  },
  checkboxLabel: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    margin: "14px 0",
  },
};
