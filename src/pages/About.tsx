import { motion } from "framer-motion";
import { Leaf, Recycle, Sparkles, Star } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: "easeOut" },
} as const;

const VALUES = [
  {
    icon: Leaf,
    title: "Pure Ingredients",
    body: "Ceremonial matcha whisked to order, single-origin cacao stone-ground in-house, milk from dairies we can name.",
    cls: "border-matcha/25 bg-matcha-soft/60 text-matcha-ink",
  },
  {
    icon: Recycle,
    title: "Sustainable Sourcing",
    body: "Uji farms paid above market rate, cacao from certified co-ops, bottles you can return for a deposit.",
    cls: "border-tea/50 bg-tea-soft/70 text-tea-ink",
  },
  {
    icon: Sparkles,
    title: "Premium Experience",
    body: "Small batches, quiet packaging, and drinks balanced for depth first — sweetness is never the headline.",
    cls: "border-cocoa/25 bg-cocoa-soft/60 text-cocoa-ink",
  },
];

const TIMELINE = [
  {
    year: "2022",
    title: "A whisk and a question",
    body: "Lira starts as a weekend stall question: why can't bottled matcha taste like it was just whisked?",
  },
  {
    year: "2023",
    title: "Sapa Market weekends",
    body: "The first stall opens. Roasted oolong joins the lineup and sells out by noon, every week.",
  },
  {
    year: "2024",
    title: "Cacao, done properly",
    body: "We begin stone-grinding Belgian cacao in-house — the dark blend becomes a limited-run favourite.",
  },
  {
    year: "2026",
    title: "Small batches, wider reach",
    body: "Weekend pre-orders go online. Same six recipes, same slow process, more fridges.",
  },
];

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        {/* Intro */}
        <section className="border-b border-border/60 bg-gradient-to-b from-tea-soft/60 to-background">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
            <motion.div {...fadeUp} className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cocoa">
                About Lira
              </p>
              <h1 className="mt-3 font-display text-4xl font-bold text-ink sm:text-5xl">
                Craft first, everything else after.
              </h1>
              <p className="mt-5 text-base leading-relaxed text-muted-foreground">
                Lira began with a whisk and a stubborn belief: a bottled drink
                can taste as considered as one made in front of you. We brew
                tea slowly, grind cacao in-house, and sweeten only as much as
                each drink asks for.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Craft story */}
        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <motion.div {...fadeUp}>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-matcha-ink">
                The Craft
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold text-ink">
                Tea brewed slowly. Cacao chosen carefully.
              </h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                Our oolong is charcoal-roasted the traditional way, then
                steeped in small kettles rather than urns. Matcha is first-harvest
                and whisked to order — you can taste the difference foam makes.
              </p>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                On the chocolate side, we work with a single Belgian cacao,
                cracked and stone-ground each week. It lands bittersweet, the
                way dark chocolate should.
              </p>
            </motion.div>
            <motion.div
              {...fadeUp}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { label: "First-harvest matcha", tint: "bg-matcha-soft text-matcha-ink" },
                { label: "Charcoal-roast oolong", tint: "bg-tea-soft text-tea-ink" },
                { label: "72% Belgian cacao", tint: "bg-cocoa-soft text-cocoa-ink" },
                { label: "Fresh local milk", tint: "bg-card border border-border" },
              ].map((c) => (
                <div
                  key={c.label}
                  className={`grid aspect-square place-items-center rounded-2xl p-4 text-center font-display text-sm font-semibold shadow-soft ${c.tint}`}
                >
                  {c.label}
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Values */}
        <section className="bg-tea-soft/50 py-16 md:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <motion.div {...fadeUp} className="mx-auto max-w-2xl text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-tea-ink">
                Brand Values
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold text-ink sm:text-4xl">
                What we hold to
              </h2>
            </motion.div>
            <div className="mt-12 grid gap-4 md:grid-cols-3">
              {VALUES.map((v, i) => (
                <motion.div
                  key={v.title}
                  {...fadeUp}
                  transition={{ ...fadeUp.transition, delay: i * 0.1 }}
                  className={`rounded-2xl border p-6 shadow-soft transition-transform duration-300 hover:-translate-y-1 ${v.cls}`}
                >
                  <span className="grid size-11 place-items-center rounded-full bg-card shadow-soft">
                    <v.icon className="size-5 text-primary" />
                  </span>
                  <h3 className="mt-4 font-display text-lg font-semibold text-ink">
                    {v.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/75">
                    {v.body}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 md:py-20">
          <motion.div {...fadeUp} className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cocoa">
              The Story So Far
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold text-ink">
              Four years, one whisk
            </h2>
          </motion.div>

          <ol className="relative mt-12 space-y-10 border-l border-matcha/30 pl-8">
            {TIMELINE.map((t, i) => (
              <motion.li
                key={t.year}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: i * 0.08 }}
                className="relative"
              >
                <span className="absolute -left-[41px] grid size-6 place-items-center rounded-full border border-matcha/40 bg-card">
                  <span className="size-2 rounded-full bg-primary" />
                </span>
                <p className="font-display text-sm font-bold text-primary">
                  {t.year}
                </p>
                <h3 className="mt-1 font-display text-lg font-semibold text-ink">
                  {t.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {t.body}
                </p>
              </motion.li>
            ))}
          </ol>
        </section>

        {/* CTA */}
        <section className="mx-auto max-w-6xl px-4 sm:px-6">
          <motion.div
            {...fadeUp}
            className="rounded-3xl border border-border/70 bg-card p-10 text-center shadow-soft"
          >
            <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">
              Taste what the fuss is about.
            </h2>
            <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
              Six drinks, each made in batches small enough to sign.
            </p>
            <Button asChild size="lg" className="mt-6 h-12 rounded-full px-8 font-semibold">
              <Link to="/menu">Explore the menu</Link>
            </Button>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

// Star icon kept for potential future use in ratings contexts
void Star;
