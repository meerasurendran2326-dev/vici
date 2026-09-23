"use client";

import { useEffect, useState } from "react";
import { EntrySequence } from "@/app/components/luxury/EntrySequence";
import { Header } from "@/app/components/luxury/Header";
import { CollectionCarousel } from "@/app/components/luxury/CollectionCarousel";
import GlbRingScene from "@/app/three/scenes/GlbRingScene";
import { setupLenis } from "@/app/animations/scroll/lenis";
import { offerActive, products } from "@/app/data/products";

export default function HomePage() {
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    setupLenis();
  }, []);

  return (
    <main className="luxury-page">
      {!entered && <EntrySequence onEnter={() => setEntered(true)} />}

      <div className={`showroom-shell ${entered ? "is-entered" : ""}`}>
        <Header />

        <section className="hero-scene">
          <div className="hero-stage">
            <div className="hero-note" aria-label="hero material detail">
              <span className="hero-note__eyebrow">925 sterling silver</span>
              <span className="hero-note__copy">Faceted Onyx</span>
            </div>

            <div className="hero-brand-lockup" aria-label="VINI VICI VIDI">
              <div className="brand-stack-top">
                <span className="brand-word brand-vini">VINI</span>
                <span className="brand-word brand-vici">VICI</span>
              </div>
              <div className="hero-visual" aria-label="3D ring hero model">
                <GlbRingScene />
              </div>
              <span className="brand-word brand-vidi">VIDI</span>
            </div>
          </div>
        </section>

        {offerActive && (
          <div className="offer-strip">
            <div className="offer-marquee">
              {Array.from({ length: 3 }).map((_, index) => (
                <span key={index}>{products[0].offerLabel}</span>
              ))}
            </div>
          </div>
        )}

        <CollectionCarousel />

        <section className="craftsmanship-scene" id="craft">
          <div className="craft-copy">
            <p className="eyebrow">HANDMADE</p>
            <h2>BESPOKE</h2>
            <p>
              Every silhouette is refined at the bench, then polished to a
              quiet, architectural luminosity.
            </p>
          </div>
          <div className="craft-grid">
            {products.slice(0, 3).map((product) => (
              <article key={product.id} className="craft-tile">
                <div className="craft-image" />
                <div className="craft-text">
                  <span>{product.collection}</span>
                  <strong>{product.name}</strong>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="availability-scene">
          <div className="status-panel">
            <span className="status-dot" />
            <div>
              <p>AVAILABLE NOW</p>
              <strong>{products[0].status}</strong>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
