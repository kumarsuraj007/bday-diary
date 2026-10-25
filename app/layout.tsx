import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "A Year of You — An Interactive Birthday Diary",
  description: "A warm, intimate, physical-inspired interactive birthday diary crafted with love.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Gaegu:wght@400;700&family=Patrick+Hand&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full font-hand bg-[#F4F1EA] text-[#1D1B19] selection:bg-[#E5A4A9]/40 selection:text-[#1A1A1A] overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
