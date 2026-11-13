import type { Metadata } from "next";
import { SkinProvider } from "@/context/SkinContext";
import { ProjectWarmup } from "@/components/ProjectWarmup";
import "./globals.css";

export const metadata: Metadata = {
  title: "Shivang Gupta",
  description:
    "Personal portfolio of Shivang Gupta. High-performance ML systems, production cloud platforms (Aegis, SignalScale, Digit CNN), and Biomedical Brain-Computer Interfaces (BCI).",
  keywords: [
    "Shivang Gupta",
    "AI Engineer",
    "Machine Learning",
    "Brain-Computer Interface",
    "BCI",
    "JECRC",
    "Smart India Hackathon",
    "Render",
    "Full-Stack AI",
  ],
  authors: [{ name: "Shivang Gupta" }],
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Archivo:wght@800;900&family=IBM+Plex+Mono:wght@400;500;600;700&family=IBM+Plex+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        {/* Preconnect & DNS-Prefetch for Live Render Projects */}
        <link rel="dns-prefetch" href="https://aegis-elvv.onrender.com" />
        <link rel="dns-prefetch" href="https://lead-scoring-q7dj.onrender.com" />
        <link rel="dns-prefetch" href="https://handwritten-digit-recognition-1mv5.onrender.com" />
      </head>
      <body className="min-h-screen antialiased selection:bg-[var(--accent)] selection:text-[var(--on-accent)]">
        <SkinProvider>
          <ProjectWarmup />
          {children}
        </SkinProvider>
      </body>
    </html>
  );
}
