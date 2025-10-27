import React from "react";
import "../styles/globals.css";
import { ProfileProvider } from "./profile/ProfileContext";
import ClientLayout from "@/components/ClientLayout";
import { ToastProvider } from "@/components/ToastProvider";

export const metadata = {
  title: "RAWN PRO",
  description: "Ciência em conversa. Clareza em ação.",
  metadataBase: new URL("http://localhost:3000"),
  manifest: "/manifest.json",
  icons: {
    icon: "/brand/Favicon rawn pro.png",
    apple: "/brand/Favicon rawn pro.png",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "RAWN PRO",
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
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#0F0F0F",
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
