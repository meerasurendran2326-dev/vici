import { JewelleryPageLayout, type JewelleryProduct } from "@/app/components/ui/JewelleryPageLayout";

const products: JewelleryProduct[] = [
  {
    id: "br-1",
    name: "Vici Sovereign Cuff",
    subtitle: "Sculpted 925 Silver",
    price: "₹5,600",
    image: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?q=80&w=800&auto=format&fit=crop",
    badge: "Bestseller",
  },
  {
    id: "br-2",
    name: "Lumina Tennis Bracelet",
    subtitle: "Silver · Micro Pavé",
    price: "₹8,200",
    image: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?q=80&w=800&auto=format&fit=crop",
    isNew: true,
  },
  {
    id: "br-3",
    name: "Aura Chain Bangle",
    subtitle: "Handcrafted 925 Silver",
    price: "₹3,900",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "br-4",
    name: "Celestial Charm Bracelet",
    subtitle: "Silver · Mixed Charms",
    price: "₹4,700",
    image: "https://images.unsplash.com/photo-1600003014755-ba31aa59c4b6?q=80&w=800&auto=format&fit=crop",
    badge: "Limited",
  },
  {
    id: "br-5",
    name: "Verdant Leaf Wrap",
    subtitle: "Hammered Silver",
    price: "₹6,100",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=800&auto=format&fit=crop",
    isNew: true,
  },
  {
    id: "br-6",
    name: "Midnight Coil Cuff",
    subtitle: "925 Sterling Silver",
    price: "₹4,400",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "br-7",
    name: "Dew Droplet Link Bracelet",
    subtitle: "Silver · Pearl Accents",
    price: "₹7,300",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "br-8",
    name: "Sovereign Gemstone Bangle",
    subtitle: "Silver · Emerald Inlay",
    price: "₹9,800",
    image: "https://images.unsplash.com/photo-1583946099379-f9c9cb8bc030?q=80&w=800&auto=format&fit=crop",
    badge: "Exclusive",
  },
];

export default function BraceletPage() {
  return (
    <JewelleryPageLayout
      category="Bracelet"
      tagline="Elegance clasped at your wrist."
      description="From sculptural cuffs to delicate chain links, our bracelets are crafted in certified 925 silver to adorn every occasion."
      products={products}
    />
  );
}
