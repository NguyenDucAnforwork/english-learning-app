import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../src/app/globals.css";
import { AuthProvider } from "../lib/auth";
import AuthenticatedLayout from "./AuthenticatedLayout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "English Learning App",
  description: "Learn English vocabulary in context",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <AuthenticatedLayout>
            {children}
          </AuthenticatedLayout>
        </AuthProvider>
      </body>
    </html>
  );
}
