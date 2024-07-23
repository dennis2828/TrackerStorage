import "./globals.css";
import { Inter } from "next/font/google";
import { cn, constructMetadata } from "@/lib/utils";
import Providers from "@/components/Providers";
import { Toaster } from "react-hot-toast";
import { Analytics } from "@vercel/analytics/react"

const inter = Inter({ subsets: ["latin"] });

export const metadata = constructMetadata();


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(inter.className, "bg-gray-100")}>
      <Toaster />
      <Providers>
          {children}
      </Providers>
      <Analytics />
      </body>
    </html>
  );
}
