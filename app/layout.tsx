import type { Metadata } from "next";
import {
  Inter,
  Cormorant_Garamond,
  Montserrat,
  Bebas_Neue,
} from "next/font/google";
import "./globals.css";
import { WishlistProvider } from "@/app/context/WishlistContext";
import { WishlistDrawer } from "@/app/components/ui/WishlistDrawer";

const inter = Inter({
  variable: "--font-ui",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-editorial",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const montserrat = Montserrat({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const bebasNeue = Bebas_Neue({
  variable: "--font-gothic",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "VINI VICI VIDI | Pure 925 Silver Atelier",
  description: "Cinematic silver jewellery showroom for VINI VICI VIDI.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${cormorant.variable} ${montserrat.variable} ${bebasNeue.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#050505] text-[#f2f2f2]">
        <WishlistProvider>
          {children}
          <WishlistDrawer />
        </WishlistProvider>
      </body>
    </html>
  );
}
