export type Product = {
  id: string;
  name: string;
  collection: string;
  material: string;
  price: number;
  stock: number;
  offerLabel: string | null;
  status: string;
  tag: string;
  accent: string;
};

export const products: Product[] = [
  {
    id: "helio-ring",
    name: "Helio Ring",
    collection: "Collection 01",
    material: "925 Sterling Silver",
    price: 1420,
    stock: 3,
    offerLabel: "50% OFFER",
    status: "Only 3 left",
    tag: "PLACEHOLDER",
    accent: "silver",
  },
  {
    id: "lune-pendant",
    name: "Lune Pendant",
    collection: "Collection 02",
    material: "925 Sterling Silver",
    price: 980,
    stock: 7,
    offerLabel: null,
    status: "In atelier",
    tag: "PLACEHOLDER",
    accent: "chrome",
  },
  {
    id: "aether-cuff",
    name: "Aether Cuff",
    collection: "Collection 03",
    material: "925 Sterling Silver",
    price: 1860,
    stock: 2,
    offerLabel: "Bespoke",
    status: "Limited run",
    tag: "PLACEHOLDER",
    accent: "steel",
  },
  {
    id: "solstice-earring",
    name: "Solstice Earrings",
    collection: "Collection 04",
    material: "925 Sterling Silver",
    price: 1220,
    stock: 5,
    offerLabel: null,
    status: "Ready to ship",
    tag: "PLACEHOLDER",
    accent: "silver",
  },
  {
    id: "mira-chain",
    name: "Mira Chain",
    collection: "Collection 05",
    material: "925 Sterling Silver",
    price: 1345,
    stock: 4,
    offerLabel: "Private order",
    status: "Studio piece",
    tag: "PLACEHOLDER",
    accent: "chrome",
  },
];

export const offerActive = products.some((product) => product.offerLabel);
