import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dream Team",
  description: "App about of dream team",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>
        {children}
      </body>
    </html>
  );
}
