
"use client";

import { useState } from "react";

const categories = [
  { name: "Psy", icon: "🐕", description: "Karma, smycze i akcesoria" },
  { name: "Koty", icon: "🐈", description: "Karma, żwirki i zabawki" },
  { name: "Gryzonie", icon: "🐹", description: "Ściółki i wyposażenie" },
  { name: "Ptaki", icon: "🦜", description: "Pokarm i akcesoria" },
  { name: "Akwarystyka", icon: "🐠", description: "Pokarm i wyposażenie" },
  { name: "Terrarystyka", icon: "🦎", description: "Produkty do terrarium" },
];

const demoProducts = [
  { name: "Karma dla psa", category: "Psy", icon: "🐶", label: "DLA PSA" },
  { name: "Akcesoria dla kota", category: "Koty", icon: "🐱", label: "DLA KOTA" },
  { name: "Przysmaki dla pupila", category: "Psy", icon: "🦴", label: "PRZYSMAKI" },
  { name: "Akcesoria dla gryzoni", category: "Gryzonie", icon: "🐹", label: "DLA GRYZONI" },
];

export default function Home() {
  const [search, setSearch] = useState("");

  const filteredCategories = categories.filter((item) =>
    `${item.name} ${item.description}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <main style={styles.page}>
      <div style={styles.topBar}>
        ZOO DELFIN <span style={{ opacity: 0.85 }}> | </span>
        Wszystko dla Twojego pupila
      </div>

      <header style={styles.header}>
        <a href="#" style={styles.logo}>
          <span style={styles.logoIcon}>🐾</span>
          <span>
            <strong style={styles.logoName}>ZOO DELFIN</strong>
            <small style={styles.logoSubtitle}>SKLEP ZOOLOGICZNY</small>
          </span>
        </a>

        <div style={styles.headerNote}>
          <span style={{ fontSize: 22 }}>💙</span>
          <span>Blisko Ciebie i Twojego pupila</span>
        </div>
      </header>

      <section style={styles.hero}>
        <div style={styles.heroText}>
          <span style={styles.eyebrow}>WITAJ W ZOO DELFIN</span>
          <h1 style={styles.heroTitle}>
            Wszystko, czego
            <br />
            potrzebuje Twój
            <br />
            <span style={{ color: "#1676d2" }}>najlepszy przyjaciel.</span>
          </h1>
          <p style={styles.heroDescription}>
            Odkryj karmy, przysmaki i akcesoria dla swoich
            ulubionych zwierzaków.
          </p>
          <a href="#kategorie" style={styles.primaryButton}>
            ODKRYJ ASORTYMENT <span>→</span>
          </a>
        </div>

        <div style={styles.heroArt} aria-label="Zwierzęta domowe">
          <div style={styles.circleOne} />
          <div style={styles.circleTwo} />
          <span style={styles.heroDog}>🐕</span>
          <span style={styles.heroCat}>🐈</span>
          <span style={styles.heroPaw}>🐾</span>
          <div style={styles.heroBadge}>
            <span>💙</span>
            <span>
              <strong>Dla każdego pupila</strong>
              <small>Z troską każdego dnia</small>
            </span>
          </div>
        </div>
      </section>

      <section style={styles.benefits}>
        <div style={styles.benefit}>
          <span>🐾</span>
          <div>
            <strong>Duży wybór</strong>
            <small>Produkty dla różnych zwierząt</small>
          </div>
        </div>
        <div style={styles.benefit}>
          <span>💙</span>
          <div>
            <strong>Sklep z pasją</strong>
            <small>Dbamy o potrzeby pupili</small>
          </div>
        </div>
        <div style={styles.benefit}>
          <span>📦</span>
          <div>
            <strong>Wygodne zakupy</strong>
            <small>Znajdź potrzebne produkty</small>
          </div>
        </div>
      </section>

      <section id="kategorie" style={styles.section}>
        <div style={styles.sectionHeading}>
          <div>
            <span style={styles.eyebrow}>POZNAJ NASZ SKLEP</span>
            <h2 style={styles.sectionTitle}>Co znajdziesz dla swojego pupila?</h2>
            <p style={styles.sectionDescription}>
              Wybierz kategorię i znajdź to, czego szukasz.
            </p>
          </div>
        </div>

        <div style={styles.searchWrap}>
          <span style={{ fontSize: 20 }}>⌕</span>
          <input
            type="search"
            placeholder="Szukaj kategorii, np. psy, koty..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            style={styles.searchInput}
          />
        </div>

        <div style={styles.categoryGrid}>
          {filteredCategories.map((category) => (
            <a
              key={category.name}
              href={`#${category.name}`}
              style={styles.categoryCard}
            >
              <div style={styles.categoryIcon}>{category.icon}</div>
              <div>
                <h3 style={styles.categoryName}>{category.name}</h3>
                <p style={styles.categoryDescription}>
                  {category.description}
                </p>
              </div>
              <span style={styles.arrow}>↗</span>
            </a>
          ))}
        </div>

        {filteredCategories.length === 0 && (
          <p style={styles.noResults}>
            Nie znaleziono kategorii. Spróbuj wpisać inną nazwę.
          </p>
        )}
      </section>

      <section style={styles.promo}>
        <div>
          <span style={styles.eyebrow}>ZOO DELFIN POLECA</span>
          <h2 style={styles.promoTitle}>
            Dobry dzień zaczyna się od
            <br />
            szczęśliwego pupila.
          </h2>
          <p style={styles.promoDescription}>
            Odkrywaj produkty i akcesoria dla swoich zwierząt.
          </p>
        </div>
        <div style={styles.promoAnimals}>🐶 🐱 🐰</div>
      </section>

      <section style={styles.section}>
        <div style={styles.sectionHeading}>
          <div>
            <span style={styles.eyebrow}>INSPIRACJE</span>
            <h2 style={styles.sectionTitle}>Poznaj nasze propozycje</h2>
            <p style={styles.sectionDescription}>
              Przykładowe kafelki — prawdziwe produkty i ceny dodamy później.
            </p>
          </div>
        </div>

        <div style={styles.productGrid}>
          {demoProducts.map((product) => (
            <article key={product.name} style={styles.productCard}>
              <div style={styles.productImage}>
                <span style={styles.productLabel}>{product.label}</span>
                <span style={styles.productEmoji}>{product.icon}</span>
              </div>
              <div style={styles.productInfo}>
                <small style={styles.productCategory}>{product.category}</small>
                <h3 style={styles.productName}>{product.name}</h3>
                <p style={styles.productNote}>Przykładowa kategoria produktu</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <footer style={styles.footer}>
        <div style={styles.footerBrand}>
          <span style={{ fontSize: 27 }}>🐾</span>
          <strong>ZOO DELFIN</strong>
        </div>
        <p>Wszystko dla Twojego pupila.</p>
        <small>© {new Date().getFullYear()} ZOO DELFIN</small>
      </footer>

      <style jsx global>{`
        * {
          box-sizing: border-box;
        }
        html {
          scroll-behavior: smooth;
        }
        body {
          font-family: Arial, Helvetica, sans-serif;
          color: #17324d;
          background: #ffffff;
        }
        a {
          -webkit-tap-highlight-color: transparent;
        }
        input {
          font-family: inherit;
        }
        @media (max-width: 640px) {
          .unused {
            display: none;
          }
        }
      `}</style>
    </main>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#ffffff",
    color: "#17324d",
    overflow: "hidden",
  },
  topBar: {
    background: "#176fc1",
    color: "#ffffff",
    textAlign: "center",
    padding: "10px 14px",
    fontSize: 12,
    letterSpacing: "0.3px",
  },
  header: {
    maxWidth: 1180,
    margin: "0 auto",
    padding: "20px 24px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 16,
    flexWrap: "wrap",
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
    borderRadius: 15,
    background: "#e7f3ff",
    fontSize: 25,
  },
  logoName: {
    display: "block",
    fontSize: 20,
    letterSpacing: "0.6px",
  },
  logoSubtitle: {
    display: "block",
    color: "#6d879e",
    fontSize: 9,
    letterSpacing: "2px",
    marginTop: 4,
  },
  headerNote: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    color: "#58728b",
    fontSize: 13,
  },
  hero: {
    maxWidth: 1180,
    margin: "8px auto 0",
    padding: "54px 48px",
    borderRadius: 30,
    background: "linear-gradient(115deg, #eff8ff 0%, #e1f1ff 58%, #d2eaff 100%)",
    display: "grid",
    gridTemplateColumns: "minmax(0, 1.2fr) minmax(250px, 0.8fr)",
    alignItems: "center",
    gap: 20,
    position: "relative",
    overflow: "hidden",
  },
  heroText: {
    position: "relative",
    zIndex: 2,
  },
  eyebrow: {
    color: "#1676d2",
    fontSize: 11,
    fontWeight: 800,
    letterSpacing: "2px",
  },
  heroTitle: {
    fontSize: "clamp(34px, 5vw, 57px)",
    lineHeight: 1.1,
    letterSpacing: "-2px",
    margin: "18px 0",
    color: "#17324d",
  },
  heroDescription: {
    color: "#59748d",
    fontSize: 16,
    lineHeight: 1.8,
    maxWidth: 450,
    marginBottom: 28,
  },
  primaryButton: {
    display: "inline-flex",
    alignItems: "center",
    gap: 18,
    padding: "15px 21px",
    borderRadius: 12,
    background: "#1676d2",
    color: "#ffffff",
    textDecoration: "none",
    fontSize: 12,
    fontWeight: 800,
    letterSpacing: "0.5px",
    boxShadow: "0 8px 20px rgba(22,118,210,0.18)",
  },
  heroArt: {
    minHeight: 300,
    position: "relative",
    display: "grid",
    placeItems: "center",
  },
  circleOne: {
    position: "absolute",
    width: 280,
    height: 280,
    borderRadius: "50%",
    background: "rgba(255,255,255,0.72)",
  },
  circleTwo: {
    position: "absolute",
    width: 220,
    height: 220,
    borderRadius: "50%",
    border: "2px dashed #a7d4fb",
  },
  heroDog: {
    position: "absolute",
    fontSize: 145,
    transform: "translate(-25px, 0)",
    filter: "drop-shadow(0 12px 10px rgba(23,50,77,0.10))",
  },
  heroCat: {
    position: "absolute",
    fontSize: 88,
    transform: "translate(92px, 54px)",
    filter: "drop-shadow(0 10px 8px rgba(23,50,77,0.10))",
  },
  heroPaw: {
    position: "absolute",
    top: 16,
    right: 22,
    fontSize: 37,
    color: "#1676d2",
    transform: "rotate(18deg)",
  },
  heroBadge: {
    position: "absolute",
    bottom: 8,
    left: "5%",
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "12px 16px",
    background: "#ffffff",
    borderRadius: 16,
    boxShadow: "0 10px 30px rgba(31,92,145,0.12)",
    fontSize: 20,
  },
  benefits: {
    maxWidth: 1180,
    margin: "26px auto 0",
    padding: "0 24px",
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    gap: 16,
  },
  benefit: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "17px",
    border: "1px solid #e5eff8",
    borderRadius: 16,
    color: "#1676d2",
    fontSize: 25,
  },
  section: {
    maxWidth: 1180,
    margin: "0 auto",
    padding: "76px 24px 20px",
  },
  sectionHeading: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "end",
    gap: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: "clamp(24px, 3vw, 34px)",
    letterSpacing: "-0.8px",
    margin: "10px 0",
    color: "#17324d",
  },
  sectionDescription: {
    color: "#71879b",
    fontSize: 14,
    lineHeight: 1.7,
    margin: 0,
  },
  searchWrap: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    background: "#f5faff",
    border: "1px solid #dcebf8",
    borderRadius: 14,
    padding: "0 17px",
    marginBottom: 22,
    color: "#1676d2",
  },
  searchInput: {
    width: "100%",
    minWidth: 0,
    border: "none",
    outline: "none",
    background: "transparent",
    padding: "17px 0",
    fontSize: 14,
    color: "#17324d",
  },
  categoryGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    gap: 16,
  },
  categoryCard: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    gap: 15,
    padding: "22px 18px",
    minWidth: 0,
    border: "1px solid #e2edf7",
    borderRadius: 18,
    background: "#ffffff",
    textDecoration: "none",
    color: "#17324d",
    boxShadow: "0 5px 18px rgba(35,86,130,0.035)",
  },
  categoryIcon: {
    display: "grid",
    placeItems: "center",
    flexShrink: 0,
    width: 60,
    height: 60,
    borderRadius: 17,
    background: "#edf7ff",
    fontSize: 34,
  },
  categoryName: {
    fontSize: 17,
    margin: "0 0 7px",
  },
  categoryDescription: {
    color: "#71879b",
    fontSize: 12,
    lineHeight: 1.5,
    margin: 0,
  },
  arrow: {
    marginLeft: "auto",
    alignSelf: "flex-start",
    color: "#1676d2",
    fontSize: 19,
  },
  noResults: {
    padding: 20,
    textAlign: "center",
    color: "#71879b",
  },
  promo: {
    maxWidth: 1132,
    margin: "64px auto 0",
    padding: "34px 38px",
    borderRadius: 24,
    background: "#eaf5ff",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 20,
    overflow: "hidden",
  },
  promoTitle: {
    fontSize: "clamp(23px, 3vw, 34px)",
    lineHeight: 1.2,
    margin: "12px 0",
    letterSpacing: "-0.7px",
  },
  promoDescription: {
    color: "#71879b",
    fontSize: 14,
    lineHeight: 1.7,
  },
  promoAnimals: {
    fontSize: "clamp(36px, 6vw, 66px)",
    whiteSpace: "nowrap",
  },
  productGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
    gap: 17,
  },
  productCard: {
    overflow: "hidden",
    border: "1px solid #e4edf6",
    borderRadius: 18,
    background: "#ffffff",
  },
  productImage: {
    minHeight: 165,
    background: "linear-gradient(145deg, #eff8ff, #dceeff)",
    display: "grid",
    placeItems: "center",
    position: "relative",
  },
  productLabel: {
    position: "absolute",
    top: 12,
    left: 12,
    padding: "6px 8px",
    borderRadius: 6,
    background: "#ffffff",
    color: "#1676d2",
    fontSize: 9,
    fontWeight: 800,
    letterSpacing: "0.6px",
  },
  productEmoji: {
    fontSize: 67,
  },
  productInfo: {
    padding: 16,
  },
  productCategory: {
    color: "#1676d2",
    fontSize: 11,
    fontWeight: 700,
  },
  productName: {
    fontSize: 16,
    margin: "9px 0",
  },
  productNote: {
    fontSize: 12,
    lineHeight: 1.5,
    color: "#71879b",
    margin: 0,
  },
  footer: {
    marginTop: 70,
    padding: "32px 24px",
    textAlign: "center",
    background: "#f2f8fd",
    color: "#71879b",
    fontSize: 13,
  },
  footerBrand: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 9,
    color: "#17324d",
    fontSize: 18,
  },
};

