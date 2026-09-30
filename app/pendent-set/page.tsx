import { JewelleryPageLayout, type JewelleryProduct } from "@/app/components/ui/JewelleryPageLayout";

const products: JewelleryProduct[] = [
  {
    id: "ps-1",
    name: "Marquise & Cushion Drop Set",
    subtitle: "925 Silver · Choker Necklace & Matching Drop Earrings",
    price: "₹18,500",
    image: "/images/custom/img7.jpeg",
    badge: "Haute Joaillerie",
    isNew: true,
  },
  {
    id: "ps-2",
    name: "Double Floret Layering Set",
    subtitle: "Dual Graduated Blossom Necklace & Cluster Studs",
    price: "₹14,800",
    image: "/images/custom/img21.jpeg",
    badge: "Bestseller",
  },
  {
    id: "ps-3",
    name: "Cascade Droplet Multi-Station Set",
    subtitle: "Two-Tier Cable Chain with Teardrop Pavé & Studs",
    price: "₹16,200",
    image: "/images/custom/img27.jpeg",
    badge: "Exclusive",
  },
];

export default function PendentSetPage() {
  return (
    <JewelleryPageLayout
      category="Pendent Set"
      tagline="A story draped around your neck."
      description="Our pendant sets are composed as wearable poetry — each piece paired with a hand-finished silver chain, designed to rest perfectly against the skin."
      products={products}
    />
  );
}
