import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Foster Greatness Gingerbread House Contest 2025",
  description: "Join us in bringing 100 current and former foster youth together this holiday season for our virtual Gingerbread House Contest on December 19th.",
  openGraph: {
    title: "Foster Greatness Gingerbread House Contest 2025",
    description: "Join us in bringing 100 current and former foster youth together this holiday season for our virtual Gingerbread House Contest on December 19th.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} font-sans`}>{children}</body>
    </html>
  );
}
