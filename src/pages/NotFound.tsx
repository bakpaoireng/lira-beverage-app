import { motion } from "framer-motion";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center"
    >
      <p className="font-display text-6xl font-bold text-primary">404</p>
      <p className="mt-4 font-display text-xl font-semibold text-ink">
        This page steeped a little too long.
      </p>
      <p className="mt-2 max-w-sm text-sm text-muted-foreground">
        The page you're looking for doesn't exist — but the menu is right
        where you left it.
      </p>
      <Button asChild className="mt-6 h-11 rounded-full px-6 font-semibold">
        <Link to="/">Back to Lira</Link>
      </Button>
    </motion.div>
  );
}
