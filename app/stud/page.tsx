import { JewelleryPageLayout, type JewelleryProduct } from "@/app/components/ui/JewelleryPageLayout";

const products: JewelleryProduct[] = [
  {
    id: "st-1",
    name: "Papillon Heart Ribbon Studs",
    subtitle: "925 Silver · Pavé Diamond Wings",
    price: "₹4,200",
    image: "/images/custom/img4.jpeg",
    badge: "Bestseller",
  },
  {
    id: "st-2",
    name: "Serpentine Infinity Studs",
    subtitle: "Sculpted Silver · Pavé Curve",
    price: "₹3,900",
    image: "/images/custom/img5.jpeg",
    isNew: true,
  },
  {
    id: "st-3",
    name: "Florelle Clover Diamond Studs",
    subtitle: "Four-Petal Clover · Pavé Setting",
    price: "₹5,400",
    image: "/images/custom/img6.jpeg",
    badge: "Signature",
  },
  {
    id: "st-4",
    name: "Crossed Heart Ribbon Studs",
    subtitle: "Solid 925 Sterling Silver",
    price: "₹3,600",
    image: "/images/custom/img15.jpeg",
  },
  {
    id: "st-5",
    name: "Foliage Pavé Leaf Studs",
    subtitle: "Sculptural Leaf · Diamond Veins",
    price: "₹4,800",
    image: "/images/custom/img16.jpeg",
    badge: "Atelier Drop",
  },
  {
    id: "st-6",
    name: "Lotus Bloom Diamond Studs",
    subtitle: "Handcrafted 925 Silver · Sacred Lotus",
    price: "₹5,100",
    image: "/images/custom/img17.jpeg",
    isNew: true,
  },
  {
    id: "st-7",
    name: "Quatrefoil Quadrant Studs",
    subtitle: "Four-Square Diamond Geometric",
    price: "₹4,600",
    image: "/images/custom/img23.jpeg",
  },
  {
    id: "st-8",
    name: "Imperial Tiara Crown Studs",
    subtitle: "Regal Royal Crown · Pavé Gems",
    price: "₹6,200",
    image: "/images/custom/img25.jpeg",
    badge: "Exclusive",
  },
];

export default function StudPage() {
  return (
    <JewelleryPageLayout
      category="Stud"
      tagline="Small in size, infinite in grace."
      description="Our studs are precision-crafted in 925 sterling silver — minimal, refined pieces that whisper luxury with every glance."
      products={products}
    />
  );
}
