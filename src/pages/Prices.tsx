import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Minus, ArrowRight, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import { NavBar } from "@/components/NavBar";
import SupportSection from "@/components/Support";
import Footer from "@/components/Footer";

const PRICING = {
  pro: { monthly: 6, yearly: 4 },
  premium: { monthly: 12, yearly: 8},
} as const;

const PLANS = [
  {
    name: "Community",
    tagline: "For personal use and exploration",
    cta: "Download Free",
    href: { monthly: "/download", yearly: "/download" },
    free: true,
    licenseText: null,
  },
  {
    name: "Pro",
    tagline: "",
    cta: "Get Pro",
    href: {
      monthly:
        "https://datacia.lemonsqueezy.com/checkout/buy/c2467147-8525-447c-a5fb-dabdba23582a?enabled=1401387%2C1401388",
      yearly: "https://datacia.lemonsqueezy.com/checkout/buy/402326ab-080a-4628-9b17-d5ba21246af1?enabled=1401387%2C1401388",
    },
    free: false,
    licenseText: "All features • 1 device licensing",
  },
  {
    name: "Premium",
    tagline: "",
    cta: "Get Premium",
    href: {
      monthly: "https://datacia.lemonsqueezy.com/checkout/buy/bf502942-4fd3-4843-a100-165bd44add7f?enabled=1401390%2C1401395",
      yearly: "https://datacia.lemonsqueezy.com/checkout/buy/8dcefe4c-0a61-4bcf-ac12-652d5ee80704?enabled=1401390%2C1401395",
    },
    free: false,
    licenseText: "All Pro features • 3 device licensing",
  },
] as const;

const FEATURES = [
  {
    feature: "Inline Ghost suggestions",
    community: false,
    pro: true,
    premium: true,
  },
  {
    feature: "Saved database connections",
    community: "Up to 2",
    pro: "Unlimited",
    premium: "Unlimited",
  },
  {
    feature: "Query history retention",
    community: "1 day",
    pro: "1 year",
    premium: "1 year",
  },
  { feature: "Data view", community: false, pro: true, premium: true },
  { feature: "Data export tools", community: false, pro: true, premium: true },
  {
    feature: "Built-in AI chat assistant",
    community: true,
    pro: true,
    premium: true,
  },
  {
    feature: "Priority customer support",
    community: false,
    pro: true,
    premium: true,
  },
  {
    feature: "Device activation",
    community: "—",
    pro: "1 device",
    premium: "3 devices",
  },
];

const toggleClass =
  "rounded-lg border-0 bg-transparent text-card-foreground hover:bg-muted hover:text-card-foreground data-[state=on]:bg-primary data-[state=on]:text-primary-foreground data-[state=on]:hover:bg-primary/90 data-[state=on]:hover:text-primary-foreground";

