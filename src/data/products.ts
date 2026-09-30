// Lira — premium drinks catalog (v1 scope: drink menu, phone-first)

export type Category = "matcha" | "chocolate" | "milktea";

export interface Product {
  id: string;
  name: string;
  shortName: string;
  category: Category;
  tagline: string;
  description: string;
  price: number;
  rating: number;
  reviews: number;
  popularity: number;
  featured?: boolean;
  badge?: "Bestseller" | "New" | "Limited";
  sweetness: string;
  caffeine: string;
  bestWith: string;
  ingredients: string[];
  nutrition: { energy: string; sugar: string; protein: string; fat: string };
  /** Bottle illustration palette */
  colors: {
    cap: string;
    liquidTop: string;
    liquidBottom: string;
    label: string;
    leaf: string;
    tint: string; // soft background tint for cards
  };
}

export const CATEGORY_LABELS: Record<Category, string> = {
  matcha: "Matcha",
  chocolate: "Chocolate",
  milktea: "Milk Tea",
};

export const CATEGORY_TINTS: Record<Category, string> = {
  matcha: "bg-matcha/10 text-matcha-ink",
  chocolate: "bg-cocoa/10 text-cocoa",
  milktea: "bg-tea/25 text-tea-ink",
};

export const products: Product[] = [
  {
    id: "uji-matcha-latte",
    name: "Ceremonial Uji Matcha Latte",
    shortName: "Uji Matcha Latte",
    category: "matcha",
    tagline: "First-harvest Uji, whisked to order",
    description:
      "Single-cultivar ceremonial matcha from Uji, whisked into a silk-smooth latte. Grassy up front, mellow cream through the finish — nothing added, nothing hidden.",
    price: 6.8,
    rating: 4.9,
    reviews: 214,
    popularity: 98,
    featured: true,
    badge: "Bestseller",
    sweetness: "Barely sweet",
    caffeine: "Gentle lift",
    bestWith: "Morning focus",
    ingredients: ["Ceremonial Uji matcha", "Fresh milk", "A touch of cane sugar"],
    nutrition: { energy: "160 kcal", sugar: "14 g", protein: "6 g", fat: "7 g" },
    colors: {
      cap: "#d9c98d",
      liquidTop: "#a8bc6f",
      liquidBottom: "#5f7a3a",
      label: "#f7f1e3",
      leaf: "#43602c",
      tint: "#eef0e2",
    },
  },
  {
    id: "jasmine-matcha-cold-foam",
    name: "Jasmine Matcha Oat Cold Foam",
    shortName: "Jasmine Matcha Foam",
    category: "matcha",
    tagline: "Jasmine tea beneath an oat cloud",
    description:
      "Cold-brewed jasmine green tea crowned with whipped oat cold foam and a dusting of matcha. Floral, airy and quietly energising.",
    price: 7.2,
    rating: 4.8,
    reviews: 132,
    popularity: 91,
    featured: true,
    badge: "New",
    sweetness: "Light",
    caffeine: "Light lift",
    bestWith: "Afternoon resets",
    ingredients: [
      "Cold-brew jasmine tea",
      "Barista oat milk foam",
      "Matcha dust",
    ],
    nutrition: { energy: "140 kcal", sugar: "11 g", protein: "3 g", fat: "5 g" },
    colors: {
      cap: "#e6dcb8",
      liquidTop: "#c9d7a2",
      liquidBottom: "#7d9355",
      label: "#fbf7ec",
      leaf: "#547035",
      tint: "#f2f4e8",
    },
  },
  {
    id: "roasted-oolong-milk-tea",
    name: "Roasted Oolong Milk Tea",
    shortName: "Roasted Oolong Tea",
    category: "milktea",
    tagline: "Charcoal-roast depth, creamy finish",
    description:
      "Traditional charcoal-roasted oolong meets fresh milk for a toasty, nutty cup with a long, clean finish. The classic chatime-style milk tea, done properly.",
    price: 6.5,
    rating: 4.8,
    reviews: 189,
    popularity: 95,
    featured: true,
    badge: "Bestseller",
    sweetness: "Balanced",
    caffeine: "Medium lift",
    bestWith: "Anytime comfort",
    ingredients: [
      "Charcoal-roast oolong",
      "Fresh milk",
      "Rock sugar syrup",
    ],
    nutrition: { energy: "210 kcal", sugar: "18 g", protein: "5 g", fat: "8 g" },
    colors: {
      cap: "#d9c193",
      liquidTop: "#dcc394",
      liquidBottom: "#a97b4f",
      label: "#fbf4e6",
      leaf: "#8a6238",
      tint: "#f6efe2",
    },
  },
  {
    id: "brown-sugar-boba",
    name: "Brown Sugar Boba Pearl Milk Tea",
    shortName: "Brown Sugar Boba",
    category: "milktea",
    tagline: "Caramelised sugar, warm tapioca pearls",
    description:
      "Slow-simmered brown sugar syrup streaked down the glass, poured over fresh milk and chewy, warm tapioca pearls. Stir it and fall in.",
    price: 7.0,
    rating: 4.9,
    reviews: 261,
    popularity: 97,
    featured: true,
    badge: "Bestseller",
    sweetness: "Rich",
    caffeine: "Light lift",
    bestWith: "Sweet cravings",
    ingredients: [
      "Brown sugar syrup",
      "Warm tapioca pearls",
      "Fresh milk",
    ],
    nutrition: { energy: "280 kcal", sugar: "26 g", protein: "4 g", fat: "7 g" },
    colors: {
      cap: "#c9a678",
      liquidTop: "#d8b48c",
      liquidBottom: "#7e5636",
      label: "#f9efe0",
      leaf: "#6f4b2e",
      tint: "#f3e9db",
    },
  },
  {
    id: "belgian-dark-cacao",
    name: "Belgian Dark Cacao Blend",
    shortName: "Belgian Dark Cacao",
    category: "chocolate",
    tagline: "72% single-origin cacao, simply",
    description:
      "Stone-ground 72% Belgian cacao whisked with milk into a deep, almost bittersweet blend. For people who like their chocolate honest.",
    price: 7.4,
    rating: 4.7,
    reviews: 148,
    popularity: 88,
    featured: true,
    badge: "Limited",
    sweetness: "Bittersweet",
    caffeine: "Very light",
    bestWith: "Slow evenings",
    ingredients: ["72% Belgian cacao", "Fresh milk", "Cacao nibs"],
    nutrition: { energy: "240 kcal", sugar: "19 g", protein: "7 g", fat: "11 g" },
    colors: {
      cap: "#a97e5c",
      liquidTop: "#8a6448",
      liquidBottom: "#4b3323",
      label: "#f5ede0",
      leaf: "#5d4030",
      tint: "#efe5da",
    },
  },
  {
    id: "salted-caramel-cocoa",
    name: "Salted Caramel Hot Chocolate",
    shortName: "Salted Caramel Cocoa",
    category: "chocolate",
    tagline: "Sea salt, burnt caramel, soft cocoa",
    description:
      "Burnt-sugar caramel folded into soft cocoa and finished with flaked sea salt. Sweet, salty, and gone before you know it.",
    price: 7.0,
    rating: 4.8,
    reviews: 176,
    popularity: 90,
    sweetness: "Sweet-salty",
    caffeine: "Very light",
    bestWith: "Rainy days",
    ingredients: ["House cocoa blend", "Salted caramel", "Fresh milk"],
    nutrition: { energy: "300 kcal", sugar: "28 g", protein: "7 g", fat: "12 g" },
    colors: {
      cap: "#b98d63",
      liquidTop: "#c99a6a",
      liquidBottom: "#6e4a2e",
      label: "#f8f0e2",
      leaf: "#7a5434",
      tint: "#f2e8db",
    },
  },
];

export function getProduct(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function formatPrice(n: number): string {
  return `$${n.toFixed(2)}`;
}
