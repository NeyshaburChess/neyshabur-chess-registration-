import type { Metadata } from "next";
import "./globals.css";
 
export const metadata: Metadata = {
  title: "هیأت شطرنج شهرستان نیشابور",
  description:
    "وب‌سایت رسمی هیأت شطرنج شهرستان نیشابور | اخبار، مسابقات، ثبت‌نام مسابقات و فعالیت‌های شطرنجی",
 
  metadataBase: new URL(
    "https://neyshabur-chess-registration.chesskhayam.workers.dev"
  ),
 
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
 
  openGraph: {
    title: "هیأت شطرنج شهرستان نیشابور",
    description:
      "وب‌سایت رسمی هیأت شطرنج شهرستان نیشابور",
    url: "https://neyshabur-chess-registration.chesskhayam.workers.dev",
    siteName: "هیأت شطرنج شهرستان نیشابور",
    images: [
      {
        url: "/logo.png",
        width: 512,
        height: 512,
        alt: "لوگوی هیأت شطرنج شهرستان نیشابور",
      },
    ],
    locale: "fa_IR",
    type: "website",
  },
 
  twitter: {
    card: "summary_large_image",
    title: "هیأت شطرنج شهرستان نیشابور",
    description:
      "وب‌سایت رسمی هیأت شطرنج شهرستان نیشابور",
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
      <body>{children}</body>
    </html>
  );
}
