import { motion } from "motion/react";
import clickhouseImg from "@/assets/clickhouse.webp";
import mysqlImg from "@/assets/mysql.webp";
import postgresImg from "@/assets/postgres.webp";
import sqliteImg from "@/assets/sqlite.webp";
import { EASE_APPLE } from "@/components/motion/reveal";
import { Container } from "@/components/ui/container";

const ENGINES = [
  { name: "PostgreSQL", src: postgresImg },
  { name: "MySQL", src: mysqlImg },
  { name: "SQLite", src: sqliteImg },
  { name: "ClickHouse", src: clickhouseImg },
];

export function EngineStrip() {
  return (
    <section aria-labelledby="engines-title" className="border-y border-line bg-surface/40 py-14">
      <Container>
        <p id="engines-title" className="text-center text-[13px] text-subtle-foreground">
          One client for the engines you already use
        </p>
        <ul className="mt-8 grid grid-cols-2 gap-y-8 sm:grid-cols-4">
          {ENGINES.map((engine, i) => (
            <motion.li
              key={engine.name}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.8, ease: EASE_APPLE }}
              className="group flex items-center justify-center gap-3"
            >
              <img
                src={engine.src}
                alt=""
                className="size-8 object-contain opacity-70 grayscale transition duration-500 group-hover:opacity-100 group-hover:grayscale-0"
              />
              <span className="text-[15px] font-medium text-muted-foreground transition-colors duration-500 group-hover:text-foreground">
                {engine.name}
              </span>
            </motion.li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
