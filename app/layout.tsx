import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from "@/contexts/ThemeContext";
import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ScrollProgress } from "@/components/layout/ScrollProgress";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Oliver Nieto - Web Developer",
  description:
    "Portfolio de Oliver Nieto, desarrollador Full Stack especializado en React, Next.js, Node.js y TypeScript. Disponible para proyectos freelance y trabajo remoto.",
  keywords: [
    "Full Stack Developer",
    "React",
    "Next.js",
    "TypeScript",
    "Medellin",
    "Colombia"
  ],
  authors: [{ name: "Oliver Nieto", url: "https://olivernieto.dev" }],
  openGraph: {
    title: "Oliver Nieto — Full Stack Developer",
    description: "Desarrollador Full Stack apasionado por crear experiencias web increibles",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    locale: "es_CO",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Oliver Nieto — Full Stack Developer",
    description: "Portfolio de Oliver Nieto, Full Stack Developer"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const theme = localStorage.getItem('theme') || 
                  (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
                document.documentElement.classList.add(theme);
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <LanguageProvider>
            <ScrollProgress />
            {children}
            <Analytics />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
