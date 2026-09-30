import { JewelleryPageLayout, type JewelleryProduct } from "@/app/components/ui/JewelleryPageLayout";

const products: JewelleryProduct[] = [
  {
    id: "ps-1",
    name: "Celestial Halo Pendant Set",
    subtitle: "925 Silver · Pendant & Chain",
    price: "₹6,800",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=800&auto=format&fit=crop",
    badge: "Bestseller",
  },
  {
    id: "ps-2",
    name: "Lumina Droplet Pendant Set",
    subtitle: "Silver · Aquamarine Drop",
    price: "₹5,400",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=800&auto=format&fit=crop",
    isNew: true,
  },
  {
    id: "ps-3",
    name: "Verdant Floral Choker Set",
    subtitle: "Handcrafted 925 Silver",
    price: "₹7,200",
    image: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "ps-4",
    name: "Aura Crescent Moon Set",
    subtitle: "Silver · Moonstone Inlay",
    price: "₹4,900",
    image: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?q=80&w=800&auto=format&fit=crop",
    badge: "Limited",
  },
  {
    id: "ps-5",
    name: "Sovereign Pearl Pendant Set",
    subtitle: "Silver · Freshwater Pearl",
    price: "₹8,500",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=800&auto=format&fit=crop",
    isNew: true,
  },
  {
    id: "ps-6",
    name: "Midnight Star Pendant Set",
    subtitle: "925 Sterling Silver",
    price: "₹5,100",
    image: "https://images.unsplash.com/photo-1600003014755-ba31aa59c4b6?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "ps-7",
    name: "Dew Leaf Layer Necklace",
    subtitle: "Handcrafted Silver",
    price: "₹6,200",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "ps-8",
    name: "Vici Gemstone Collar Set",
    subtitle: "Silver · Emerald Stone",
    price: "₹9,400",
    image: "https://images.unsplash.com/photo-1583946099379-f9c9cb8bc030?q=80&w=800&auto=format&fit=crop",
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
