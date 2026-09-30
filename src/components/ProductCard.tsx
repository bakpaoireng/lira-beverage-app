import { Plus, Star } from "lucide-react";
import { useNavigate } from "react-router";
import { Bottle } from "@/components/Bottle";
import { Button } from "@/components/ui/button";
import {
  CATEGORY_LABELS,
  CATEGORY_TINTS,
  formatPrice,
  type Product,
} from "@/data/products";
import { useCart } from "@/cart/CartContext";
import { cn } from "@/lib/utils";

const DEFAULT_SWEETNESS = "50% Sweet";
const DEFAULT_ICE = "Normal Ice";

export function ProductCard({ product }: { product: Product }) {
  const { addItem, openCart } = useCart();
  const navigate = useNavigate();

  const quickAdd = () => {
    addItem({
      productId: product.id,
      unitPrice: product.price,
      qty: 1,
      sweetness: DEFAULT_SWEETNESS,
      ice: DEFAULT_ICE,
    });
    openCart();
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => navigate(`/menu?drink=${product.id}`)}
      onKeyDown={(e) => e.key === "Enter" && navigate(`/menu?drink=${product.id}`)}
      className="group flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-border/70 bg-card shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
    >
      {/* Visual */}
      <div
        className="relative flex h-52 items-center justify-center transition-colors duration-300"
        style={{ backgroundColor: product.colors.tint }}
      >
        {product.badge && (
          <span
            className={cn(
              "absolute left-3 top-3 rounded-full px-2.5 py-1 text-[11px] font-semibold",
              product.badge === "Bestseller" && "bg-matcha text-white",
              product.badge === "New" && "bg-tea text-tea-ink",
              product.badge === "Limited" && "bg-cocoa text-white",
            )}
          >
            {product.badge}
          </span>
        )}
        <Bottle
          colors={product.colors}
          className="h-44 w-auto drop-shadow-md transition-transform duration-300 group-hover:scale-105 group-hover:-rotate-2"
        />
        {/* Quick add appears on hover */}
        <Button
          size="icon"
          aria-label={`Add ${product.name} to cart`}
          className="absolute right-3 top-3 size-9 rounded-full opacity-0 shadow-md transition-all duration-300 group-hover:opacity-100 max-md:opacity-100"
          onClick={(e) => {
            e.stopPropagation();
            quickAdd();
          }}
        >
          <Plus className="size-4" />
        </Button>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-center justify-between gap-2">
          <span
            className={cn(
              "rounded-full px-2.5 py-0.5 text-[11px] font-semibold",
              CATEGORY_TINTS[product.category],
            )}
          >
            {CATEGORY_LABELS[product.category]}
          </span>
          <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
            <Star className="size-3.5 fill-amber-400 text-amber-400" />
            {product.rating.toFixed(1)}
            <span className="text-muted-foreground/70">({product.reviews})</span>
          </span>
        </div>
        <h3 className="font-display text-base font-semibold leading-snug text-ink">
          {product.name}
        </h3>
        <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">
          {product.tagline}
        </p>
        <div className="mt-auto flex items-center justify-between pt-2">
          <span className="font-display text-lg font-bold text-foreground">
            {formatPrice(product.price)}
          </span>
          <Button
            variant="outline"
            size="sm"
            className="rounded-full border-matcha/40 text-matcha-ink hover:bg-matcha-soft hover:text-matcha-ink"
            onClick={(e) => {
              e.stopPropagation();
              quickAdd();
            }}
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}
