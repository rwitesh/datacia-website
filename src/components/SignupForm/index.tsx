import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check, Loader2, Users } from "lucide-react";
import { fetchWaitlistCount, submitWaitlist, WAITLIST_ID } from "@/lib/api";
import { validateEmail } from "@/lib/validation";

export default function SignupForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    let mounted = true;

    const fetchCount = async () => {
      try {
        const total = await fetchWaitlistCount(WAITLIST_ID);
        if (mounted && total !== null) {
          setCount(total);
        }
      } catch (e) {
        console.error("Background fetch failed", e);
      }
    };

    fetchCount();

    return () => {
      mounted = false;
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await validateEmail(email);
      await submitWaitlist(WAITLIST_ID, email, window.location.href);
      setSuccess(true);
      if (count !== null) setCount(count + 1);
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError("Failed to join. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto lg:mx-0">
      <AnimatePresence mode="wait">
        {success ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex flex-col items-center justify-center p-6 rounded-2xl bg-primary/10 border border-primary/20 text-primary"
          >
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-3">
              <Check className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold mb-1">You&apos;re on the list!</h3>
            <p className="text-primary/80 text-sm">We&apos;ll be in touch soon.</p>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            onSubmit={handleSubmit}
            className="flex flex-col gap-4"
          >
            <motion.a
              href="https://www.producthunt.com/products/datacia"
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center justify-center gap-2 self-center rounded-full bg-[#DA552F]/10 px-4 py-1 text-sm font-medium text-[#DA552F]"
            >
              <span className="h-2 w-2 rounded-full bg-[#DA552F]" />
              <span>Launching on Product Hunt · Mon, 16 March 2026</span>
            </motion.a>

            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-accent rounded-xl opacity-50 group-hover:opacity-75 transition duration-500 blur-sm" />
              <div className="relative flex flex-col sm:flex-row gap-2 p-2 bg-background/80 backdrop-blur-xl rounded-xl border border-border">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="flex-1 px-4 py-3 rounded-lg bg-transparent text-foreground placeholder-muted-foreground focus:outline-none focus:ring-0"
                  required
                  disabled={loading}
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 whitespace-nowrap disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      Join Waitlist <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </div>

            {error && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-destructive text-sm"
              >
                {error}
              </motion.p>
            )}

            {count !== null && count > 100 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center justify-center gap-2 text-muted-foreground text-sm"
              >
                <Users className="w-4 h-4" />
                <span>Join {count.toLocaleString()} others waiting</span>
              </motion.div>
            )}
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
