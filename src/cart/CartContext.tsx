import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { getProduct, type Product } from "@/data/products";

export interface CartItem {
  productId: string;
  name: string;
  shortName: string;
  category: Product["category"];
  unitPrice: number;
  qty: 1 | 2 | 3;
  sweetness: string;
  ice: string;
}

const PROMO_CODES: Record<string, number> = {
  LIRA10: 0.1,
  WELCOME15: 0.15,
  MATCHA20: 0.2,
};

export interface CartContextValue {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "name" | "shortName" | "category">) => void;
  removeItem: (key: string) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
  discount: number;
  total: number;
  promo: string | null;
  promoError: string | null;
  applyPromo: (code: string) => boolean;
  clearPromo: () => void;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  itemKey: (item: CartItem) => string;
}

const CartContext = createContext<CartContextValue | null>(null);

export function itemKey(item: CartItem): string {
  return `${item.productId}|${item.sweetness}|${item.ice}`;
}

function loadCart(): CartItem[] {
  try {
    const raw = localStorage.getItem("lira-cart-v1");
    return raw ? (JSON.parse(raw) as CartItem[]) : [];
  } catch {
    return [];
  }
}

function loadPromo(): string | null {
  try {
    const raw = localStorage.getItem("lira-promo-v1");
    return raw ? (JSON.parse(raw) as string | null) : null;
  } catch {
    return null;
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(loadCart);
  const [promo, setPromo] = useState<string | null>(loadPromo);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem("lira-cart-v1", JSON.stringify(items));
    } catch {
      /* ignore */
    }
  }, [items]);

  useEffect(() => {
    try {
      localStorage.setItem("lira-promo-v1", JSON.stringify(promo));
    } catch {
      /* ignore */
    }
  }, [promo]);

  const addItem = (item: Omit<CartItem, "name" | "shortName" | "category">) => {
    setItems((prev) => {
      const key = itemKey(item as CartItem);
      const existing = prev.find((it) => itemKey(it) === key);
      if (existing) {
        const newQty = Math.min(3, existing.qty + item.qty) as 1 | 2 | 3;
        return prev.map((it) =>
          itemKey(it) === key ? { ...it, qty: newQty } : it,
        );
      }
      const product = getProduct(item.productId);
      if (!product) return prev;
      const next: CartItem = {
        ...item,
        name: product.name,
        shortName: product.shortName,
        category: product.category,
      };
      return [...prev, next];
    });
  };

  const removeItem = (key: string) =>
    setItems((prev) => prev.filter((it) => itemKey(it) !== key));

  const clearCart = () => {
    setItems([]);
    setPromo(null);
  };

  const { subtotal, itemCount } = useMemo(() => {
    let subtotal = 0;
    let itemCount = 0;
    for (const it of items) {
      subtotal += it.unitPrice * it.qty;
      itemCount += it.qty;
    }
    return { subtotal, itemCount };
  }, [items]);

  const discount = promo ? (PROMO_CODES[promo] ?? 0) * subtotal : 0;
  const total = Math.max(0, subtotal - discount);

  const applyPromo = (code: string): boolean => {
    const normalized = code.trim().toUpperCase();
    if (normalized in PROMO_CODES) {
      setPromo(normalized);
      return true;
    }
    return false;
  };

  const clearPromo = () => setPromo(null);
  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const value = useMemo(
    () => ({
      items,
      addItem,
      removeItem,
      clearCart,
      itemCount,
      subtotal,
      discount,
      total,
      promo,
      promoError: null,
      applyPromo,
      clearPromo,
      isCartOpen,
      openCart,
      closeCart,
      itemKey,
    }),
    [items, promo, isCartOpen, subtotal, discount, total, itemCount],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
