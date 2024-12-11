import { cn } from "@/lib/utils";
import "@/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";

import { type Metadata } from "next";
import { ThemeProvider } from "next-themes";
import localFont from "next/font/local";

export const metadata: Metadata = {
  title: "My Campus Admin",
};

const appFont = localFont({
  src: "./fonts/AppFont.ttf",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <html suppressHydrationWarning>
        <body className={cn(appFont.className)}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
