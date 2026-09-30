"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SiteHeader } from "@/app/components/ui/SiteHeader";
import Link from "next/link";

export interface JewelleryProduct {
  id: string;
  name: string;
  subtitle: string;
  price: string;
  image: string;
  badge?: string;
  isNew?: boolean;
}

interface JewelleryPageLayoutProps {
  category: string;
  tagline: string;
  description: string;
  products: JewelleryProduct[];
}

export function JewelleryPageLayout({
  category,
  tagline,
  description,
  products,
}: JewelleryPageLayoutProps) {
  const [hovered, setHovered] = useState<string | null>(null);
  const [wishlist, setWishlist] = useState<Set<string>>(new Set());

  const toggleWishlist = (id: string) => {
    setWishlist((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        background:
          "linear-gradient(160deg, #ffffff 0%, #e8f5e9 25%, #c8e6c9 52%, #a5d6a7 76%, #81c784 100%)",
      }}
    >
      <SiteHeader />

      {/* ── Hero Banner ── */}
      <section className="relative pt-16 pb-14 px-6 sm:px-10 text-center overflow-hidden">
        {/* Decorative emerald orbs */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-emerald-300/20 blur-3xl" />
          <div className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-emerald-500/15 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[200px] rounded-full bg-white/30 blur-2xl" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10"
        >
          <p className="text-xs tracking-[0.28em] uppercase font-medium text-emerald-700 mb-3">
            Vini Vici Vidi · Silver Atelier
          </p>
          <h1
            className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-emerald-950"
            style={{ fontFamily: "var(--font-editorial), serif" }}
          >
            {category}
          </h1>
          <p
            className="mt-3 text-lg sm:text-xl text-emerald-800/80 italic"
            style={{ fontFamily: "var(--font-editorial), serif" }}
          >
            {tagline}
          </p>
          <p className="mt-4 max-w-xl mx-auto text-sm text-emerald-700/70 leading-relaxed">
            {description}
          </p>

          {/* Decorative rule */}
          <div className="mt-8 flex items-center justify-center gap-3">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-emerald-400" />
            <div className="w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-emerald-300" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-emerald-400" />
          </div>
        </motion.div>
      </section>

      {/* ── Product Grid ── */}
      <section className="flex-1 px-5 sm:px-8 md:px-12 pb-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: i * 0.07, ease: "easeOut" }}
              onMouseEnter={() => setHovered(product.id)}
              onMouseLeave={() => setHovered(null)}
              className="group relative flex flex-col rounded-2xl overflow-hidden cursor-pointer"
              style={{
                background: "rgba(255,255,255,0.76)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                boxShadow:
                  hovered === product.id
                    ? "0 24px 48px rgba(22,101,52,0.18), 0 0 0 1.5px rgba(22,101,52,0.14)"
                    : "0 4px 24px rgba(22,101,52,0.08), 0 0 0 1px rgba(22,101,52,0.07)",
                transition: "box-shadow 0.35s ease",
              }}
            >
              {/* Image wrapper */}
              <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-emerald-50 to-white">
                <motion.img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  animate={{ scale: hovered === product.id ? 1.06 : 1 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />

                {/* Overlay gradient on hover */}
                <AnimatePresence>
                  {hovered === product.id && (
                    <motion.div
                      key="overlay"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 bg-gradient-to-t from-emerald-900/40 via-transparent to-transparent"
                    />
                  )}
                </AnimatePresence>

                {/* Badges */}
                {product.badge && (
                  <span className="absolute top-3 left-3 bg-emerald-700 text-white text-[0.58rem] tracking-[0.12em] uppercase font-semibold px-2.5 py-1 rounded-full shadow-md">
                    {product.badge}
                  </span>
                )}
                {product.isNew && (
                  <span className="absolute top-3 right-12 bg-white/90 text-emerald-800 text-[0.58rem] tracking-[0.12em] uppercase font-semibold px-2.5 py-1 rounded-full shadow-sm border border-emerald-200">
                    New
                  </span>
                )}

                {/* Wishlist button */}
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-md border border-emerald-100 transition-transform hover:scale-110"
                  aria-label="Add to wishlist"
                >
                  <svg
                    className={`w-4 h-4 transition-colors ${
                      wishlist.has(product.id)
                        ? "fill-rose-500 stroke-rose-500"
                        : "fill-none stroke-emerald-600"
                    }`}
                    strokeWidth={1.8}
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>

              {/* Info */}
              <div className="p-4 flex flex-col gap-1.5">
                <p className="text-[0.6rem] tracking-[0.18em] uppercase text-emerald-600 font-semibold">
                  {product.subtitle}
                </p>
                <h3
                  className="text-sm font-semibold text-emerald-950 leading-snug"
                  style={{ fontFamily: "var(--font-editorial), serif" }}
                >
                  {product.name}
                </h3>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-base font-bold text-emerald-800">
                    {product.price}
                  </span>
                  <motion.button
                    whileTap={{ scale: 0.94 }}
                    className="text-[0.62rem] tracking-wider uppercase font-semibold text-white bg-emerald-700 hover:bg-emerald-800 px-3.5 py-1.5 rounded-full transition-colors shadow-sm"
                  >
                    Add to Cart
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-emerald-950 text-emerald-100 py-12 px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
          {[
            {
              title: "Atelier",
              links: [
                { label: "Our Story", href: "/" },
                { label: "Craftsmanship", href: "/" },
              ],
            },
            {
              title: "Shop",
              links: [
                { label: "Rings", href: "/rings" },
                { label: "Pendent Set", href: "/pendent-set" },
                { label: "Bracelet", href: "/bracelet" },
                { label: "Stud", href: "/stud" },
              ],
            },
            {
              title: "Support",
              links: [
                { label: "WhatsApp Concierge", href: "#" },
                { label: "Care Guide", href: "#" },
              ],
            },
            {
              title: "Legal",
              links: [
                { label: "Privacy Policy", href: "#" },
                { label: "Terms of Service", href: "#" },
              ],
            },
          ].map((col) => (
            <div key={col.title}>
              <p className="text-[0.65rem] tracking-[0.2em] uppercase text-emerald-400 font-semibold mb-3">
                {col.title}
              </p>
              <ul className="space-y-2">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-emerald-200/70 hover:text-white transition-colors"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-10 text-center text-xs text-emerald-600 tracking-widest uppercase">
          © {new Date().getFullYear()} Vini Vici Vidi · Pure 925 Silver Atelier
        </p>
      </footer>
    </div>
  );
}
