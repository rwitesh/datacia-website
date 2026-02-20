import { motion } from "framer-motion";
import {
  Code2,
  Search,
  Sparkles,
  Bot,
  Cpu,
  FileJson,
  FileSpreadsheet,
  Play,
  Ghost,
  WifiOff,
} from "lucide-react";
import queryImg from "@/assets/query.webp";
import ghostImg from "@/assets/ghost.webp";
import scriptImg from "@/assets/script.webp";
import exportImg from "@/assets/export.webp";

interface Feature {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

interface FeatureBlock {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  features: Feature[];
  mockup: React.ReactNode;
  reverse?: boolean;
}

const blocks: FeatureBlock[] = [
  {
    id: "features",
    badge: "Query & Workflow",
    title: "Built for speed.",
    subtitle:
      "A fast SQL editor with syntax highlighting, formatting, and execution.",
    features: [
      {
        icon: <Code2 className="h-4 w-4 text-primary" />,
        title: "SQL Editor",
        desc: "Syntax highlighting, formatting, run",
      },
      {
        icon: <Search className="h-4 w-4 text-primary" />,
        title: "Autocomplete",
        desc: "Suggestions as you type",
      },
    ],
    mockup: (
      <div className="rounded-lg border border-border/40 bg-foreground/10 p-2 overflow-hidden">
        <img
          src={queryImg}
          alt="SQL query editor"
          className="w-full rounded-md object-contain"
        />
      </div>
    ),
  },
  {
    id: "ghost",
    badge: "Inline Intelligence",
    title: "Suggestions that keep up with you.",
    subtitle:
      "Context-aware ghost text. Learns from your schema and what you type and works fully offline.",
    reverse: true,
    features: [
      {
        icon: <Ghost className="h-4 w-4 text-primary" />,
        title: "Context-aware",
        desc: "Learn as you type",
      },
      {
        icon: <WifiOff className="h-4 w-4 text-primary" />,
        title: "Works offline",
        desc: "Runs locally—no cloud or API required",
      },
    ],
    mockup: (
      <div className="rounded-lg border border-border/40 bg-foreground/10 p-2 overflow-hidden">
        <img
          src={ghostImg}
          alt="Inline ghost suggestions in the editor"
          className="w-full rounded-md object-contain"
        />
      </div>
    ),
  },
  {
    id: "script",
    badge: "Script Mode",
    title: "Run multiple statements in sequence.",
    subtitle:
      "Execute full scripts with one click. Statements run in order, one after another.",
    features: [
      {
        icon: <Play className="h-4 w-4 text-primary" />,
        title: "Run in sequence",
        desc: "Execute statements one after another",
      },
      {
        icon: <Cpu className="h-4 w-4 text-primary" />,
        title: "Batch execution",
        desc: "Run full scripts with one click",
      },
    ],
    mockup: (
      <div className="rounded-lg border border-border/40 bg-foreground/10 p-2 overflow-hidden">
        <img
          src={scriptImg}
          alt="Script mode"
          className="w-full rounded-md object-contain"
        />
      </div>
    ),
  },
  {
    id: "ai",
    badge: "AI-Powered",
    title: "AI for your database.",
    subtitle:
      "Write SQL, debug queries, and explore schemas in natural language.",
    reverse: true,
    features: [
      {
        icon: <Bot className="h-4 w-4 text-primary" />,
        title: "AI Chat",
        desc: "Generate SQL, fix issues, answer questions",
      },
      {
        icon: <Sparkles className="h-4 w-4 text-primary" />,
        title: "Bring Your Model",
        desc: "Your API keys, your models",
      },
    ],
    mockup: (
      <div className="bg-foreground/10 rounded-lg bg-card p-4 space-y-3">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="h-4 w-4 text-primary" />
          <span className="font-mono text-xs text-foreground">
            AI Assistant
          </span>
        </div>
        <div className="rounded bg-secondary/10 p-3 text-xs text-muted">
          Why is this query slow? Can you optimize it?
        </div>
        <div className="rounded bg-primary/5 border border-primary/10 p-3 text-xs text-foreground font-mono">
          <span className="text-muted-foreground">
            The query is missing an index on
          </span>{" "}
          <span className="text-primary">user_id</span>
          <span className="text-muted-foreground">. Try:</span>
          <br />
          <br />
          <span className="text-accent">CREATE INDEX</span> idx_orders_user
          <br />
          <span className="text-accent">ON</span> orders(user_id);
        </div>
      </div>
    ),
  },
  {
    id: "export",
    badge: "Data Export",
    title: "Export query results.",
    subtitle: "Data out in the format you need.",
    features: [
      {
        icon: <FileJson className="h-4 w-4 text-primary" />,
        title: "Instant copy",
        desc: "Copy as JSON, text, or PNG",
      },
      {
        icon: <FileSpreadsheet className="h-4 w-4 text-primary" />,
        title: "Export",
        desc: "Export as JSON, CSV, or PNG",
      },
    ],
    mockup: (
      <div className="rounded-lg border border-border/40 bg-foreground/10 p-2 overflow-hidden">
        <img
          src={exportImg}
          alt="Export results as PNG"
          className="w-full rounded-md object-contain"
        />
      </div>
    ),
  },
];

const FeaturesSection = () => {
  return (
    <div className="space-y-0 p-12" id="features">
      {blocks.map((block) => (
        <section key={block.id} id={block.id} className="py-6">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className={`grid items-center gap-16 lg:grid-cols-2 ${block.reverse ? "lg:direction-rtl" : ""}`}
              style={block.reverse ? { direction: "rtl" } : undefined}
            >
              <div style={{ direction: "ltr" }}>
                <span className="mb-4 inline-block rounded-full border border-primary/20 bg-primary/5 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-primary">
                  {block.badge}
                </span>
                <h2 className="mb-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  {block.title}
                </h2>
                <p className="mb-8 text-muted-foreground leading-relaxed">
                  {block.subtitle}
                </p>
                <div className="grid gap-4 sm:grid-cols-2">
                  {block.features.map((f) => (
                    <div
                      key={f.title}
                      className="flex gap-3 rounded-lg  bg-foreground/10 p-3"
                    >
                      <div className="mt-0.5">{f.icon}</div>
                      <div>
                        <div className="text-sm font-medium text-foreground">
                          {f.title}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {f.desc}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ direction: "ltr" }}>{block.mockup}</div>
            </motion.div>
          </div>
        </section>
      ))}
    </div>
  );
};

export default FeaturesSection;
