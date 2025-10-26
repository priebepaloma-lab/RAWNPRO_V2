import React from "react";
import "../styles/globals.css";

export const metadata = {
  title: "RAWN PRO V2",
  description: "RAWN PRO V2 — skeleton",
  metadataBase: new URL("http://localhost:3000"),
  icons: {
    icon: "/icon.svg",
    apple: "/apple-icon.svg",
  },
  openGraph: {
    title: "RAWN PRO V2",
    description: "RAWN PRO — interface e IA",
    images: ["/opengraph-image.svg"],
    url: "https://rawn.pro",
    siteName: "RAWN PRO",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "RAWN PRO V2",
    description: "RAWN PRO — interface e IA",
    images: ["/twitter-image.svg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
