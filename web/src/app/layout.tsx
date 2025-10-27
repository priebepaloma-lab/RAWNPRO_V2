import React from "react";
import "../styles/globals.css";
import { ProfileProvider } from "./profile/ProfileContext";
import ClientLayout from "@/components/ClientLayout";
import { ToastProvider } from "@/components/ToastProvider";

export const metadata = {
  title: "RAWN PRO",
  description: "Ciência em conversa. Clareza em ação.",
  metadataBase: new URL("http://localhost:3000"),
  manifest: "/manifest.webmanifest",
  icons: {
    icon: "/icons/rawnpro-192.png",
    apple: "/icons/apple-touch-icon-180.png",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "RAWN PRO",
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    title: "RAWN PRO",
    description: "Inteligência de performance humana",
    images: ["/brand/Tela Walcome rawn pro.png"],
    url: "https://rawn.pro",
    siteName: "RAWN PRO",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "RAWN PRO",
    description: "Inteligência de performance humana",
    images: ["/brand/Tela Walcome rawn pro.png"],
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    viewportFit: "cover",
  },
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        <ToastProvider>
          <ProfileProvider>
            <ClientLayout>{children}</ClientLayout>
          </ProfileProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
