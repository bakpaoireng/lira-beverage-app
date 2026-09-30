import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { Check, Minus, Plus, Star } from "lucide-react";
import { Bottle } from "@/components/Bottle";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  CATEGORY_LABELS,
  CATEGORY_TINTS,
  formatPrice,
  products,
  type Product,
} from "@/data/products";
import { useCart } from "@/cart/CartContext";
import { cn } from "@/lib/utils";

const SWEETNESS_LEVELS = ["0%", "30%", "50%", "70%", "100%"] as const;
const ICE_LEVELS = ["No Ice", "Less Ice", "Normal Ice", "Extra Ice"] as const;

export function ProductDialog() {
  const [params, setParams] = useSearchParams();
  const { addItem, openCart } = useCart();

  const id = params.get("drink");
  const product = products.find((p) => p.id === id) ?? null;

  const [sweetness, setSweetness] = useState<string>("50%");
  const [ice, setIce] = useState<string>("Normal Ice");
  const [qty, setQty] = useState<1 | 2 | 3>(1);
  const [added, setAdded] = useState(false);

  // Reset selections when a different product opens
  useEffect(() => {
    if (product) {
      setSweetness("50%");
      setIce("Normal Ice");
      setQty(1);
      setAdded(false);
    }
  }, [product?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  const close = () => {
    const next = new URLSearchParams(params);
    next.delete("drink");
    setParams(next, { replace: true });
  };

  const handleAdd = () => {
    if (!product) return;
    addItem({
      productId: product.id,
      unitPrice: product.price,
      qty,
      sweetness: `${sweetness} Sweet`,
      ice,
    });
    setAdded(true);
    window.setTimeout(() => {
      close();
      openCart();
    }, 550);
  };

  return (
    <Dialog open={!!product} onOpenChange={(open) => !open && close()}>
      <DialogContent className="max-h-[92vh] gap-0 overflow-y-auto rounded-3xl border-border/70 p-0 sm:max-w-2xl">
        {product && <ProductBody product={product} />}
      </DialogContent>
    </Dialog>
  );

  function ProductBody({ product }: { product: Product }) {
    return (
      <div className="grid md:grid-cols-2">
        {/* Visual side */}
        <div
          className="relative flex min-h-56 items-center justify-center py-8 md:rounded-l-3xl"
          style={{ backgroundColor: product.colors.tint }}
        >
          {product.badge && (
            <span
              className={cn(
                "absolute left-4 top-4 rounded-full px-2.5 py-1 text-[11px] font-semibold",
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
            className="h-56 w-auto drop-shadow-lg md:h-72"
          />
        </div>

        {/* Details side */}
        <div className="flex flex-col gap-5 p-6">
          <div>
            <div className="flex items-center gap-2">
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
                {product.rating.toFixed(1)} · {product.reviews} reviews
              </span>
            </div>
            <DialogTitle className="mt-2 font-display text-xl font-bold leading-snug text-ink">
              {product.name}
            </DialogTitle>
            <DialogDescription className="mt-1 text-sm leading-relaxed">
              {product.description}
            </DialogDescription>
            <p className="mt-3 font-display text-2xl font-bold text-foreground">
              {formatPrice(product.price)}
            </p>
          </div>

          {/* Options */}
          <OptionRow
            label="Sweetness"
            options={[...SWEETNESS_LEVELS]}
            value={sweetness}
            onChange={setSweetness}
          />
          <OptionRow
            label="Ice"
            options={[...ICE_LEVELS]}
            value={ice}
            onChange={setIce}
          />

          {/* Ingredients */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Ingredients
            </p>
            <ul className="mt-2 space-y-1.5">
              {product.ingredients.map((ing) => (
                <li
                  key={ing}
                  className="flex items-center gap-2 text-sm text-foreground/85"
                >
                  <Check className="size-3.5 text-matcha" />
                  {ing}
                </li>
              ))}
            </ul>
          </div>

          {/* Nutrition */}
          <div className="grid grid-cols-4 gap-2">
            {(
              [
                ["Energy", product.nutrition.energy],
                ["Sugar", product.nutrition.sugar],
                ["Protein", product.nutrition.protein],
                ["Fat", product.nutrition.fat],
              ] as const
            ).map(([label, value]) => (
              <div
                key={label}
                className="rounded-xl bg-muted px-2 py-2.5 text-center"
              >
                <p className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                  {label}
                </p>
                <p className="mt-0.5 text-xs font-semibold text-foreground">
                  {value}
                </p>
              </div>
            ))}
          </div>

          {/* Quantity + add */}
          <div className="mt-auto flex items-center gap-3">
            <div className="flex items-center rounded-full border border-border bg-card">
              <button
                type="button"
                aria-label="Decrease quantity"
                className="grid size-10 place-items-center rounded-l-full text-muted-foreground hover:text-foreground disabled:opacity-40"
                disabled={qty <= 1}
                onClick={() => setQty((q) => Math.max(1, q - 1) as 1 | 2 | 3)}
              >
                <Minus className="size-4" />
              </button>
              <span className="w-8 text-center font-display text-sm font-bold">
                {qty}
              </span>
              <button
                type="button"
                aria-label="Increase quantity"
                className="grid size-10 place-items-center rounded-r-full text-muted-foreground hover:text-foreground disabled:opacity-40"
                disabled={qty >= 3}
                onClick={() => setQty((q) => Math.min(3, q + 1) as 1 | 2 | 3)}
              >
                <Plus className="size-4" />
              </button>
            </div>
            <Button
              className="h-10 flex-1 rounded-full font-semibold"
              onClick={handleAdd}
            >
              {added ? (
                <span className="inline-flex items-center gap-2">
                  <Check className="size-4" /> Added!
                </span>
              ) : (
                `Add ${qty} · ${formatPrice(product.price * qty)}`
              )}
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

function OptionRow({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {options.map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            className={cn(
              "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
              value === opt
                ? "border-matcha bg-matcha-soft text-matcha-ink"
                : "border-border bg-card text-muted-foreground hover:border-matcha/50 hover:text-foreground",
            )}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}
