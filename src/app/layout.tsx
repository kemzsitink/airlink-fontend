import type { Metadata } from "next";
import { Providers } from "@/providers";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

export const metadata: Metadata = {
  title: "AirLink",
  description: "AirLink Panel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="h-full">
      <body
        className="min-h-full bg-neutral-50 dark:bg-[#141414] text-neutral-800 dark:text-white antialiased"
        style={{ fontFamily: "'General Sans', sans-serif" }}
      >
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
