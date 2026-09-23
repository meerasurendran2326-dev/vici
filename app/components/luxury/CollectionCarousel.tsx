"use client";

import { useMemo, useState } from "react";
import { products } from "@/app/data/products";

export function CollectionCarousel() {
  const [activeIndex, setActiveIndex] = useState(2);

  const visibleProducts = useMemo(() => {
    return products.map((product, index) => ({
      ...product,
      offset: (index - activeIndex + products.length) % products.length,
    }));
  }, [activeIndex]);

  const move = (direction: number) => {
    setActiveIndex(
      (current) => (current + direction + products.length) % products.length,
    );
  };

  return (
    <section id="collection" className="collection-scene">
      <div className="section-header">
        <p className="eyebrow">CURATED EDITION</p>
        <h2>OUR WORKS</h2>
      </div>
      <div className="carousel-shell">
        <button
          type="button"
          className="carousel-arrow"
          onClick={() => move(-1)}
          aria-label="Previous collection item"
        >
          ←
        </button>
        <div className="carousel-track">
          {visibleProducts.map((product) => {
            const middle = product.offset === 0;
            const left = product.offset === products.length - 1;
            const right = product.offset === 1;

            return (
              <article
                key={product.id}
                className={`product-card ${middle ? "is-active" : ""} ${left ? "is-left" : ""} ${right ? "is-right" : ""}`}
                style={{
                  transform: `translateX(${product.offset * 12}%) rotate(${product.offset === 0 ? 0 : product.offset === 1 ? 8 : -8}deg)`,
                }}
              >
                <div className="product-media">
                  <span className="product-badge">{product.tag}</span>
                </div>
                <div className="product-details">
                  <div className="product-meta-row">
                    <p>{product.collection}</p>
                    <p>{product.material}</p>
                  </div>
                  <h3>{product.name}</h3>
                  <div className="product-footer-row">
                    <span className="price">
                      ${product.price.toLocaleString()}
                    </span>
                    <button type="button" className="bag-button">
                      Add to bag
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
        <button
          type="button"
          className="carousel-arrow"
          onClick={() => move(1)}
          aria-label="Next collection item"
        >
          →
        </button>
      </div>
    </section>
  );
}
