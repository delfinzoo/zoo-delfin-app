
"use client";

import { useState } from "react";

const categories = [
  "Psy",
  "Koty",
  "Gryzonie",
  "Ptaki",
  "Akwarystyka",
  "Terrarystyka"
];

export default function Home() {
  const [search, setSearch] = useState("");

  return (
    <main style={{
      minHeight: "100vh",
      background: "#f5f7f2",
      color: "#20352a",
      fontFamily: "Arial, sans-serif"
    }}>
      <header style={{
        background: "#174c35",
        color: "white",
        padding: "24px 18px"
      }}>
        <div style={{fontSize: 13, letterSpacing: 3}}>
          SKLEP ZOOLOGICZNY
        </div>
        <h1 style={{margin: "10px 0"}}>ZOO DELFIN</h1>
        <p style={{margin: 0}}>Wszystko dla Twojego pupila</p>
      </header>

      <section style={{
        maxWidth: 850,
        margin: "auto",
        padding: 20
      }}>
        <h2>Znajdź produkty dla swojego zwierzaka</h2>

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Szukaj produktu..."
          style={{
            width: "100%",
            boxSizing: "border-box",
            padding: 15,
            borderRadius: 12,
            border: "1px solid #ccd6cd",
            fontSize: 16
          }}
        />

        <h3 style={{marginTop: 28}}>Kategorie produktów</h3>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
          gap: 12
        }}>
          {categories.map((category) => (
            <div key={category} style={{
              background: "white",
              padding: 18,
              borderRadius: 12,
              border: "1px solid #e1e8e1",
              fontWeight: "bold"
            }}>
              {category}
            </div>
          ))}
        </div>

        <p style={{
          marginTop: 30,
          color: "#607366",
          fontSize: 14
        }}>
          Katalog produktów ZOO DELFIN
        </p>
      </section>
    </main>
  );
}
