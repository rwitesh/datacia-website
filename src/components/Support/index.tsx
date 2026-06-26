import { motion } from "framer-motion";
import { Mail } from "lucide-react";

const SupportSection = () => {
  return (
    <section id="support" className="py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="mb-4 inline-block rounded-full border border-primary/20 bg-primary/5 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-primary">
            Support
          </span>
          <h2 className="mb-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Questions? We&rsquo;re here to help.
          </h2>
          <p className="mb-8 text-muted-foreground leading-relaxed">
            For any query or support, just send an email and we&rsquo;ll get
            back to you as soon as we can.
          </p>
          <a
            href="mailto:rwiteshbera@gmail.com"
            className="inline-flex items-center gap-2 rounded-lg border border-border/40 bg-foreground/10 px-6 py-3 font-mono text-sm text-foreground transition-colors hover:border-primary/40 hover:text-primary"
          >
            <Mail className="h-4 w-4 text-primary" />
            rwiteshbera@gmail.com
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default SupportSection;
