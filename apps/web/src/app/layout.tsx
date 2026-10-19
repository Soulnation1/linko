import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Toaster } from "sonner";
import { ThemeProvider, ThemeScript } from "@linko/ui";
import { SuccessModalHost } from "@/components/shared";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Linko",
  description:
    "Simple for businesses. Easy for customers. Digital pages and ordering for local businesses.",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Linko",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0F172A",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <ThemeScript />
      </head>
      <body className="min-h-full bg-[var(--bg-base)] text-theme-primary font-sans antialiased transition-colors duration-250">
        <ThemeProvider defaultTheme="dark">
          {children}
          <SuccessModalHost />
          <Toaster position="top-center" richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
