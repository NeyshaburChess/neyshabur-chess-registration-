import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
 
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
 
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
 
export const metadata: Metadata = {
  title: "هیأت شطرنج شهرستان نیشابور",
  description:
    "سامانه ثبت نام مسابقات شطرنج هیأت شطرنج شهرستان نیشابور",
  keywords: [
    "شطرنج",
    "هیأت شطرنج نیشابور",
    "مسابقات شطرنج",
    "ثبت نام مسابقات شطرنج",
  ],
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "هیأت شطرنج شهرستان نیشابور",
    description:
      "سامانه رسمی ثبت نام مسابقات شطرنج هیأت شطرنج شهرستان نیشابور",
    type: "website",
    locale: "fa_IR",
    images: [
      {
        url: "/logo.png",
        width: 512,
        height: 512,
        alt: "لوگوی هیأت شطرنج شهرستان نیشابور",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "هیأت شطرنج شهرستان نیشابور",
    description:
      "سامانه ثبت نام مسابقات شطرنج",
    images: ["/logo.png"],
  },
};
 
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
 