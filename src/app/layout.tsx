"use client";

import localFont from "next/font/local";
import "@/styles/globals.css";

import { ThemeProvider } from "next-themes";
import { useEffect, useState } from "react";
import { useLanguage } from "@/app/data/useLanguage";
import { TitleBar } from "./titlebar/titleBar";

const inter = localFont({
  src: [
    {
      path: "../../fonts/Inter-VariableFont_opsz,wght.ttf",
      weight: "100 900", // 可变字体的权重范围
      style: "normal",
    },
  ],
  variable: "--font-inter",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { language } = useLanguage();

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <html lang={language} suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem={true}
        >
          <div className="h-screen w-screen flex flex-col">
            {isClient && <TitleBar />}

            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
