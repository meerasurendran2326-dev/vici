import { JewelleryPageLayout, type JewelleryProduct } from "@/app/components/ui/JewelleryPageLayout";

const products: JewelleryProduct[] = [
  {
    id: "ring-1",
    name: "Vici Obsidian Signet Ring",
    subtitle: "925 Sterling Silver",
    price: "₹4,200",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=800&auto=format&fit=crop",
    badge: "Bestseller",
  },
  {
    id: "ring-2",
    name: "Lumina Solitaire Band",
    subtitle: "Silver · Emerald Stone",
    price: "₹5,800",
    image: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?q=80&w=800&auto=format&fit=crop",
    isNew: true,
  },
  {
    id: "ring-3",
    name: "Celestial Stack Ring Set",
    subtitle: "925 Sterling Silver",
    price: "₹3,600",
    image: "https://images.unsplash.com/photo-1600003014755-ba31aa59c4b6?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "ring-4",
    name: "Verdant Eternity Band",
    subtitle: "Silver · Micro Pavé",
    price: "₹6,500",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=800&auto=format&fit=crop",
    badge: "Limited",
  },
  {
    id: "ring-5",
    name: "Aura Open Ring",
    subtitle: "925 Sterling Silver",
    price: "₹2,900",
    image: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?q=80&w=800&auto=format&fit=crop",
    isNew: true,
  },
  {
    id: "ring-6",
    name: "Sovereign Sculpted Ring",
    subtitle: "Hammered Silver",
    price: "₹4,800",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "ring-7",
    name: "Midnight Filigree Ring",
    subtitle: "925 Sterling Silver",
    price: "₹3,200",
    image: "https://images.unsplash.com/photo-1583946099379-f9c9cb8bc030?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "ring-8",
    name: "Dew Drop Gemstone Ring",
    subtitle: "Silver · Aquamarine",
    price: "₹7,200",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=800&auto=format&fit=crop",
    badge: "Exclusive",
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
