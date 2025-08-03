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
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem={true}
        >
          <div className="h-screen w-screen flex flex-col">
            <TitleBar />

            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