export default function PricingPage() {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");
  const getPrice = (plan: "pro" | "premium") =>
    billing === "monthly" ? PRICING[plan].monthly : PRICING[plan].yearly;

  const scrollToSupport = () => {
    document
      .getElementById("support")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Simple, fair pricing.
            </h1>
            <p className="mt-4 text-muted-foreground">
              Start free. Upgrade when you need more.
            </p>
            <div className="mt-8 inline-flex rounded-xl border border-border/40 bg-card p-1 shadow-sm">
              <Toggle
                variant="outline"
                pressed={billing === "monthly"}
                onPressedChange={() => setBilling("monthly")}
                className={toggleClass}
                aria-label="Monthly"
              >
                Monthly
              </Toggle>
              <Toggle
                variant="outline"
                pressed={billing === "yearly"}
                onPressedChange={() => setBilling("yearly")}
                className={toggleClass}
                aria-label="Yearly"
              >
                Yearly
              </Toggle>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mx-auto max-w-5xl grid gap-6 md:grid-cols-3 mb-20"
          >
            {PLANS.map((plan) => {
              const perMonth =
                plan.name === "Pro"
                  ? getPrice("pro")
                  : plan.name === "Premium"
                    ? getPrice("premium")
                    : 0;
              const yearlyTotal = perMonth * 12;
              const href = plan.href[billing];
              const isExternal = href.startsWith("http");

              return (
                <div
                  key={plan.name}
                  className="rounded-xl border-2 border-primary/40 bg-card p-8 flex flex-col"
                >
                  <h2 className="font-mono text-lg font-semibold text-card-foreground">
                    {plan.name}
                  </h2>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {plan.tagline}
                  </p>
                  {plan.licenseText && (
                    <p className="mt-2 text-xs font-medium text-primary">
                      {plan.licenseText}
                    </p>
                  )}
                  <div className="mt-6 mb-6 min-h-[3.5rem] space-y-1">
                    {plan.free ? (
                      <>
                        <span className="font-mono text-3xl font-bold text-card-foreground">
                          Free
                        </span>
                        <p className="text-sm text-muted-foreground">
                          No credit card required
                        </p>
                      </>
                    ) : (
                      <>
                        <span className="font-mono text-3xl font-bold text-card-foreground">
                          {perMonth > 0 ? `$${perMonth}` : "—"}
                          <span className="text-lg font-medium text-muted-foreground">
                            /month
                          </span>
                        </span>
                        <p className="text-sm text-muted-foreground min-h-[1.25rem]">
                          {billing === "yearly"
                            ? `Billed $${yearlyTotal} yearly`
                            : "\u00A0"}
                        </p>
                      </>
                    )}
                  </div>
                  <div className="mt-auto">
                    <a
                      href={href}
                      target={isExternal ? "_blank" : "_self"}
                      rel={isExternal ? "noopener noreferrer" : undefined}
                    >
                      <Button
                        className="w-full gap-2 font-mono text-xs cursor-pointer"
                        variant="default"
                      >
                        {plan.cta}
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Button>
                    </a>
                  </div>
                </div>
              );
            })}
          </motion.div>

          <div className="mb-20 flex justify-center">
            <Button
              variant="outline"
              onClick={scrollToSupport}
              className="gap-2 font-mono text-xs cursor-pointer"
            >
              <Mail className="h-4 w-4 text-primary" />
              Contact Support
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto max-w-4xl"
          >
            <h2 className="mb-8 text-center font-mono text-xl font-bold text-foreground">
              Feature comparison
            </h2>
            <div className="rounded-xl border border-border/40 bg-card overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/30">
                    <th className="px-6 py-4 text-left text-xs font-mono text-muted-foreground uppercase tracking-wider">
                      Feature
                    </th>
                    <th className="px-6 py-4 text-center text-xs font-mono text-muted-foreground uppercase tracking-wider">
                      Community
                    </th>
                    <th className="px-6 py-4 text-center text-xs font-mono text-primary uppercase tracking-wider">
                      Pro
                    </th>
                    <th className="px-6 py-4 text-center text-xs font-mono text-primary uppercase tracking-wider">
                      Premium
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {FEATURES.map((row, i) => (
                    <tr
                      key={row.feature}
                      className={
                        i < FEATURES.length - 1
                          ? "border-b border-border/20"
                          : ""
                      }
                    >
                      <td className="px-6 py-3 text-sm text-card-foreground">
                        {row.feature}
                      </td>
                      <td className="px-6 py-3 text-center">
                        {typeof row.community === "string" ? (
                          <span className="text-sm text-muted-foreground">
                            {row.community}
                          </span>
                        ) : row.community ? (
                          <Check className="mx-auto h-4 w-4 text-primary" />
                        ) : (
                          <Minus className="mx-auto h-4 w-4 text-muted-foreground/40" />
                        )}
                      </td>
                      <td className="px-6 py-3 text-center">
                        {typeof row.pro === "string" ? (
                          <span className="text-sm text-muted-foreground">
                            {row.pro}
                          </span>
                        ) : row.pro ? (
                          <Check className="mx-auto h-4 w-4 text-primary" />
                        ) : (
                          <Minus className="mx-auto h-4 w-4 text-muted-foreground/40" />
                        )}
                      </td>
                      <td className="px-6 py-3 text-center">
                        {typeof row.premium === "string" ? (
                          <span className="text-sm text-muted-foreground">
                            {row.premium}
                          </span>
                        ) : row.premium ? (
                          <Check className="mx-auto h-4 w-4 text-primary" />
                        ) : (
                          <Minus className="mx-auto h-4 w-4 text-muted-foreground/40" />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </main>
      <SupportSection />
      <Footer />
    </div>
  );
}
