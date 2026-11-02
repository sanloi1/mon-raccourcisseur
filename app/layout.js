export const metadata = {
  title: "MonRaccourci",
  description: "Raccourcissez et partagez vos liens facilement."
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body style={{ margin: 0 }}>
        {children}
      </body>
    </html>
  );
}
