import { Link } from "react-router";
import { motion } from "framer-motion";
import { ArrowRight, Leaf, Sparkles, Star } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { Bottle } from "@/components/Bottle";
import { Button } from "@/components/ui/button";
import { products } from "@/data/products";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: "easeOut" },
} as const;

const TESTIMONIALS = [
  {
    quote:
      "The Uji matcha latte actually tastes like the tea — grassy, smooth, never sugary. I've stopped going anywhere else.",
    name: "Amara T.",
    detail: "Matcha regular",
    tint: "bg-matcha-soft text-matcha-ink",
  },
  {
    quote:
      "Brown sugar boba with the pearls still warm. You can taste that everything is made in small batches.",
    name: "Daniel R.",
    detail: "Boba devotee",
    tint: "bg-cocoa-soft text-cocoa-ink",
  },
  {
    quote:
      "That Belgian dark cacao is dangerously good — deep and bittersweet, like a dessert you can drink.",
    name: "Priya S.",
    detail: "Cacao first",
    tint: "bg-tea-soft text-tea-ink",
  },
];

export default function Home() {
  const featured = products.filter((p) => p.featured);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        {/* ---------- Hero ---------- */}
        <section className="relative overflow-hidden bg-gradient-to-b from-matcha-soft via-background to-background">
          {/* soft blobs */}
          <div className="pointer-events-none absolute -top-24 -right-24 size-72 rounded-full bg-matcha/15 blur-3xl" />
          <div className="pointer-events-none absolute top-40 -left-24 size-72 rounded-full bg-tea/30 blur-3xl" />

          <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 md:py-24">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <p className="inline-flex items-center gap-2 rounded-full border border-matcha/30 bg-card px-4 py-1.5 text-xs font-semibold tracking-wide text-matcha-ink">
                <Sparkles className="size-3.5" />
                Limited · Premium Drinks · Pure
              </p>
              <h1 className="mt-5 font-display text-4xl leading-[1.08] font-bold text-ink sm:text-5xl md:text-6xl">
                Slow-brewed,
                <br />
                <span className="text-primary">honestly good</span> drinks.
              </h1>
              <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground">
                Ceremonial matcha, charcoal-roast milk tea and stone-ground
                cacao — bottled in small batches with ingredients you can
                count.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button
                  asChild
                  size="lg"
                  className="h-12 rounded-full px-8 font-semibold shadow-soft"
                >
                  <Link to="/menu">
                    Explore Collection
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="h-12 rounded-full px-8 font-medium"
                >
                  <Link to="/about">Our Story</Link>
                </Button>
              </div>
              <div className="mt-8 flex items-center gap-3 text-sm text-muted-foreground">
                <span className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="size-4 fill-amber-400 text-amber-400" />
                  ))}
                </span>
                4.9 from 1,000+ sippers
              </div>
            </motion.div>

            {/* Hero bottles */}
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
              className="relative flex items-end justify-center gap-3 sm:gap-6"
            >
              {[
                products.find((p) => p.id === "roasted-oolong-milk-tea")!,
                products.find((p) => p.id === "uji-matcha-latte")!,
                products.find((p) => p.id === "belgian-dark-cacao")!,
              ].map((p, i) => (
                <motion.div
                  key={p.id}
                  animate={{ y: [0, -8, 0] }}
                  transition={{
                    duration: 4 + i,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.4,
                  }}
                  className="relative"
                >
                  <div
                    className="absolute inset-x-2 bottom-0 h-4 rounded-full bg-black/10 blur-md"
                    aria-hidden
                  />
                  <BottleFloating p={p} index={i} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ---------- Philosophy ---------- */}
        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
          <motion.div {...fadeUp} className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-matcha-ink">
              Our Philosophy
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold text-ink sm:text-4xl">
              Quality ingredients. Authentic taste. Premium balance.
            </h2>
            <p className="mt-4 text-muted-foreground">
              Every bottle starts with a leaf, a bean or a pearl — chosen
              slowly, prepared properly.
            </p>
          </motion.div>

          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            {[
              {
                icon: Leaf,
                title: "Pure Ingredients",
                body: "Ceremonial-grade matcha, single-origin cacao, fresh milk — no powders, no shortcuts.",
                cls: "border-matcha/25 bg-matcha-soft/60",
              },
              {
                icon: Sparkles,
                title: "Authentic Taste",
                body: "Teas brewed to order and whisked by hand, so every flavour lands exactly as intended.",
                cls: "border-tea/50 bg-tea-soft/70",
              },
              {
                icon: Star,
                title: "Premium Balance",
                body: "Sweetness tuned to the drink, not the syrup pump. Depth first, sugar last.",
                cls: "border-cocoa/25 bg-cocoa-soft/60",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: i * 0.1 }}
                className={`rounded-2xl border p-6 shadow-soft transition-transform duration-300 hover:-translate-y-1 ${item.cls}`}
              >
                <span className="grid size-11 place-items-center rounded-full bg-card shadow-soft">
                  <item.icon className="size-5 text-primary" />
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold text-ink">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.body}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ---------- Featured drinks ---------- */}
        <section className="bg-tea-soft/50 py-16 md:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <motion.div {...fadeUp} className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-tea-ink">
                  This Week's Picks
                </p>
                <h2 className="mt-3 font-display text-3xl font-bold text-ink sm:text-4xl">
                  Featured drinks
                </h2>
              </div>
              <Button asChild variant="outline" className="rounded-full">
                <Link to="/menu">
                  View full menu <ArrowRight className="size-4" />
                </Link>
              </Button>
            </motion.div>

            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {featured.slice(0, 6).map((p, i) => (
                <motion.div
                  key={p.id}
                  {...fadeUp}
                  transition={{ ...fadeUp.transition, delay: (i % 3) * 0.08 }}
                >
                  <ProductCard product={p} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- Testimonials ---------- */}
        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
          <motion.div {...fadeUp} className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cocoa">
              Loved by locals
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold text-ink sm:text-4xl">
              What people are saying
            </h2>
          </motion.div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {TESTIMONIALS.map((t, i) => (
              <motion.figure
                key={t.name}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: i * 0.1 }}
                className="flex flex-col gap-4 rounded-2xl border border-border/70 bg-card p-6 shadow-soft"
              >
                <span className="flex">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} className="size-4 fill-amber-400 text-amber-400" />
                  ))}
                </span>
                <blockquote className="text-sm leading-relaxed text-foreground/85">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-auto flex items-center gap-3">
                  <span
                    className={`grid size-9 place-items-center rounded-full font-display text-sm font-bold ${t.tint}`}
                  >
                    {t.name[0]}
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-ink">
                      {t.name}
                    </span>
                    <span className="block text-xs text-muted-foreground">
                      {t.detail}
                    </span>
                  </span>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </section>

        {/* ---------- CTA banner ---------- */}
        <section className="mx-auto max-w-6xl px-4 sm:px-6">
          <motion.div
            {...fadeUp}
            className="relative overflow-hidden rounded-3xl bg-primary px-6 py-14 text-center shadow-soft sm:px-12"
          >
            <div className="pointer-events-none absolute -top-16 -right-16 size-48 rounded-full bg-white/10 blur-2xl" />
            <div className="pointer-events-none absolute -bottom-20 -left-10 size-56 rounded-full bg-black/10 blur-2xl" />
            <h2 className="font-display text-3xl font-bold text-primary-foreground sm:text-4xl">
              Catch it while it lasts.
            </h2>
            <p className="mx-auto mt-3 max-w-md text-primary-foreground/85">
              Small batches sell out. Find us at Sapa Market or pre-order for
              the weekend.
            </p>
            <Button
              asChild
              size="lg"
              className="mt-7 h-12 rounded-full bg-card px-8 font-semibold text-ink hover:bg-card/90"
            >
              <Link to="/menu">Shop the menu</Link>
            </Button>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

/** Floating hero bottle with its own colored halo */
function BottleFloating({
  p,
  index,
}: {
  p: (typeof products)[number];
  index: number;
}) {
  return (
    <div
      className="rounded-3xl p-4 shadow-soft sm:p-6"
      style={{ backgroundColor: p.colors.tint, zIndex: 3 - index }}
    >
      <Bottle
        colors={p.colors}
        className="h-44 w-auto drop-shadow-md sm:h-56"
      />
    </div>
  );
}
