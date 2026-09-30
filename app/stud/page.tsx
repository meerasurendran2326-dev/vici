import { JewelleryPageLayout, type JewelleryProduct } from "@/app/components/ui/JewelleryPageLayout";

const products: JewelleryProduct[] = [
  {
    id: "st-1",
    name: "Vici Orbit Stud",
    subtitle: "925 Silver · Round Disc",
    price: "₹2,400",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=800&auto=format&fit=crop",
    badge: "Bestseller",
  },
  {
    id: "st-2",
    name: "Lumina Moonstone Stud",
    subtitle: "Silver · Moonstone",
    price: "₹3,600",
    image: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?q=80&w=800&auto=format&fit=crop",
    isNew: true,
  },
  {
    id: "st-3",
    name: "Celestial Star Stud",
    subtitle: "Handcrafted 925 Silver",
    price: "₹1,900",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "st-4",
    name: "Verdant Emerald Stud",
    subtitle: "Silver · Lab Emerald",
    price: "₹4,200",
    image: "https://images.unsplash.com/photo-1600003014755-ba31aa59c4b6?q=80&w=800&auto=format&fit=crop",
    badge: "Limited",
  },
  {
    id: "st-5",
    name: "Aura Pearl Stud",
    subtitle: "Silver · Freshwater Pearl",
    price: "₹2,800",
    image: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?q=80&w=800&auto=format&fit=crop",
    isNew: true,
  },
  {
    id: "st-6",
    name: "Midnight Filigree Stud",
    subtitle: "Handcrafted 925 Silver",
    price: "₹2,100",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "st-7",
    name: "Dew Drop Aquamarine Stud",
    subtitle: "Silver · Aquamarine",
    price: "₹3,900",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "st-8",
    name: "Sovereign Geode Stud",
    subtitle: "925 Silver · Geode Slice",
    price: "₹5,500",
    image: "https://images.unsplash.com/photo-1583946099379-f9c9cb8bc030?q=80&w=800&auto=format&fit=crop",
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
