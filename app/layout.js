
export const metadata = {
  title: "ZOO DELFIN — Sklep zoologiczny",
  description: "Znajdź produkty dla swojego pupila w ZOO DELFIN."
};

export default function RootLayout({ children }) {
  return (
    <html lang="pl">
      <body style={{ margin: 0 }}>
        {children}
      </body>
    </html>
  );
}
