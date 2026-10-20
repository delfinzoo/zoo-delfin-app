
"use client";
import { createClient } from "@supabase/supabase-js";
import { useState } from "react";
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);
const categories = [
  { name: "Psy", icon: "🐕", description: "Karma i akcesoria" },
  { name: "Koty", icon: "🐈", description: "Karmy, żwirki i zabawki" },
  { name: "Gryzonie", icon: "🐹", description: "Ściółki i wyposażenie" },
  { name: "Ptaki", icon: "🦜", description: "Pokarm i akcesoria" },
  { name: "Akwarystyka", icon: "🐠", description: "Ryby i akwaria" },
  { name: "Terrarystyka", icon: "🦎", description: "Produkty do terrarium" },
];

const products = [
  { name: "Karma dla psa", category: "Psy", icon: "🐶" },
  { name: "Akcesoria dla kota", category: "Koty", icon: "🐱" },
  { name: "Przysmaki dla pupila", category: "Psy", icon: "🦴" },
  { name: "Produkty dla gryzoni", category: "Gryzonie", icon: "🐹" },
];

export default function Home() {
  const [search, setSearch] = useState("");

  const filteredCategories = categories.filter((item) =>
    `${item.name} ${item.description}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <main style={s.page}>
      <div style={s.topBar}>
        ZOO DELFIN <span>•</span> Wszystko dla Twojego pupila
      </div>

      <header style={s.header}>
        <a href="#" style={s.logo}>
          <span style={s.logoIcon}>🐾</span>
          <span>
            <strong style={s.logoName}>ZOO DELFIN</strong>
            <small style={s.logoSubtitle}>SKLEP ZOOLOGICZNY</small>
          </span>
        </a>
        <div style={s.headerNote}>💙 Z miłości do zwierząt</div>
      </header>

      <section style={s.hero}>
        <div style={s.heroText}>
          <span style={s.eyebrow}>WITAJ W ZOO DELFIN</span>
          <h1 style={s.heroTitle}>
            Wszystko dla
            <br />
            Twojego <span style={s.blueText}>pupila.</span>
          </h1>
          <p style={s.heroDescription}>
            Karmy, przysmaki i akcesoria dla zwierząt.
            Znajdź wszystko, czego potrzebuje Twój przyjaciel.
          </p>
          <a href="#kategorie" style={s.primaryButton}>
            ODKRYJ ASORTYMENT <span>→</span>
          </a>
        </div>

        <div style={s.heroArt}>
          <div style={s.heroCircle} />
          <span style={s.heroDog}>🐕</span>
          <span style={s.heroCat}>🐈</span>
          <span style={s.heroPaw}>🐾</span>
          <div style={s.heroBadge}>
            <span style={{ fontSize: 23 }}>💙</span>
            <span>
              <strong style={{ display: "block" }}>Każdy pupil</strong>
              <small style={{ color: "#688096" }}>jest wyjątkowy</small>
            </span>
          </div>
        </div>
      </section>

      <section style={s.benefits}>
        <div style={s.benefit}>
          <span style={s.benefitIcon}>🐾</span>
          <div>
            <strong style={s.benefitTitle}>Duży wybór</strong>
            <small style={s.benefitText}>Dla różnych zwierząt</small>
          </div>
        </div>
        <div style={s.benefit}>
          <span style={s.benefitIcon}>💙</span>
          <div>
            <strong style={s.benefitTitle}>Z pasją</strong>
            <small style={s.benefitText}>Z myślą o pupilach</small>
          </div>
        </div>
        <div style={s.benefit}>
          <span style={s.benefitIcon}>🛍️</span>
          <div>
            <strong style={s.benefitTitle}>Wygodne zakupy</strong>
            <small style={s.benefitText}>Proste wyszukiwanie</small>
          </div>
        </div>
      </section>

      <section id="kategorie" style={s.section}>
        <span style={s.eyebrow}>POZNAJ NASZ SKLEP</span>
        <h2 style={s.sectionTitle}>Wybierz kategorię</h2>
        <p style={s.sectionDescription}>
          Znajdź produkty dopasowane do potrzeb swojego zwierzaka.
        </p>

        <div style={s.searchWrap}>
          <span style={{ fontSize: 22, color: "#1676d2" }}>⌕</span>
          <input
            type="search"
            placeholder="Szukaj kategorii..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            style={s.searchInput}
          />
          {search && (
            <button onClick={() => setSearch("")} style={s.clearButton}>
              ✕
            </button>
          )}
        </div>

        <div style={s.categoryGrid}>
          {filteredCategories.map((category) => (
            <a
              key={category.name}
              href="#propozycje"
              style={s.categoryCard}
            >
              <div style={s.categoryIcon}>{category.icon}</div>
              <div style={s.categoryText}>
                <h3 style={s.categoryName}>{category.name}</h3>
                <p style={s.categoryDescription}>{category.description}</p>
              </div>
              <span style={s.arrow}>→</span>
            </a>
          ))}
        </div>

        {filteredCategories.length === 0 && (
          <p style={s.noResults}>Nie znaleziono kategorii.</p>
        )}
      </section>

      <section style={s.promo}>
        <div style={{ flex: 1 }}>
          <span style={s.eyebrow}>ZOO DELFIN POLECA</span>
          <h2 style={s.promoTitle}>
            Szczęśliwy pupil,
            <br />
            szczęśliwy dzień.
          </h2>
          <p style={s.promoText}>
            Poznaj świat produktów dla swoich zwierząt.
          </p>
        </div>
        <div style={s.promoAnimals}>🐶 🐱</div>
      </section>

      <section id="propozycje" style={s.section}>
        <span style={s.eyebrow}>POZNAJ NASZE KATEGORIE</span>
        <h2 style={s.sectionTitle}>Coś dla każdego pupila</h2>
        <p style={s.sectionDescription}>
          Poniższe karty są na razie przykładowe. Prawdziwy katalog dodamy później.
        </p>

        <div style={s.productGrid}>
          {products.map((product) => (
            <article key={product.name} style={s.productCard}>
              <div style={s.productImage}>
                <span style={s.productEmoji}>{product.icon}</span>
                <span style={s.productLabel}>{product.category}</span>
              </div>
              <div style={s.productInfo}>
                <small style={s.productCategory}>{product.category}</small>
                <h3 style={s.productName}>{product.name}</h3>
                <p style={s.productNote}>Sprawdź ofertę tej kategorii</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <footer style={s.footer}>
        <div style={s.footerBrand}>🐾 ZOO DELFIN</div>
        <p style={{ margin: "10px 0" }}>Wszystko dla Twojego pupila.</p>
        <small>© {new Date().getFullYear()} ZOO DELFIN</small>
      </footer>

      <style jsx global>{`
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body {
          margin: 0;
          font-family: Arial, Helvetica, sans-serif;
          color: #17324d;
          background: #ffffff;
        }
        a { -webkit-tap-highlight-color: transparent; }
        input, button { font: inherit; }
        @media (max-width: 760px) {
          .unused { display: none; }
        }
      `}</style>
    </main>
  );
}

const s = {
  page: {
    minHeight: "100vh",
    background: "#ffffff",
    color: "#17324d",
    overflow: "hidden",
  },
  topBar: {
    background: "#176fc1",
    color: "#ffffff",
    padding: "10px 14px",
    textAlign: "center",
    fontSize: 12,
    letterSpacing: "0.3px",
  },
  header: {
    maxWidth: 1180,
    width: "100%",
    margin: "0 auto",
    padding: "18px 20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 12,
  },
  logo: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    textDecoration: "none",
    color: "#17324d",
  },
  logoIcon: {
    display: "grid",
    placeItems: "center",
    width: 46,
    height: 46,
    borderRadius: 14,
    background: "#e7f3ff",
    fontSize: 25,
  },
  logoName: { display: "block", fontSize: 20, letterSpacing: "0.5px" },
  logoSubtitle: {
    display: "block",
    marginTop: 4,
    color: "#6d879e",
    fontSize: 9,
    letterSpacing: "1.6px",
  },
  headerNote: { color: "#58728b", fontSize: 13 },
  hero: {
    width: "calc(100% - 32px)",
    maxWidth: 1138,
    margin: "8px auto 0",
    padding: "clamp(22px, 5vw, 48px)",
    borderRadius: 26,
    background: "linear-gradient(115deg, #eff8ff 0%, #e1f1ff 58%, #d2eaff 100%)",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
    alignItems: "center",
    gap: 20,
    overflow: "hidden",
  },
  heroText: { minWidth: 0 },
  eyebrow: {
    color: "#1676d2",
    fontSize: 11,
    fontWeight: 800,
    letterSpacing: "1.6px",
    lineHeight: 1.6,
  },
  heroTitle: {
    fontSize: "clamp(34px, 6vw, 56px)",
    lineHeight: 1.12,
    letterSpacing: "-1.5px",
    margin: "16px 0",
    color: "#17324d",
    overflowWrap: "normal",
    wordBreak: "normal",
  },
  blueText: { color: "#1676d2" },
  heroDescription: {
    maxWidth: 440,
    color: "#59748d",
    fontSize: 15,
    lineHeight: 1.75,
    margin: "0 0 24px",
  },
  primaryButton: {
    display: "inline-flex",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 12,
    padding: "15px 18px",
    borderRadius: 12,
    background: "#1676d2",
    color: "#ffffff",
    textDecoration: "none",
    fontSize: 12,
    fontWeight: 800,
    letterSpacing: "0.3px",
  },
  heroArt: {
    position: "relative",
    minHeight: 270,
    display: "grid",
    placeItems: "center",
    minWidth: 0,
  },
  heroCircle: {
    position: "absolute",
    width: "min(75vw, 270px)",
    aspectRatio: "1 / 1",
    borderRadius: "50%",
    background: "rgba(255,255,255,0.8)",
    border: "2px dashed #a7d4fb",
  },
  heroDog: {
    position: "relative",
    zIndex: 1,
    fontSize: "clamp(95px, 17vw, 140px)",
    transform: "translateX(-15px)",
  },
  heroCat: {
    position: "absolute",
    zIndex: 2,
    fontSize: "clamp(55px, 10vw, 80px)",
    right: "5%",
    bottom: "14%",
  },
  heroPaw: {
    position: "absolute",
    right: "9%",
    top: "5%",
    fontSize: 34,
  },
  heroBadge: {
    position: "absolute",
    left: 0,
    bottom: 0,
    display: "flex",
    alignItems: "center",
    gap: 9,
    padding: "11px 14px",
    background: "#ffffff",
    borderRadius: 14,
    boxShadow: "0 8px 24px rgba(31,92,145,0.12)",
    fontSize: 13,
  },
  benefits: {
    width: "calc(100% - 32px)",
    maxWidth: 1138,
    margin: "24px auto 0",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr))",
    gap: 12,
  },
  benefit: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    minWidth: 0,
    padding: "16px",
    border: "1px solid #e2edf7",
    borderRadius: 15,
    background: "#ffffff",
  },
  benefitIcon: {
    fontSize: 26,
    flexShrink: 0,
  },
  benefitTitle: {
    display: "block",
    fontSize: 14,
    lineHeight: 1.5,
    color: "#17324d",
  },
  benefitText: {
    display: "block",
    fontSize: 12,
    lineHeight: 1.6,
    color: "#71879b",
  },
  section: {
    width: "100%",
    maxWidth: 1180,
    margin: "0 auto",
    padding: "60px 20px 10px",
  },
  sectionTitle: {
    fontSize: "clamp(24px, 4vw, 34px)",
    lineHeight: 1.25,
    letterSpacing: "-0.6px",
    margin: "9px 0",
    color: "#17324d",
    overflowWrap: "normal",
    wordBreak: "normal",
  },
  sectionDescription: {
    color: "#71879b",
    fontSize: 14,
    lineHeight: 1.7,
    margin: "0 0 22px",
  },
  searchWrap: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    width: "100%",
    minWidth: 0,
    background: "#f5faff",
    border: "1px solid #dcebf8",
    borderRadius: 14,
    padding: "0 15px",
    marginBottom: 20,
  },
  searchInput: {
    width: "100%",
    minWidth: 0,
    border: "none",
    outline: "none",
    background: "transparent",
    padding: "16px 0",
    fontSize: 14,
    color: "#17324d",
  },
  clearButton: {
    border: 0,
    background: "transparent",
    color: "#1676d2",
    padding: 8,
    cursor: "pointer",
  },
  categoryGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 270px), 1fr))",
    gap: 14,
    alignItems: "stretch",
  },
  categoryCard: {
    display: "flex",
    alignItems: "center",
    gap: 14,
    minWidth: 0,
    minHeight: 105,
    padding: 16,
    border: "1px solid #e2edf7",
    borderRadius: 17,
    background: "#ffffff",
    textDecoration: "none",
    color: "#17324d",
    boxShadow: "0 5px 18px rgba(35,86,130,0.04)",
  },
  categoryIcon: {
    display: "grid",
    placeItems: "center",
    flexShrink: 0,
    width: 54,
    height: 54,
    borderRadius: 15,
    background: "#edf7ff",
    fontSize: 30,
  },
  categoryText: { flex: 1, minWidth: 0 },
  categoryName: {
    fontSize: 16,
    lineHeight: 1.4,
    margin: "0 0 5px",
    overflowWrap: "normal",
    wordBreak: "normal",
  },
  categoryDescription: {
    color: "#71879b",
    fontSize: 12,
    lineHeight: 1.5,
    margin: 0,
    overflowWrap: "normal",
    wordBreak: "normal",
  },
  arrow: { flexShrink: 0, color: "#1676d2", fontSize: 20 },
  noResults: { textAlign: "center", padding: 20, color: "#71879b" },
  promo: {
    width: "calc(100% - 32px)",
    maxWidth: 1138,
    margin: "55px auto 0",
    padding: "clamp(22px, 5vw, 36px)",
    borderRadius: 23,
    background: "#eaf5ff",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: 18,
  },
  promoTitle: {
    fontSize: "clamp(24px, 4vw, 34px)",
    lineHeight: 1.25,
    margin: "12px 0",
  },
  promoText: { color: "#71879b", fontSize: 14, lineHeight: 1.7 },
  promoAnimals: { fontSize: "clamp(38px, 8vw, 65px)" },
  productGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr))",
    gap: 16,
    alignItems: "stretch",
  },
  productCard: {
    minWidth: 0,
    overflow: "hidden",
    border: "1px solid #e4edf6",
    borderRadius: 17,
    background: "#ffffff",
  },
  productImage: {
    minHeight: 150,
    background: "linear-gradient(145deg, #eff8ff, #dceeff)",
    display: "grid",
    placeItems: "center",
    position: "relative",
  },
  productEmoji: { fontSize: 66 },
  productLabel: {
    position: "absolute",
    top: 12,
    left: 12,
    padding: "6px 9px",
    borderRadius: 6,
    background: "#ffffff",
    color: "#1676d2",
    fontSize: 10,
    fontWeight: 800,
  },
  productInfo: { padding: 15 },
  productCategory: { color: "#1676d2", fontSize: 11, fontWeight: 700 },
  productName: {
    fontSize: 16,
    lineHeight: 1.4,
    margin: "8px 0",
    overflowWrap: "normal",
    wordBreak: "normal",
  },
  productNote: { fontSize: 12, lineHeight: 1.6, color: "#71879b", margin: 0 },
  footer: {
    marginTop: 65,
    padding: "30px 20px",
    textAlign: "center",
    background: "#f2f8fd",
    color: "#71879b",
    fontSize: 13,
  },
  footerBrand: {
    color: "#17324d",
    fontSize: 20,
    fontWeight: 800,
  },
};
