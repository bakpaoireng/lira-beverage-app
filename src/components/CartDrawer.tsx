import { useState } from "react";
import { Check, Minus, Plus, ShoppingBag, Tag, Trash2, X } from "lucide-react";
import { Bottle } from "@/components/Bottle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { getProduct, formatPrice, CATEGORY_LABELS } from "@/data/products";
import { useCart, itemKey } from "@/cart/CartContext";
import { cn } from "@/lib/utils";

const CATEGORY_DOT: Record<string, string> = {
  matcha: "bg-matcha",
  chocolate: "bg-cocoa",
  milktea: "bg-tea-ink",
};

export function CartDrawer() {
  const {
    items,
    isCartOpen,
    closeCart,
    removeItem,
    clearCart,
    addItem,
    subtotal,
    discount,
    total,
    promo,
    applyPromo,
    clearPromo,
    itemKey: keyOf,
  } = useCart();
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [checkedOut, setCheckedOut] = useState(false);

  const submitPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;
    if (applyPromo(code)) {
      setError(null);
      setCode("");
    } else {
      setError("That code isn't valid. Try LIRA10.");
    }
  };

  const checkout = () => {
    setCheckedOut(true);
    window.setTimeout(() => {
      clearCart();
      setCheckedOut(false);
      closeCart();
    }, 1800);
  };

  return (
    <Sheet open={isCartOpen} onOpenChange={(open) => !open && closeCart()}>
      <SheetContent side="right" className="flex w-full flex-col gap-0 bg-cream sm:max-w-md">
        <SheetHeader className="border-b border-border/60 pb-4">
          <SheetTitle className="flex items-center gap-2 font-display text-lg font-bold text-ink">
            <ShoppingBag className="size-5 text-primary" />
            Your Cart
            {items.length > 0 && (
              <span className="ml-auto rounded-full bg-matcha-soft px-2.5 py-0.5 text-xs font-semibold text-matcha-ink">
                {items.reduce((n, it) => n + it.qty, 0)} items
              </span>
            )}
          </SheetTitle>
          <SheetDescription className="sr-only">
            Review your cart, apply promo codes and checkout.
          </SheetDescription>
        </SheetHeader>

        {checkedOut ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 p-8 text-center">
            <span className="grid size-14 place-items-center rounded-full bg-matcha-soft">
              <Check className="size-7 text-matcha-ink" />
            </span>
            <p className="font-display text-lg font-bold text-ink">
              Order placed — see you at pickup!
            </p>
            <p className="text-sm text-muted-foreground">
              This is a demo checkout. No payment was taken.
            </p>
          </div>
        ) : items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 p-8 text-center">
            <span className="grid size-14 place-items-center rounded-full bg-accent">
              <ShoppingBag className="size-6 text-muted-foreground" />
            </span>
            <p className="font-display text-base font-semibold text-ink">
              Your cart is empty
            </p>
            <p className="text-sm text-muted-foreground">
              Add a drink from the menu to get started.
            </p>
            <Button className="mt-2 rounded-full" onClick={closeCart}>
              Browse the menu
            </Button>
          </div>
        ) : (
          <>
            {/* Items */}
            <div className="flex-1 space-y-3 overflow-y-auto p-4">
              {items.map((item) => {
                const product = getProduct(item.productId);
                const key = keyOf(item);
                return (
                  <div
                    key={key}
                    className="flex gap-3 rounded-2xl border border-border/60 bg-card p-3 shadow-soft"
                  >
                    <div
                      className="grid size-16 shrink-0 place-items-center rounded-xl"
                      style={{ backgroundColor: product?.colors.tint ?? "#f3eee2" }}
                    >
                      {product && (
                        <Bottle colors={product.colors} className="h-12 w-auto" />
                      )}
                    </div>
                    <div className="flex min-w-0 flex-1 flex-col">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <p className="truncate font-display text-sm font-semibold text-ink">
                            {item.shortName}
                          </p>
                          <p className="mt-0.5 flex items-center gap-1.5 text-[11px] text-muted-foreground">
                            <span
                              className={cn(
                                "size-1.5 rounded-full",
                                CATEGORY_DOT[item.category],
                              )}
                            />
                            {CATEGORY_LABELS[item.category]} · {item.sweetness} ·{" "}
                            {item.ice}
                          </p>
                        </div>
                        <button
                          type="button"
                          aria-label={`Remove ${item.shortName}`}
                          onClick={() => removeItem(key)}
                          className="text-muted-foreground transition-colors hover:text-destructive"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </div>
                      <div className="mt-2 flex items-center justify-between">
                        <div className="flex items-center rounded-full border border-border">
                          <button
                            type="button"
                            aria-label="Decrease quantity"
                            className="grid size-7 place-items-center rounded-l-full text-muted-foreground hover:text-foreground"
                            onClick={() => {
                              if (item.qty === 1) removeItem(key);
                            }}
                            disabled={item.qty === 1}
                          >
                            <Minus className="size-3.5" />
                          </button>
                          <span className="w-6 text-center text-xs font-bold">
                            {item.qty}
                          </span>
                          <button
                            type="button"
                            aria-label="Increase quantity"
                            className="grid size-7 place-items-center rounded-r-full text-muted-foreground hover:text-foreground disabled:opacity-40"
                            disabled={item.qty >= 3}
                            onClick={() =>
                              addItem({
                                productId: item.productId,
                                unitPrice: item.unitPrice,
                                qty: 1,
                                sweetness: item.sweetness,
                                ice: item.ice,
                              })
                            }
                          >
                            <Plus className="size-3.5" />
                          </button>
                        </div>
                        <span className="font-display text-sm font-bold text-foreground">
                          {formatPrice(item.unitPrice * item.qty)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
              <button
                type="button"
                onClick={clearCart}
                className="mx-auto block text-xs text-muted-foreground underline-offset-2 hover:text-destructive hover:underline"
              >
                Clear cart
              </button>
            </div>

            {/* Summary */}
            <div className="space-y-3 border-t border-border/60 bg-cream p-4">
              {/* Promo */}
              {promo ? (
                <div className="flex items-center justify-between rounded-full bg-matcha-soft px-4 py-2 text-sm font-medium text-matcha-ink">
                  <span className="inline-flex items-center gap-2">
                    <Tag className="size-3.5" /> {promo} applied
                  </span>
                  <button
                    type="button"
                    onClick={clearPromo}
                    aria-label="Remove promo code"
                    className="text-matcha-ink/70 hover:text-matcha-ink"
                  >
                    <X className="size-4" />
                  </button>
                </div>
              ) : (
                <form onSubmit={submitPromo} className="flex gap-2">
                  <Input
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="Promo code (try LIRA10)"
                    className="h-9 rounded-full bg-card text-sm"
                  />
                  <Button type="submit" variant="outline" className="rounded-full">
                    Apply
                  </Button>
                </form>
              )}
              {error && <p className="text-xs text-destructive">{error}</p>}

              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between font-medium text-matcha-ink">
                    <span>Discount</span>
                    <span>−{formatPrice(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between border-t border-border/60 pt-2 font-display text-base font-bold text-ink">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>

              <Button
                className="h-11 w-full rounded-full font-semibold"
                onClick={checkout}
              >
                Checkout · {formatPrice(total)}
              </Button>
              <p className="text-center text-[11px] text-muted-foreground">
                Demo checkout — no payment is taken.
              </p>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
