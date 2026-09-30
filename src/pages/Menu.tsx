import { useMemo, useState } from "react";
import { useSearchParams } from "react-router";
import { Search, SlidersHorizontal } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { ProductDialog } from "@/components/ProductDialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CATEGORY_LABELS,
  products,
  type Category,
} from "@/data/products";
import { cn } from "@/lib/utils";

const FILTERS: { value: Category | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "matcha", label: CATEGORY_LABELS.matcha },
  { value: "chocolate", label: CATEGORY_LABELS.chocolate },
  { value: "milktea", label: CATEGORY_LABELS.milktea },
];

type SortKey = "popular" | "price-asc" | "price-desc" | "rating";

export default function Menu() {
  const [params, setParams] = useSearchParams();
  const query = params.get("q") ?? "";
  const [sort, setSort] = useState<SortKey>("popular");

  const setQuery = (next: string) => {
    const p = new URLSearchParams(params);
    if (next) p.set("q", next);
    else p.delete("q");
    setParams(p, { replace: true });
  };

  const filtered = useMemo(() => {
    const cat = (params.get("cat") ?? "all") as Category | "all";
    let list = [...products];
    if (cat !== "all") list = list.filter((p) => p.category === cat);
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.tagline.toLowerCase().includes(q) ||
          p.ingredients.join(" ").toLowerCase().includes(q),
      );
    }
    switch (sort) {
      case "price-asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        list.sort((a, b) => b.rating - a.rating);
        break;
      default:
        list.sort((a, b) => b.popularity - a.popularity);
    }
    return list;
  }, [params, query, sort]);

  const setCat = (cat: Category | "all") => {
    const p = new URLSearchParams(params);
    if (cat === "all") p.delete("cat");
    else p.set("cat", cat);
    setParams(p, { replace: true });
  };

  const cat = (params.get("cat") ?? "all") as Category | "all";

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 md:py-14">
        {/* Heading */}
        <div className="max-w-xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-matcha-ink">
            The Menu
          </p>
          <h1 className="mt-3 font-display text-3xl font-bold text-ink sm:text-4xl">
            Small batches, bottled fresh
          </h1>
          <p className="mt-3 text-muted-foreground">
            Six drinks, brewed properly. Filter by craving, then customise
            sweetness and ice before it hits the cart.
          </p>
        </div>

        {/* Controls */}
        <div className="mt-8 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          {/* Filter pills */}
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((f) => (
              <button
                key={f.value}
                type="button"
                onClick={() => setCat(f.value)}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm font-medium transition-all",
                  cat === f.value
                    ? "border-primary bg-primary text-primary-foreground shadow-soft"
                    : "border-border bg-card text-muted-foreground hover:border-matcha/50 hover:text-foreground",
                )}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="flex gap-2">
            {/* Search */}
            <div className="relative flex-1 md:w-56">
              <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search drinks…"
                className="h-10 rounded-full bg-card pl-9"
              />
            </div>
            {/* Sort */}
            <Select value={sort} onValueChange={(v) => setSort(v as SortKey)}>
              <SelectTrigger className="h-10 w-[170px] rounded-full bg-card">
                <span className="flex items-center gap-2">
                  <SlidersHorizontal className="size-4 text-muted-foreground" />
                  <SelectValue />
                </span>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
                <SelectItem value="rating">Top Rated</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="mt-16 rounded-2xl border border-dashed border-border bg-card/60 p-12 text-center">
            <p className="font-display text-lg font-semibold text-ink">
              Nothing matches “{query}”
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Try “matcha”, “boba” or “cacao”.
            </p>
          </div>
        ) : (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </main>

      <ProductDialog />
      <Footer />
    </div>
  );
}
