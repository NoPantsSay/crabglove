"use client";
import "@/styles/globals.css";

import { ThemeProvider } from "next-themes";
import { TitleBar } from "./titlebar/titleBar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased h-screen w-screen flex flex-col ">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem={true}
        >
          <TitleBar />

          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
