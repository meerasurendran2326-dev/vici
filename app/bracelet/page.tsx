import { JewelleryPageLayout, type JewelleryProduct } from "@/app/components/ui/JewelleryPageLayout";

const products: JewelleryProduct[] = [
  {
    id: "br-1",
    name: "Mariposa Butterfly Station Bracelet",
    subtitle: "Articulated 925 Silver · Butterfly Charms",
    price: "₹6,800",
    image: "/images/custom/img2.jpeg",
    badge: "Bestseller",
  },
  {
    id: "br-2",
    name: "Amour Heart Solitaire Bracelet",
    subtitle: "Bezel Diamonds · Pavé Heart Centerpiece",
    price: "₹8,400",
    image: "/images/custom/img8.jpeg",
    isNew: true,
  },
  {
    id: "br-3",
    name: "Nacré Disc & Clover Bracelet",
    subtitle: "Mother-of-Pearl · Diamond Pavé Clover",
    price: "₹7,900",
    image: "/images/custom/img10.jpeg",
    badge: "Signature",
  },
  {
    id: "br-4",
    name: "Scalloped Petal Diamond Bracelet",
    subtitle: "Hand-Textured Silver · Pavé Accents",
    price: "₹9,200",
    image: "/images/custom/img13.jpeg",
  },
  {
    id: "br-5",
    name: "Alhambra Quatrefoil Station Bracelet",
    subtitle: "Milgrain-Edged Clovers · Box Chain",
    price: "₹11,500",
    image: "/images/custom/img14.jpeg",
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
