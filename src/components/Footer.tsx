import { useState } from "react";
import { Link } from "react-router";
import { Instagram, Twitter, Facebook, Send, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const subscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail("");
  };

  return (
    <footer className="mt-24 border-t border-border/70 bg-cream">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr]">
        {/* Newsletter */}
        <div>
          <div className="flex items-center gap-2">
            <span className="grid size-9 place-items-center rounded-full bg-primary font-display text-lg font-bold italic text-primary-foreground">
              L
            </span>
            <span className="font-display text-xl font-bold text-ink">Lira</span>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
            Slow-brewed drinks, honest ingredients. Join the list for seasonal
            drops and quiet mornings.
          </p>
          {subscribed ? (
            <p className="mt-5 inline-flex items-center gap-2 rounded-full bg-matcha-soft px-4 py-2 text-sm font-medium text-matcha-ink">
              <Check className="size-4" /> You're on the list. Welcome to Lira.
            </p>
          ) : (
            <form onSubmit={subscribe} className="mt-5 flex max-w-sm gap-2">
              <Input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="h-10 rounded-full bg-card"
              />
              <Button type="submit" size="icon" className="size-10 shrink-0 rounded-full" aria-label="Subscribe">
                <Send className="size-4" />
              </Button>
            </form>
          )}
          <div className="mt-6 flex gap-2">
            {[
              { icon: Instagram, label: "Instagram" },
              { icon: Twitter, label: "Twitter" },
              { icon: Facebook, label: "Facebook" },
            ].map(({ icon: Icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="grid size-9 place-items-center rounded-full border border-border bg-card text-muted-foreground transition-colors hover:border-matcha hover:text-matcha-ink"
              >
                <Icon className="size-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Links */}
        <div className="text-sm">
          <p className="font-display text-sm font-semibold text-ink">Explore</p>
          <ul className="mt-4 space-y-2.5 text-muted-foreground">
            <li><Link to="/" className="hover:text-foreground">Home</Link></li>
            <li><Link to="/menu" className="hover:text-foreground">Menu</Link></li>
            <li><Link to="/about" className="hover:text-foreground">About Us</Link></li>
          </ul>
        </div>
        <div className="text-sm">
          <p className="font-display text-sm font-semibold text-ink">Visit</p>
          <ul className="mt-4 space-y-2.5 text-muted-foreground">
            <li>Sapa Market — weekends</li>
            <li>Weekend pre-orders via DM</li>
            <li>hello@drinklira.com</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60 py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Lira · Limited · Premium Drinks · Pure
      </div>
    </footer>
  );
}
