import { JewelleryPageLayout, type JewelleryProduct } from "@/app/components/ui/JewelleryPageLayout";

const products: JewelleryProduct[] = [
  {
    id: "ring-1",
    name: "Vici Obsidian Signet Ring",
    subtitle: "925 Sterling Silver · Faceted Black Onyx",
    price: "₹14,200",
    image: "/images/custom/img1.jpeg",
    badge: "Bestseller",
  },
  {
    id: "ring-2",
    name: "Ruby Solitaire Crown Ring",
    subtitle: "Sterling Silver · Brilliant Ruby",
    price: "₹8,800",
    image: "/images/custom/img3.jpeg",
    isNew: true,
  },
  {
    id: "ring-3",
    name: "Dual Phoenix Carved Signet",
    subtitle: "925 Silver · Faceted Noir Gem",
    price: "₹18,500",
    image: "/images/custom/img9.jpeg",
    badge: "Masterpiece",
  },
  {
    id: "ring-4",
    name: "Royal Sapphire Solitaire",
    subtitle: "Sterling Silver · Cobalt Sapphire",
    price: "₹9,200",
    image: "/images/custom/img11.jpeg",
  },
  {
    id: "ring-5",
    name: "Aura Infinity Loop Band",
    subtitle: "Fluid Sculpted 925 Silver",
    price: "₹4,900",
    image: "/images/custom/img12.jpeg",
    isNew: true,
  },
  {
    id: "ring-6",
    name: "Grecian Meander Signet",
    subtitle: "Archival Greek Key · Onyx Tablet",
    price: "₹16,400",
    image: "/images/custom/img18.jpeg",
    badge: "Atelier Drop",
  },
  {
    id: "ring-7",
    name: "Baroque Scroll Signet Ring",
    subtitle: "Hand-Carved Silver · Faceted Stone",
    price: "₹15,800",
    image: "/images/custom/img19.jpeg",
  },
  {
    id: "ring-8",
    name: "Crown Filigree Onyx Solitaire",
    subtitle: "Pierced Filigree · Oval Faceted Gem",
    price: "₹17,200",
    image: "/images/custom/img20.jpeg",
    badge: "Exclusive",
  },
  {
    id: "ring-9",
    name: "Celestial Kurma Turtle Ring",
    subtitle: "925 Silver · Pavé Diamond Shell",
    price: "₹19,800",
    image: "/images/custom/img22.jpeg",
    badge: "Haute Joaillerie",
  },
  {
    id: "ring-10",
    name: "Sovereign Sacred Turtle Ring",
    subtitle: "Geometric Swastik Pavé Shell",
    price: "₹18,900",
    image: "/images/custom/img24.jpeg",
  },
  {
    id: "ring-11",
    name: "Pink Blossom Petite Ring",
    subtitle: "Silver · Pink Sapphire Floral",
    price: "₹6,800",
    image: "/images/custom/img26.jpeg",
    isNew: true,
  },
  {
    id: "ring-12",
    name: "Amour Pavé Heart Ring",
    subtitle: "Sterling Silver · Micro Pavé",
    price: "₹5,400",
    image: "/images/custom/img28.jpeg",
  },
  {
    id: "ring-13",
    name: "Industrial Screwed Signet",
    subtitle: "Solid 925 Silver · Architectonic Link",
    price: "₹22,000",
    image: "/images/custom/img29.jpeg",
    badge: "Signature",
  },
];

export default function RingsPage() {
  return (
    <JewelleryPageLayout
      category="Rings"
      tagline="Worn close, treasured forever."
      description="Each ring in our atelier is hand-crafted from certified 925 sterling silver, shaped to carry meaning on every finger."
      products={products}
    />
  );
}
