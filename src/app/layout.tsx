// src/app/layout.tsx
import "./globals.css";

export const metadata = {
  title: "Plant Identifier",
  description: "Identify plants using Google Gemini AI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
